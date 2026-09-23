import { test, expect, Page } from '@playwright/test';
import { studySections } from '../data/study/chapter01';
import type { StudyQuestion } from '../data/study/types';

async function solve(page: Page, q: StudyQuestion, correct: boolean) {
  await expect(page.getByRole('heading', { name: q.prompt })).toBeVisible();
  const tap = (text: string) => page.locator('.quiz-options').getByRole('button', { name: text, exact: true }).click();
  if (q.type === 'blank') await tap(correct ? q.answer : q.choices.find(c => c !== q.answer)!);
  else if (q.type === 'pick') { const wrong = q.choices.find(c => !q.answers.includes(c))!; for (const a of correct ? q.answers : [...q.answers.slice(0, -1), wrong]) await tap(a); }
  else for (const item of correct ? q.items : [...q.items].reverse()) await tap(item);
  await page.getByRole('button', { name: '回答する' }).click();
  await expect(page.getByRole('status')).toContainText(correct ? '正解！' : '惜しい');
}

async function openSection(page: Page, index: number) {
  await page.getByRole('button', { name: '基準学習', exact: true }).click();
  await expect(page.getByRole('heading', { name: '基準学習' })).toBeVisible();
  await page.locator('.section-list').getByRole('button', { name: /学ぶ/ }).nth(index).click();
}

for (const [index, section] of studySections.entries()) {
  test(`${section.chapter}${section.section}：原文→イメージ→仲間→問題→図鑑登録→復習`, async ({ page }) => {
    const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await openSection(page, index);
    await expect(page.getByRole('heading', { name: section.title })).toBeVisible();

    for (const u of section.units) await expect(page.locator('.original-text').filter({ hasText: u.originalText.split('\n')[0] }).first()).toBeVisible();
    await page.getByRole('button', { name: /イメージで覚える/ }).click();
    for (const c of section.concepts) await expect(page.getByRole('heading', { name: c.title })).toBeVisible();
    await page.getByRole('button', { name: /仲間に会う/ }).click();
    for (const c of section.characters) await expect(page.getByRole('heading', { name: c.name, exact: true })).toBeVisible();
    await page.getByRole('button', { name: /問題に挑む/ }).click();

    const miss = section.questions[1].id;
    for (const [i, q] of section.questions.entries()) {
      await solve(page, q, q.id !== miss);
      await page.getByRole('button', { name: i === section.questions.length - 1 ? /結果を見る/ : /次の問題へ/ }).click();
    }
    await expect(page.getByText(`${section.questions.length - 1} / ${section.questions.length}`)).toBeVisible();
    const missedUnit = section.questions[1].unitId;
    const stillLearned = section.questions.some(q => q.unitId === missedUnit && q.id !== miss);
    for (const c of section.characters) {
      const registered = stillLearned || !c.unitIds.includes(missedUnit);
      await expect(page.getByText(`${c.rarity} ${c.name} を図鑑に登録！`)).toHaveCount(registered ? 1 : 0);
    }

    await page.getByRole('button', { name: /間違えた 1問を復習する/ }).click();
    await solve(page, section.questions[1], true);
    await page.getByRole('button', { name: /結果を見る/ }).click();
    await expect(page.getByText('復習リストは空です。')).toBeVisible();

    await page.reload();
    await page.getByRole('button', { name: 'キャラ図鑑', exact: true }).click();
    await page.getByRole('tab', { name: new RegExp(section.characters[0].name) }).click();
    await expect(page.getByRole('heading', { name: '担当する原文' })).toBeVisible();
    await expect(page.locator('.collection-count')).toContainText(String(section.characters.length));
    expect(errors).toEqual([]);
  });
}

test('第1章第1節：立ち絵と概念絵が表示される', async ({ page }) => {
  await page.goto('/');
  await openSection(page, 0);
  await page.getByRole('button', { name: /イメージで覚える/ }).click();
  await expect.poll(() => page.locator('.concept-art img').evaluateAll(els => els.map(e => (e as HTMLImageElement).naturalWidth > 0))).toEqual([true, true]);
  await page.getByRole('button', { name: /仲間に会う/ }).click();
  for (const name of ['不動産の立ち絵', '価格の立ち絵']) {
    const img = page.getByRole('img', { name });
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  }
});

test('第1章第1節：間違えると復習対象に残り、未登録のまま', async ({ page }) => {
  const section = studySections[0];
  await page.goto('/');
  await openSection(page, 0);
  for (const label of [/イメージで覚える/, /仲間に会う/, /問題に挑む/]) await page.getByRole('button', { name: label }).click();
  for (const [i, q] of section.questions.entries()) {
    await solve(page, q, false);
    await page.getByRole('button', { name: i === section.questions.length - 1 ? /結果を見る/ : /次の問題へ/ }).click();
  }
  await expect(page.getByText(`0 / ${section.questions.length}`)).toBeVisible();
  await expect(page.getByText(/図鑑に登録！/)).toHaveCount(0);
  await page.getByRole('button', { name: '学習トップへ' }).first().click();
  await expect(page.getByRole('button', { name: `復習 ${section.questions.length}問` })).toBeVisible();
});
