'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { chapter01Outline, studySections } from '@/data/study/chapter01';
import type { Skill, StudyCharacter, StudyQuestion, StudySection } from '@/data/study/types';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (path: string) => BASE + path;

export type UnitProgress = { mastery: number; correct: number; wrong: number };
export type StudyProgress = { units: Record<string, UnitProgress>; review: string[]; registered: string[] };
const STORAGE_KEY = 'kantei-study-v1';
export const emptyStudy = (): StudyProgress => ({ units: {}, review: [], registered: [] });

const allUnits = studySections.flatMap(s => s.units);
const allQuestions = studySections.flatMap(s => s.questions);
export const studyCharacters = studySections.flatMap(s => s.characters);

export function loadStudy(): StudyProgress {
  const stored = localStorage.getItem(STORAGE_KEY);
  let raw;
  try { raw = JSON.parse(stored || 'null'); } catch { return emptyStudy(); }
  if (!raw || typeof raw !== 'object') return emptyStudy();
  const units: Record<string, UnitProgress> = {};
  for (const u of allUnits) {
    const v = raw.units?.[u.id];
    if (v && [v.mastery, v.correct, v.wrong].every(n => Number.isInteger(n) && n >= 0)) units[u.id] = { mastery: Math.min(100, v.mastery), correct: v.correct, wrong: v.wrong };
  }
  const questionIds = new Set(allQuestions.map(q => q.id));
  const characterIds = new Set(studyCharacters.map(c => c.id));
  return {
    units,
    review: Array.isArray(raw.review) ? raw.review.filter((id: unknown) => typeof id === 'string' && questionIds.has(id)) : [],
    registered: Array.isArray(raw.registered) ? raw.registered.filter((id: unknown) => typeof id === 'string' && characterIds.has(id)) : [],
  };
}
export function saveStudy(progress: StudyProgress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); return true; } catch { return false; }
}

const CORRECT_GAIN = 20, WRONG_LOSS = 15;
function applyAnswer(progress: StudyProgress, section: StudySection, question: StudyQuestion, ok: boolean) {
  const before = progress.units[question.unitId] ?? { mastery: 0, correct: 0, wrong: 0 };
  const unit = ok
    ? { ...before, mastery: Math.min(100, before.mastery + CORRECT_GAIN), correct: before.correct + 1 }
    : { ...before, mastery: Math.max(0, before.mastery - WRONG_LOSS), wrong: before.wrong + 1 };
  const units = { ...progress.units, [question.unitId]: unit };
  const review = ok ? progress.review.filter(id => id !== question.id) : [...new Set([...progress.review, question.id])];
  const newlyRegistered = section.characters
    .filter(c => !progress.registered.includes(c.id) && c.unitIds.every(id => (units[id]?.correct ?? 0) > 0))
    .map(c => c.id);
  return { next: { units, review, registered: [...progress.registered, ...newlyRegistered] }, newlyRegistered };
}

export const unitMastery = (p: StudyProgress, unitId: string) => p.units[unitId]?.mastery ?? 0;
export const characterMastery = (p: StudyProgress, c: StudyCharacter) =>
  Math.round(c.unitIds.reduce((sum, id) => sum + unitMastery(p, id), 0) / c.unitIds.length);
const skillScore = (p: StudyProgress, skill: Skill) => {
  const units = allUnits.filter(u => u.skills.includes(skill));
  return units.length ? Math.round(units.reduce((s, u) => s + unitMastery(p, u.id), 0) / units.length) : null;
};
const sectionReview = (p: StudyProgress, section: StudySection) => section.questions.filter(q => p.review.includes(q.id));

function shuffled<T>(items: T[]) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function ArtFrame({ src, alt, label, notes, className = '' }: { src: string; alt: string; label: string; notes?: string[]; className?: string }) {
  const [failed, setFailed] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => { const el = img.current; if (el && el.complete && el.naturalWidth === 0) setFailed(true); }, [src]);
  return <figure className={`art-frame ${className}`}>
    {failed
      ? <div className="art-placeholder" role="img" aria-label={`${label}（画像準備中）`}><b>{label}</b><small>画像準備中</small>{notes && <ul>{notes.map(n => <li key={n}>{n}</li>)}</ul>}</div>
      : <img ref={img} src={asset(src)} alt={alt} onError={() => setFailed(true)} />}
  </figure>;
}

