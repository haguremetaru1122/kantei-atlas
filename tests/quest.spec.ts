import { test, expect, Page } from '@playwright/test';
async function investigate(page:Page){
 await expect(page.getByRole('button',{name:'判断に進む'})).toBeDisabled();
 await page.getByRole('button',{name:/地域分析 街を読み/}).click();
 await expect(page.getByRole('button',{name:'判断に進む'})).toBeDisabled();
 await page.getByRole('button',{name:/個別分析 対象地/}).click();
 await expect(page.getByText('調査員の総合所見')).toBeVisible();
 await page.getByRole('button',{name:'判断に進む'}).click();
}
async function answer(page:Page,choices:number[]){
 for(let q=0;q<3;q++){
  const button=page.getByRole('button',{name:q===2?'鑑定を完了する':'この判断で進む'});
  await expect(button).toBeDisabled();
  await page.locator('.answer-card').nth(choices[q]).click();
  await button.click();
 }
}
test('four cases, gated investigation, rewards, review and durable progress',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.getByRole('heading',{name:/この街の/})).toBeVisible();
 await page.screenshot({path:`preview-${info.project.name}.png`,fullPage:true});
 await page.getByRole('button',{name:'クエストをはじめる'}).click();
 const answers=[[1,0,2],[1,2,0],[1,2,0],[0,1,2]];
 for(let ci=0;ci<4;ci++){
  await investigate(page);
  if(ci===0){
   await page.locator('.answer-card').nth(1).click();
   await page.screenshot({path:`preview-play-${info.project.name}.png`,fullPage:true});
   await page.getByRole('button',{name:'この判断で進む'}).click();
   await page.locator('.answer-card').nth(0).click();
   await page.getByRole('button',{name:'この判断で進む'}).click();
   await page.locator('.answer-card').nth(2).click();
   await page.getByRole('button',{name:'鑑定を完了する'}).click();
   await expect(page.getByText('SSR 更地を獲得！')).toBeVisible();
  }else await answer(page,ci===1?[0,2,0]:answers[ci]);
  await page.getByRole('button',{name:'解説・基準を復習する'}).click();
  await expect(page.locator('.review-block section')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.getByRole('button',{name:ci===3?'今回の結果を見る':'次の案件へ'}).click();
 }
 await expect(page.getByText('11 / 12 問正解')).toBeVisible();
 await page.getByRole('button',{name:'未習得の案件をもう一度'}).click();
 await expect(page.getByText(/調査 1 \/ 1/)).toBeVisible();
 await expect(page.getByRole('heading',{name:'郊外住宅地の建付地'})).toBeVisible();
 await investigate(page);await answer(page,answers[1]);
 await page.reload();
 await page.getByRole('button',{name:'キャラ図鑑',exact:true}).click();
 await expect(page.getByText('更地の定義【基準原文】')).toBeVisible();
 await expect(page.getByRole('button',{name:'原文を聞く'})).toBeVisible();
 await page.getByRole('button',{name:'学習手帳',exact:true}).click();
 await expect(page.getByText('習得 4 / 4')).toBeVisible();
 expect(errors).toEqual([]);
});
test('storage unavailable, zero score and locked collection',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('disabled');}}));
 await page.goto('/');await expect(page.getByRole('status')).toContainText('保存できません');
 await page.getByRole('button',{name:'クエストをはじめる'}).click();
 await investigate(page);await answer(page,[0,1,0]);
 await expect(page.getByText('0 / 3',{exact:true})).toBeVisible();
 await expect(page.getByText('SSR 更地を獲得！')).toHaveCount(0);
 await page.getByRole('button',{name:'キャラ図鑑',exact:true}).click();
 await expect(page.getByRole('heading',{name:'解放条件'})).toBeVisible();
});
test('speech uses the original definition and navigation cancels it',async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('kantei-quest-v2',JSON.stringify({records:{sarachi:3},unlocked:true}));
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],speak:(u:SpeechSynthesisUtterance)=>{document.documentElement.dataset.spoken=u.text;},cancel:()=>{document.documentElement.dataset.cancelled='yes';}}});
 });
 await page.goto('/');await page.getByRole('button',{name:'キャラ図鑑',exact:true}).click();
 await page.getByRole('button',{name:'原文を聞く'}).click();
 await expect(page.getByRole('button',{name:'停止'})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.dataset.spoken)).toContain('建物等の定着物');
 await page.getByRole('button',{name:'ホーム',exact:true}).click();
 expect(await page.evaluate(()=>document.documentElement.dataset.cancelled)).toBe('yes');
});
