# 鑑定クエスト：画像制作記録

## 参照と固定要素

ユーザー提供の写真1をキャラの参照、写真2をホーム演出、写真3をプレイ画面の参照とした。更地の固定要素は、長い灰茶色の髪、緑の瞳、白い花、象牙色・深緑の衣装、金の縄、紅白の測量杖、浮遊する土と境界杭。キャラの同一性確認にはart-consistencyスキルを参照した。

組み込みimage_genで2点を制作。透過キャラは顔・衣装・構図を参照と比較。背景は文字やボタンがなく中央の空地が見えることを目視確認した。背景は第1案件の概念イラストであり縮尺図ではない。他案件には同じ空地の絵を現地画像として流用しない。

## 案件2〜4の背景（2026-09-23追加）

ユーザーがChatGPTで生成して提供。1536x1024のPNGをWebP（品質86）に変換して容量を約1/10にした。案件データの条件（案件2：庭つき木造2階建ての戸建、案件3：商店街の2階建て店舗、案件4：川沿いの3〜4階建て・約12戸の賃貸マンション）と矛盾しないことを確認済み。

- public/art/suburban-house.webp：案件2 郊外住宅地の建付地
- public/art/shop-street.webp：案件3 借地権付き店舗
- public/art/riverside-apartment.webp：案件4 賃貸マンション一棟

## 基準学習モード：第1章第1節の画像（2026-09-23 5点とも組み込み済み）

ユーザーがChatGPTで生成して提供。概念絵2点の中の文字（「不動産は、通常、土地とその定着物をいう。」「相対的稀少性」など）は原文と一致することを確認済み。R不動産は白背景をrembg（isnet-anime）で透過、R価格は元から透過。実際のデザインは当初の指定と違うため、data/study/chapter01.ts の artSpec を実物に合わせて更新した。

画像ファイルを下のパスに置くだけで自動的に表示される。無い間は「画像準備中」の枠が出る。
パスと各キャラの見た目の指定は `data/study/chapter01.ts`（image / conceptImage / background / artSpec）が正。

| 種類 | パス | 内容 |
|---|---|---|
| キャラ立ち絵（透過WebP・縦長3:4。PNGで渡せば変換） | public/images/characters/chapter01/fudousan_r.webp | R 不動産（実物）：茶髪をまとめた少女・街区の地図ボード・家の飾り・石垣の上に家とビルが並ぶ柄のスカート・土色/茶/深緑/白 |
| キャラ立ち絵（透過WebP・縦長3:4。PNGで渡せば変換） | public/images/characters/chapter01/kakaku_r.webp | R 価格（実物）：銀の長髪の女性・三つの光球（効用＝緑の芽、相対的稀少性＝青い宝石、有効需要＝赤い人々）・羅針盤の紋の本・白/藍/金 |
| 背景（横長WebP） | public/images/backgrounds/chapter01/section01_main.webp | 第1章第1節の学習画面の背景。暗めに重ねるので細部は控えめでよい |
| 概念イラスト（正方形WebP） | public/images/concepts/chapter01/land_and_fixture.webp | 「土地とその定着物」 |
| 概念イラスト（正方形WebP） | public/images/concepts/chapter01/utility_scarcity_demand.webp | 「効用・相対的稀少性・有効需要」の三者と価格 |

キャラ同士・更地と、体格・髪型・色・年齢感・性別・持ち物を大きく変える。画像に文字は入れない。

## 基準学習モード：第1章第2節の画像（2026-09-23 8点とも組み込み済み。概念絵の文字は原文と一致を確認）

置けば自動で表示される。指定の正は `data/study/chapter01.ts` の chapter01Section02。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/shizen_r.webp | R 自然的特性：大柄な老人男性・白い長い髭・短い白髪・岩に根を張るように座る・周りに5つの石碑（固定・不動・永続・不増・個別）・岩の灰/苔の緑/焦げ茶 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/jinbun_r.webp | R 人文的特性：小柄で活発な少年・つんつん短髪・ゴーグル・組み替えられる街区ブロック（併合・分割）・家/店/工場に変わる道具（用途の多様性）・上下する矢印の旗（位置の可変性）・橙/空色/白 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/chiikisei_r.webp | R 地域性：30〜40代の女性・ショートヘア・眼鏡・糸でつながった家の模型たち（依存・補完・協働）・色分けした地域の地図・町内の腕章・えんじ/生成り/真鍮色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/tokuchou_r.webp | R 価格の特徴：背の高い青年男性・後ろで束ねた黒髪・旅のコート・実のなる小枝（元本と果実）・権利の鍵束・砂時計（長期的な考慮）・鑑定士の徽章・紺/金/葡萄色 |
| 背景（横長WebP） | public/images/backgrounds/chapter01/section02_main.webp | 第1章第2節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/natural_and_human_traits.webp | 自然的特性（5つ・固定的・硬直的）と人文的特性（3つ・可変的・伸縮的）の対比 |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/regional_relations.webp | 不動産の地域性：地域とは依存・補完、地域内の不動産とは協働・代替・競争 |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/principal_and_fruit.webp | 元本と果実：価格（交換の対価）＝木、賃料（用益の対価）＝実 |

## 保存先と使用プロンプト

### public/art/sarachi.png

Edit this user-supplied original character illustration into a production-ready game sprite. Remove ONLY the white background and make it truly transparent alpha. Keep the exact same full-body female character, face, green eyes, long taupe hair, ivory and dark green dress, gold rope, flowers, red white survey staff, floating land and boundary markers. Preserve pose, expression, intricate painted Japanese fantasy mobile game art, all colors and composition. No new text, no frame, no white halo. Full figure including staff and floating rocks within canvas with tiny margins. Output transparent PNG.

### public/art/station-land.png

Production background illustration for an original Japanese fantasy mobile game about real estate appraisal. Landscape 1536x1024. Luminous richly hand-painted anime art, refined fine linework, warm afternoon golden light, detailed Japanese station-front commercial district, tasteful modern mid-rise shops offices apartments, station entrance visible at back left, tiny pedestrians in background only, trees flowers streetlights. Center and foreground show a clearly visible empty rectangular undeveloped 300 square metre lot with exposed earth, sparse grass, short simple wooden boundary stakes and rope. Front road crossing foreground. Entire image is background illustration, absolutely no character portrait, no game interface, no cards, no buttons, no typography, no text, no logos, no watermarks. Clear perspective, beautiful aspirational city, ivory sandstone gold teal green palette, sophisticated 2D fantasy RPG painted environment harmonious with a long taupe-haired green-eyed earth spirit wearing ivory green gold. Keep central lot unobstructed so players understand it is empty land. Do not depict buildings on the lot. Edge buildings give depth, fine sunbeams. Original environment.