function Meter({ value, label }: { value: number; label: string }) {
  return <div className="meter" role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${value}%` }} /></div>;
}

export function StudyHub({ progress, onStart, onOpenCharacter }: { progress: StudyProgress; onStart: (sectionId: string, mode: 'learn' | 'review') => void; onOpenCharacter: (id: string) => void }) {
  const memory = skillScore(progress, '原文暗記') ?? 0;
  return <>
    <div className="section-title"><div><small>STANDARD STUDY</small><h1 tabIndex={-1}>基準学習</h1></div><span className="study-note">原文を覚え、知識を仲間にする</span></div>
    <div className="study-hub">
      <section className="skill-board ornate" aria-label="分野別の習熟度">
        <h2>鑑定士の力</h2>
        <div className="skill-row"><span>原文暗記</span><Meter value={memory} label="原文暗記の習熟度" /><b>{memory}</b></div>
        <p className="small-print">いま学べる範囲（第1章第1節）での習熟度です。類型判定・地域分析・評価方式などの分野は、章を増やすたびに追加します。</p>
      </section>
      <section className="chapter-card ornate" aria-label="総論 第1章">
        <span className="chapter-label">総論 第1章</span>
        <h2>{studySections[0].chapterTitle}</h2>
        <ol className="section-list">
          {chapter01Outline.map(o => {
            const section = studySections.find(s => s.id === o.id);
            if (!section) return <li key={o.section} className="locked"><span>{o.section}</span><b>{o.title}</b><small>準備中</small></li>;
            const reviewCount = sectionReview(progress, section).length;
            const got = section.characters.filter(c => progress.registered.includes(c.id)).length;
            const avg = Math.round(section.units.reduce((s, u) => s + unitMastery(progress, u.id), 0) / section.units.length);
            return <li key={o.section}>
              <span>{o.section}</span><b>{o.title}</b>
              <small>習熟度 {avg} ・ 仲間 {got}/{section.characters.length}</small>
              <div className="section-actions">
                <button className="gold-button" onClick={() => onStart(section.id, 'learn')}>学ぶ <span>❯</span></button>
                {reviewCount > 0 && <button className="dark-button" onClick={() => onStart(section.id, 'review')}>復習 {reviewCount}問</button>}
              </div>
            </li>;
          })}
        </ol>
        <div className="mini-characters">
          {studySections[0].characters.map(c => <button key={c.id} className={progress.registered.includes(c.id) ? 'got' : ''} onClick={() => onOpenCharacter(c.id)}>
            <span>{c.rarity}</span><b>{c.name}</b><small>{progress.registered.includes(c.id) ? `習熟度 ${characterMastery(progress, c)}` : '未登録'}</small>
          </button>)}
        </div>
      </section>
    </div>
  </>;
}

type Step = 'read' | 'concept' | 'meet' | 'quiz' | 'result';
const STEP_LABELS: [Step, string][] = [['read', '原文'], ['concept', 'イメージ'], ['meet', '仲間'], ['quiz', '問題'], ['result', '結果']];

export function Lesson({ sectionId, mode, progress, onProgress, onExit, onReview, onOpenCharacter }: {
  sectionId: string; mode: 'learn' | 'review'; progress: StudyProgress;
  onProgress: (p: StudyProgress) => void; onExit: () => void; onReview: () => void; onOpenCharacter: (id: string) => void;
}) {
  const section = studySections.find(s => s.id === sectionId)!;
  const [questions] = useState(() => mode === 'review' ? sectionReview(progress, section) : section.questions);
  const [step, setStep] = useState<Step>(mode === 'review' ? 'quiz' : 'read');
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [gained, setGained] = useState<string[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); panel.current?.scrollTo({ top: 0 }); }, [step, index]);

  function answer(ok: boolean) {
    const q = questions[index];
    const { next, newlyRegistered } = applyAnswer(progress, section, q, ok);
    onProgress(next);
    setResults(r => [...r, ok]);
    if (newlyRegistered.length) setGained(g => [...g, ...newlyRegistered]);
  }
  function nextQuestion() { if (index + 1 < questions.length) setIndex(i => i + 1); else setStep('result'); }

  const steps = mode === 'review' ? STEP_LABELS.filter(([s]) => s === 'quiz' || s === 'result') : STEP_LABELS;
  const stepAt = steps.findIndex(([s]) => s === step);
  const character = (id: string) => section.characters.find(c => c.id === id)!;
  const correctCount = results.filter(Boolean).length;
  const remaining = sectionReview(progress, section).length;

  return <main className="study-stage" style={{ backgroundImage: `linear-gradient(180deg,#101c1e8c,#111a1cd9 55%), url(${asset(section.background)})` }}>
    <header className="study-head">
      <div><span className="chapter-label">{section.chapter} {section.section}{mode === 'review' ? ' ・ 復習' : ''}</span><h1 ref={heading} tabIndex={-1}>{section.title}</h1></div>
      <button className="dark-button" onClick={onExit}>学習トップへ</button>
    </header>
    <ol className="phase-track study-track" aria-label="学習の進行">
      {steps.map(([s, label], i) => <li key={s} className={i === stepAt ? 'active' : i < stepAt ? 'done' : ''} aria-current={i === stepAt ? 'step' : undefined}><span>{i < stepAt ? '✓' : i + 1}</span><b>{label}</b></li>)}
    </ol>
    <section ref={panel} className="study-panel ornate" aria-label="学習パネル">
      {step === 'read' && <>
        <div className="panel-title"><small>ORIGINAL TEXT</small><h2>まず原文を読もう</h2><p>【原文】は基準そのまま。【解説】はゲーム用の短い説明じゃ。</p></div>
        {section.units.map((u, i) => <article key={u.id} className="unit-card">
          <header><span>{String(i + 1).padStart(2, '0')}</span><b>{u.title}</b><button className="unit-chip" onClick={() => onOpenCharacter(u.characterId)}>{character(u.characterId).rarity} {character(u.characterId).name}</button></header>
          <p className="original-text"><em>原文</em>{u.originalText}</p>
          <p className="explanation"><em>解説</em>{u.explanation}</p>
        </article>)}
        <button className="gold-button" onClick={() => setStep('concept')}>イメージで覚える <span>❯</span></button>
      </>}
      {step === 'concept' && <>
        <div className="panel-title"><small>MEMORY IMAGE</small><h2>絵で思い出す</h2><p>絵は原文を思い出すための「取っ手」。原文とセットで覚えよう。</p></div>
        <div className="concept-grid">{section.concepts.map(c => <article key={c.id} className="concept-card">
          <ArtFrame src={c.image} alt={c.title} label={c.title} className="concept-art" />
          <h3>{c.title}</h3><p className="explanation"><em>解説</em>{c.caption}</p>
          {c.unitIds.map(id => <p key={id} className="original-text small"><em>原文</em>{section.units.find(u => u.id === id)!.originalText}</p>)}
        </article>)}</div>
        <button className="gold-button" onClick={() => setStep('meet')}>仲間に会う <span>❯</span></button>
      </>}
      {step === 'meet' && <>
        <div className="panel-title"><small>NEW COMPANIONS</small><h2>この節の仲間</h2><p>担当する原文の問題に1回ずつ正解すると、図鑑に登録されるぞ。</p></div>
        <div className="meet-grid">{section.characters.map(c => <article key={c.id} className="meet-card">
          <ArtFrame src={c.image} alt={`${c.name}の立ち絵`} label={c.name} notes={c.motifs} className="meet-art" />
          <div><span className="rarity-tag">{c.rarity}</span><h3>{c.name}</h3><small>{c.epithet}</small><p>{c.profile}</p>
            <ul className="motifs">{c.motifs.map(m => <li key={m}>{m}</li>)}</ul>
            <p className="small-print">担当する原文：{c.unitIds.map(id => section.units.find(u => u.id === id)!.title).join('／')}</p></div>
        </article>)}</div>
        <button className="gold-button" onClick={() => setStep('quiz')}>問題に挑む <span>❯</span></button>
      </>}
      {step === 'quiz' && (questions.length
        ? <Quiz key={questions[index].id} question={questions[index]} section={section} number={index + 1} total={questions.length} onAnswer={answer} onNext={nextQuestion} last={index + 1 === questions.length} />
        : <div className="panel-title"><h2>復習する問題はありません</h2><button className="gold-button" onClick={onExit}>学習トップへ <span>❯</span></button></div>)}
      {step === 'result' && <div className="study-result">
        <div className="result-title"><small>{mode === 'review' ? 'REVIEW COMPLETE' : 'LESSON COMPLETE'}</small><h2>{correctCount === questions.length ? '全問正解' : '学習完了'}</h2><p><b>{correctCount} / {questions.length}</b> 問正解</p></div>
        {gained.map(id => <div key={id} className="unlock-reward"><span>NEW COMPANION</span><b>{character(id).rarity} {character(id).name} を図鑑に登録！</b><p>{character(id).epithet}</p></div>)}
        <div className="mastery-list">{section.characters.map(c => <div key={c.id} className="skill-row"><span>{c.rarity} {c.name}</span><Meter value={characterMastery(progress, c)} label={`${c.name}の習熟度`} /><b>{characterMastery(progress, c)}</b></div>)}</div>
        <p className="result-note">{remaining ? `間違えた問題 ${remaining}問が復習リストに残っています。` : '復習リストは空です。'}</p>
        {remaining > 0 && <button className="gold-button" onClick={onReview}>間違えた {remaining}問を復習する <span>❯</span></button>}
        <div className="result-actions"><button className="parchment-button" onClick={onExit}>学習トップへ</button><button className="parchment-button" onClick={() => onOpenCharacter(section.characters[0].id)}>図鑑を見る</button></div>
      </div>}
    </section>
  </main>;
}

function Quiz({ question: q, section, number, total, onAnswer, onNext, last }: {
  question: StudyQuestion; section: StudySection; number: number; total: number; onAnswer: (ok: boolean) => void; onNext: () => void; last: boolean;
}) {
  const unit = section.units.find(u => u.id === q.unitId)!;
  const options = useMemo(() => shuffled(q.type === 'order' ? q.items : q.choices), [q]);
  const [picked, setPicked] = useState<string[]>([]);
  const [done, setDone] = useState<boolean | null>(null);
  const feedback = useRef<HTMLDivElement>(null);
  useEffect(() => { if (done !== null) feedback.current?.scrollIntoView({ block: 'nearest' }); }, [done]);
  const need = q.type === 'blank' ? 1 : q.type === 'pick' ? q.answers.length : q.items.length;

  function toggle(option: string) {
    if (done !== null) return;
    if (q.type === 'blank') setPicked([option]);
    else if (q.type === 'pick') setPicked(p => p.includes(option) ? p.filter(o => o !== option) : p.length < need ? [...p, option] : p);
    else setPicked(p => p.includes(option) ? p.filter(o => o !== option) : [...p, option]);
  }
  function submit() {
    const ok = q.type === 'blank' ? picked[0] === q.answer
      : q.type === 'pick' ? q.answers.every(a => picked.includes(a)) && picked.length === q.answers.length
      : q.items.every((item, i) => picked[i] === item);
    setDone(ok); onAnswer(ok);
  }
  const [before, after] = q.type === 'blank' ? unit.originalText.split(q.answer) : ['', ''];
  const correctText = q.type === 'blank' ? q.answer : q.type === 'pick' ? q.answers.join('・') : q.items.join(' → ');

  return <div className="quiz">
    <div className="panel-title"><small>QUESTION {number} / {total}</small><h2>{q.prompt}</h2></div>
    {q.type === 'blank' && <p className="original-text quiz-text"><em>原文</em>{before}<mark className={done === null ? 'blank' : done ? 'blank ok' : 'blank ng'}>{done === null ? (picked[0] ?? '＿＿＿＿') : q.answer}</mark>{after}</p>}
    {q.type === 'order' && <div className="order-line" aria-label="並べた順">{Array.from({ length: need }, (_, i) => <span key={i} className={picked[i] ? 'filled' : ''}>{picked[i] ?? `${i + 1}`}</span>)}</div>}
    {done === null ? <>
      <fieldset className="command-options quiz-options">
        <legend className="sr-only">{q.prompt}</legend>
        {options.map(o => {
          const on = picked.includes(o);
          const mark = q.type === 'order' && on ? String(picked.indexOf(o) + 1) : on ? '✓' : '';
          return <button key={o} type="button" className={`answer-card ${on ? 'selected' : ''}`} aria-pressed={on} onClick={() => toggle(o)}><span>{o}</span><b>{mark}</b></button>;
        })}
      </fieldset>
      {q.type !== 'blank' && <small className="selection-note">{q.type === 'pick' ? `${picked.length} / ${need} 個選択中` : 'タップした順に並びます。もう一度タップで外せます。'}</small>}
      <button className="gold-button" disabled={picked.length !== need} onClick={submit}>回答する <span>❯</span></button>
    </> : <div ref={feedback} className={`feedback parchment ${done ? 'ok' : 'ng'}`} role="status">
      <h3>{done ? '✓ 正解！' : '↳ 惜しい…　復習リストに追加'}</h3>
      <p><b>{done ? '' : `あなたの答え：${q.type === 'order' ? picked.join(' → ') : picked.join('・')}　／　`}正解：{correctText}</b></p>
      {q.type !== 'blank' && <p className="original-text small"><em>原文</em>{unit.originalText}</p>}
      <p className="explanation"><em>解説</em>{unit.explanation}</p>
      <button className="gold-button" onClick={onNext}>{last ? '結果を見る' : '次の問題へ'} <span>❯</span></button>
    </div>}
  </div>;
}

export function StudyCharacterCard({ character: c, progress, onStudy }: { character: StudyCharacter; progress: StudyProgress; onStudy: () => void }) {
  const got = progress.registered.includes(c.id);
  const section = studySections.find(s => s.characters.some(x => x.id === c.id))!;
  return <div className="collection-layout">
    <div className={`portrait ornate ${got ? '' : 'locked'}`}><ArtFrame src={c.image} alt={`${c.name}の立ち絵`} label={c.name} notes={c.motifs} className="portrait-art" /><span className="rarity">{c.rarity}</span><h2>{c.name}</h2></div>
    <section className="collection-info ornate">
      <span className="chapter-label">{section.chapter} {section.section} ・ {c.epithet}</span>
      <h2>{c.name}</h2>
      <p>{c.profile}</p>
      {got ? <>
        <div className="mastery"><span>習熟度</span><b>{characterMastery(progress, c)} / 100</b></div>
        <div className="definition parchment"><h3>担当する原文</h3>
          {c.unitIds.map(id => { const u = section.units.find(x => x.id === id)!; return <div key={id} className="unit-mastery"><p className="original-text small"><em>原文</em>{u.originalText}</p><div className="skill-row"><span>{u.title}</span><Meter value={unitMastery(progress, id)} label={`${u.title}の習熟度`} /><b>{unitMastery(progress, id)}</b></div></div>; })}
        </div>
      </> : <div className="definition parchment"><h3>登録条件</h3><p>{section.chapter}{section.section}の問題で、この仲間が担当する原文（{c.unitIds.length}つ）それぞれに1回以上正解する。</p></div>}
      <button className="gold-button" onClick={onStudy}>{section.section}を学ぶ ❯</button>
    </section>
  </div>;
}
