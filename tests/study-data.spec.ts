import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { studySections } from '../data/study/chapter01';

const flat = (s: string) => s.replace(/=== p\.\d+ ===/g, '').replace(/^\s*\d+\s*$/gm, '').replace(/\s+/g, '');
const source = flat(readFileSync(join(__dirname, '..', 'sources', '不動産鑑定評価基準.txt'), 'utf8'));

for (const section of studySections) {
  test(`${section.id}: 原文は国交省の基準と一字一句一致する`, () => {
    for (const unit of section.units) expect(source, unit.id).toContain(flat(unit.originalText));
  });

  test(`${section.id}: 問題の正解は原文から作られている`, () => {
    const ids = new Set(section.units.map(u => u.id));
    for (const q of section.questions) {
      expect(ids.has(q.unitId), q.id).toBe(true);
      const text = section.units.find(u => u.id === q.unitId)!.originalText;
      if (q.type === 'blank') {
        expect(text.split(q.answer).length - 1, `${q.id} 正解が原文に1回だけ出る`).toBe(1);
        expect(q.choices, q.id).toContain(q.answer);
        expect(new Set(q.choices).size, q.id).toBe(q.choices.length);
      } else if (q.type === 'pick') {
        for (const a of q.answers) { expect(text, q.id).toContain(a); expect(q.choices, q.id).toContain(a); }
      } else {
        let at = -1;
        for (const item of q.items) { const next = text.indexOf(item, at + 1); expect(next, `${q.id} ${item} が順に出る`).toBeGreaterThan(at); at = next; }
      }
    }
  });

  test(`${section.id}: キャラと知識の対応がそろっている`, () => {
    for (const unit of section.units) {
      const owner = section.characters.find(c => c.id === unit.characterId);
      expect(owner?.unitIds, unit.id).toContain(unit.id);
    }
  });
}
