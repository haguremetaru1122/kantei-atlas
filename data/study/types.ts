export type Skill =
  | '原文暗記' | '類型判定' | '地域分析' | '個別分析' | '価格形成要因' | '最有効使用'
  | '鑑定評価方式' | '計算' | '賃料評価' | '各論' | '実戦鑑定';

export interface KnowledgeUnit {
  id: string;
  chapter: string;
  section: string;
  title: string;
  /** 国交省「不動産鑑定評価基準」の原文そのまま。改行は原文の箇条書きの位置のみ。 */
  originalText: string;
  /** ゲーム用の短い解説。原文とは別物として表示する。 */
  explanation: string;
  keywords: string[];
  characterId: string;
  skills: Skill[];
  conceptImage?: string;
}

export interface ConceptArt {
  id: string;
  title: string;
  image: string;
  unitIds: string[];
  caption: string;
}

export interface StudyCharacter {
  id: string;
  name: string;
  rarity: 'R' | 'SR' | 'SSR';
  epithet: string;
  image: string;
  unitIds: string[];
  motifs: string[];
  profile: string;
  /** 画像をChatGPTで作るときの指定。ゲーム画面には出さない。 */
  artSpec: { silhouette: string; palette: string[]; props: string[]; mustDifferFrom: string };
}

interface QuestionBase { id: string; unitId: string; skill: Skill; prompt: string }
/** originalText 内の answer を1か所だけ伏せて4択にする */
export interface BlankQuestion extends QuestionBase { type: 'blank'; answer: string; choices: string[] }
/** 正しいものをすべて選ぶ */
export interface PickQuestion extends QuestionBase { type: 'pick'; answers: string[]; choices: string[] }
/** 原文の順番どおりに並べる（items は正しい順） */
export interface OrderQuestion extends QuestionBase { type: 'order'; items: string[] }
export type StudyQuestion = BlankQuestion | PickQuestion | OrderQuestion;

export interface StudySection {
  id: string;
  chapter: string;
  chapterTitle: string;
  section: string;
  title: string;
  background: string;
  units: KnowledgeUnit[];
  concepts: ConceptArt[];
  characters: StudyCharacter[];
  questions: StudyQuestion[];
}

export interface SectionOutline { chapter: string; section: string; title: string; id?: string }
