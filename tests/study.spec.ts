import { test, expect, Page } from '@playwright/test';
import { chapter01Section01 as section } from '../data/study/chapter01';
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

test('第1章第1節：原文→イメージ→仲間→問題→図鑑登録→復習', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await page.getByRole('button', { name: '基準学習', exact: true }).click();
  await expect(page.getByRole('heading', { name: '基準学習' })).toBeVisible();
  await page.getByRole('button', { name: /学ぶ/ }).first().click();

  for (const u of section.units) await expect(page.locator('.original-text').filter({ hasText: u.originalText.split('\n')[0] }).first()).toBeVisible();
  await page.getByRole('button', { name: /イメージで覚える/ }).click();
  await expect(page.getByRole('heading', { name: '土地とその定着物' })).toBeVisible();
  await page.getByRole('button', { name: /仲間に会う/ }).click();
  await expect(page.getByRole('img', { name: /不動産（画像準備中）/ })).toBeVisible();
  await page.getByRole('button', { name: /問題に挑む/ }).click();

  const miss = 'q-002-a';
  for (const [i, q] of section.questions.entries()) {
    await solve(page, q, q.id !== miss);
    await page.getByRole('button', { name: i === section.questions.length - 1 ? /結果を見る/ : /次の問題へ/ }).click();
  }
  await expect(page.getByText(`${section.questions.length - 1} / ${section.questions.length}`)).toBeVisible();
  await expect(page.getByText('R 不動産 を図鑑に登録！')).toBeVisible();
  await expect(page.getByText('R 価格 を図鑑に登録！')).toBeVisible();

  await page.getByRole('button', { name: /間違えた 1問を復習する/ }).click();
  await solve(page, section.questions.find(q => q.id === miss)!, true);
  await page.getByRole('button', { name: /結果を見る/ }).click();
  await expect(page.getByText('復習リストは空です。')).toBeVisible();

  await page.reload();
  await page.getByRole('button', { name: 'キャラ図鑑', exact: true }).click();
  await page.getByRole('tab', { name: /不動産/ }).click();
  await expect(page.getByRole('heading', { name: '担当する原文' })).toBeVisible();
  await expect(page.locator('.collection-count')).toContainText('2');
  expect(errors).toEqual([]);
});

test('第1章第1節：間違えると復習対象に残り、未登録のまま', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '基準学習', exact: true }).click();
  await page.getByRole('button', { name: /学ぶ/ }).first().click();
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
