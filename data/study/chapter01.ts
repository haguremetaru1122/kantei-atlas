import type { SectionOutline, StudySection } from './types';

const chapter = '総論 第1章';

export const chapter01Outline: SectionOutline[] = [
  { chapter, section: '第1節', title: '不動産とその価格', id: 'ch1-s1' },
  { chapter, section: '第2節', title: '不動産とその価格の特徴' },
  { chapter, section: '第3節', title: '不動産の鑑定評価' },
  { chapter, section: '第4節', title: '不動産鑑定士の責務' },
];

export const chapter01Section01: StudySection = {
  id: 'ch1-s1',
  chapter,
  chapterTitle: '不動産の鑑定評価に関する基本的考察',
  section: '第1節',
  title: '不動産とその価格',
  background: '/images/backgrounds/chapter01/section01_main.webp',
  units: [
    {
      id: 'ch1-s1-001', chapter, section: '第1節', title: '不動産とは',
      originalText: '不動産は、通常、土地とその定着物をいう。',
      explanation: '不動産＝「土地」と「その定着物」。建物は定着物の代表例。',
      keywords: ['不動産', '土地', '定着物'], characterId: 'fudousan_r', skills: ['原文暗記'],
      conceptImage: '/images/concepts/chapter01/land_and_fixture.webp',
    },
    {
      id: 'ch1-s1-002', chapter, section: '第1節', title: '土地は基盤',
      originalText: '土地はその持つ有用性の故にすべての国民の生活と活動とに欠くことのできない基盤である。',
      explanation: '土地は役に立つ（有用性がある）からこそ、国民の生活と活動の基盤になっている。',
      keywords: ['有用性', '基盤'], characterId: 'fudousan_r', skills: ['原文暗記'],
    },
    {
      id: 'ch1-s1-003', chapter, section: '第1節', title: '土地と人間との関係',
      originalText: 'そして、この土地を我々人間が各般の目的のためにどのように利用しているかという土地と人間との関係は、不動産のあり方、すなわち、不動産がどのように構成され、どのように貢献しているかということに具体的に現れる。',
      explanation: '人が土地をどう使っているか（土地と人間との関係）は、「不動産のあり方」＝不動産の構成と貢献のしかたに現れる。',
      keywords: ['土地と人間との関係', '不動産のあり方'], characterId: 'fudousan_r', skills: ['原文暗記'],
    },
    {
      id: 'ch1-s1-004', chapter, section: '第1節', title: '不動産のあり方を決めるもの',
      originalText: 'この不動産のあり方は、自然的、社会的、経済的及び行政的な要因の相互作用によって決定されるとともに経済価値の本質を決定づけている。',
      explanation: '不動産のあり方は4つの要因（自然的・社会的・経済的・行政的）の相互作用で決まり、それが経済価値の本質を決定づける。',
      keywords: ['自然的', '社会的', '経済的', '行政的', '相互作用'], characterId: 'fudousan_r', skills: ['原文暗記'],
    },
    {
      id: 'ch1-s1-005', chapter, section: '第1節', title: '価格は選択の指標',
      originalText: '一方、この不動産のあり方は、その不動産の経済価値を具体的に表している価格を選択の主要な指標として決定されている。',
      explanation: '逆向きの関係もある。不動産のあり方は「価格」を主要な指標にして選ばれている。',
      keywords: ['価格', '選択の主要な指標'], characterId: 'kakaku_r', skills: ['原文暗記'],
    },
    {
      id: 'ch1-s1-006', chapter, section: '第1節', title: '不動産の価格とは',
      originalText: '不動産の価格は、一般に、\n（１）その不動産に対してわれわれが認める効用\n（２）その不動産の相対的稀少性\n（３）その不動産に対する有効需要\nの三者の相関結合によって生ずる不動産の経済価値を、貨幣額をもって表示したものである。',
      explanation: '効用・相対的稀少性・有効需要の三者が結びついて生まれる経済価値を、お金の額で表したものが価格。',
      keywords: ['効用', '相対的稀少性', '有効需要', '相関結合', '貨幣額'], characterId: 'kakaku_r', skills: ['原文暗記'],
      conceptImage: '/images/concepts/chapter01/utility_scarcity_demand.webp',
    },
    {
      id: 'ch1-s1-007', chapter, section: '第1節', title: '経済価値を決めるもの',
      originalText: 'そして、この不動産の経済価値は、基本的にはこれら三者を動かす自然的、社会的、経済的及び行政的な要因の相互作用によって決定される。',
      explanation: '経済価値は、三者を動かす4つの要因（自然的・社会的・経済的・行政的）の相互作用で決まる。',
      keywords: ['三者', '要因', '相互作用'], characterId: 'kakaku_r', skills: ['原文暗記'],
    },
    {
      id: 'ch1-s1-008', chapter, section: '第1節', title: '価格と要因の二面性',
      originalText: '不動産の価格とこれらの要因との関係は、不動産の価格が、これらの要因の影響の下にあると同時に選択指標としてこれらの要因に影響を与えるという二面性を持つものである。',
      explanation: '価格は要因の影響を受けるだけでなく、選択指標として要因にも影響を与える。これが二面性。',
      keywords: ['二面性', '選択指標'], characterId: 'kakaku_r', skills: ['原文暗記'],
    },
  ],
  concepts: [
    {
      id: 'land_and_fixture', title: '土地とその定着物',
      image: '/images/concepts/chapter01/land_and_fixture.webp', unitIds: ['ch1-s1-001'],
      caption: '足もとの「土地」と、その上に定着した建物などの「定着物」。二つを合わせて不動産。',
    },
    {
      id: 'utility_scarcity_demand', title: '効用・相対的稀少性・有効需要',
      image: '/images/concepts/chapter01/utility_scarcity_demand.webp', unitIds: ['ch1-s1-006'],
      caption: '三者の相関結合から生まれる経済価値を、貨幣額で表したものが価格。',
    },
  ],
  characters: [
    {
      id: 'fudousan_r', name: '不動産', rarity: 'R', epithet: '大地と定着物の守り手',
      image: '/images/characters/chapter01/fudousan_r.png',
      unitIds: ['ch1-s1-001', 'ch1-s1-002', 'ch1-s1-003', 'ch1-s1-004'],
      motifs: ['土地', '建物（定着物）', '境界', '社会の基盤'],
      profile: '足もとの大地と、背に負う家。土地とその定着物をひとつに抱え、人々の暮らしと活動を下から支える。',
      artSpec: {
        silhouette: 'がっしりした体格の青年〜壮年の男性。短髪。地面にしっかり立つ重心の低いポーズ',
        palette: ['土色', '灰色の石', '木の茶色', '深緑'],
        props: ['背負った小さな家（定着物）', '足もとの地面と境界杭', '石と木でできた外套'],
        mustDifferFrom: '更地（長い灰茶髪の少女・白と緑のドレス・測量杖）と似せない',
      },
    },
    {
      id: 'kakaku_r', name: '価格', rarity: 'R', epithet: '三つの光を束ねる者',
      image: '/images/characters/chapter01/kakaku_r.png',
      unitIds: ['ch1-s1-005', 'ch1-s1-006', 'ch1-s1-007', 'ch1-s1-008'],
      motifs: ['効用', '相対的稀少性', '有効需要', '貨幣額'],
      profile: '三つの光――効用・相対的稀少性・有効需要――を束ね、不動産の経済価値を貨幣額で示す。',
      artSpec: {
        silhouette: '小柄で快活な少年または少女。ショートボブ。片手を高く掲げる軽やかなポーズ',
        palette: ['金', '藍色', '白'],
        props: ['周りを回る3つの光球（効用＝芽吹く苗、相対的稀少性＝数少ない宝石、有効需要＝硬貨を握る手）', '金貨の髪飾り', '天秤'],
        mustDifferFrom: '更地・不動産と体格も髪型も色も変える',
      },
    },
  ],
  questions: [
    { id: 'q-001-a', unitId: 'ch1-s1-001', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '定着物', choices: ['定着物', '建物', '附属物', '構築物'] },
    { id: 'q-001-b', unitId: 'ch1-s1-001', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '通常', choices: ['通常', '一般に', '原則として', '法律上'] },
    { id: 'q-002-a', unitId: 'ch1-s1-002', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '有用性', choices: ['有用性', '収益性', '永続性', '固定性'] },
    { id: 'q-002-b', unitId: 'ch1-s1-002', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '基盤', choices: ['基盤', '資源', '財産', '前提'] },
    { id: 'q-003-a', unitId: 'ch1-s1-003', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '土地と人間との関係', choices: ['土地と人間との関係', '土地と社会との関係', '人間と不動産との関係', '土地と権利との関係'] },
    { id: 'q-004-a', unitId: 'ch1-s1-004', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '相互作用', choices: ['相互作用', '相関結合', '総合作用', '相互関係'] },
    { id: 'q-004-b', unitId: 'ch1-s1-004', skill: '原文暗記', type: 'order', prompt: '不動産のあり方を決める要因を、原文の順に並べよう', items: ['自然的', '社会的', '経済的', '行政的'] },
    { id: 'q-005-a', unitId: 'ch1-s1-005', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '主要な指標', choices: ['主要な指標', '唯一の基準', '重要な要素', '最終的な判断材料'] },
    { id: 'q-006-a', unitId: 'ch1-s1-006', skill: '原文暗記', type: 'pick', prompt: '不動産の価格を生む「三者」をすべて選ぼう', answers: ['効用', '相対的稀少性', '有効需要'], choices: ['効用', '収益性', '相対的稀少性', '市場性', '有効需要', '代替性'] },
    { id: 'q-006-b', unitId: 'ch1-s1-006', skill: '原文暗記', type: 'order', prompt: '三者を、原文の（１）〜（３）の順に並べよう', items: ['効用', '相対的稀少性', '有効需要'] },
    { id: 'q-006-c', unitId: 'ch1-s1-006', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '相関結合', choices: ['相関結合', '相互作用', '総合判断', '均衡'] },
    { id: 'q-006-d', unitId: 'ch1-s1-006', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '貨幣額', choices: ['貨幣額', '価格', '数値', '金額'] },
    { id: 'q-007-a', unitId: 'ch1-s1-007', skill: '原文暗記', type: 'blank', prompt: '4つの要因のうち、空欄に入るのは？', answer: '行政的', choices: ['行政的', '法律的', '政治的', '技術的'] },
    { id: 'q-008-a', unitId: 'ch1-s1-008', skill: '原文暗記', type: 'blank', prompt: '空欄に入る語句は？', answer: '二面性', choices: ['二面性', '相互性', '双方向性', '循環性'] },
  ],
};

export const studySections: StudySection[] = [chapter01Section01];
