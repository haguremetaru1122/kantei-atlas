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

## 基準学習モード：第1章第3節の画像（2026-09-23 未作成。置けば自動で表示される）

指定の正は `data/study/chapter01.ts` の chapter01Section03。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/kanteihyouka_r.webp | R 鑑定評価：30代のがっしりした男性・赤茶の短髪・片眼鏡・ベストに腕まくり・6つの灯のランタン（6つの段階）・羽根ペンと証書（貨幣額での表示）・鑑定士の徽章・からし色/チャコール/銅色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/rentatsu_r.webp | R 練達堪能：60〜70代の老婦人・白髪のお団子・凛とした立ち姿・ローブ・厚い本（知識）・年輪の杖（経験）・天秤（判断力）・三つを結ぶ光る糸（有機的かつ総合的）・紫/銀/白 |
| 背景（横長WebP） | public/images/backgrounds/chapter01/section03_main.webp | 第1章第3節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/appraisal_six_steps.webp | 鑑定評価の6つの段階（（１）〜（６）） |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/expert_qualities.webp | 練達堪能な専門家：高度な知識・豊富な経験・的確な判断力を有機的かつ総合的に |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/price_order.webp | 一連の価格秩序の中で、対象不動産の価格の適正なあり所を指摘する |

## 基準学習モード：第1章第4節「不動産鑑定士の責務」の画像（未作成。置けば自動で表示される）

指定の正は `data/study/` の ch1-s4。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/sekimu_r.webp | R 鑑定士の責務：40代の男性。黒髪をきちんと後ろになでつけ、整えた口ひげ。深緑の礼服で背筋を伸ばし、片手を胸に当てて誓う立ち姿・錠前つきの帳簿（秘密を漏らさない）・土地の基本理念を記した巻物（文字は入れない）・足元に割れたサイコロ（投機的取引の否定）・鑑定士の徽章・深緑/白/金 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter01/shishitsu_r.webp | R 資質の向上：20代前半の男性。癖のある明るい茶色の短髪とそばかす。見習いの作業着。片手を前に出して「待った」をするポーズ・胸に5つの星の徽章（5つの事項）・使い込んだ分厚いノートと鉛筆（不断の勉強と研鑚）・腰の水準器（公平妥当な態度）・拡大鏡（専門職業家としての注意）・若草色/生成り/青 |
| 背景（横長WebP） | public/images/backgrounds/chapter01/section04_main.webp | 第1章第4節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/appraiser_duties.webp | 「鑑定士の責務の全体像」：土地の基本理念に立つ → 専門家としての地位を自覚する → 良心・社会的信用・秘密を守る → 資質の向上に努める。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter01/five_disciplines.webp | 「資質の向上のための5つの事項」：（１）勉強と研鑚 （２）分かり易く誠実に説明 （３）公平妥当な態度 （４）専門職業家としての注意 （５）引き受けてはならない場合。 |

## 基準学習モード：第2章第1節「不動産の種別」の画像（未作成。置けば自動で表示される）

指定の正は `data/study/` の ch2-s1。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/shurui_r.webp | R 不動産の種類：10代前半の双子の姉弟が背中合わせに立つ一枚絵。姉はおさげ髪、弟は短髪。服は同じ柄の色違い・姉：色分けされた用途の地図（種別）・弟：小さな建物の模型と封をした証書（有形的利用及び権利関係＝類型）・二人の手首をつなぐ金のリボン（二面で一つ）・藍/朱/金 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/chiikishubetsu_r.webp | R 地域の種別：50代の男性。日焼けした肌、白髪まじりの短いあごひげ。ポケットの多い測量ベスト。三本の旗を束ねて肩に担ぐ・三色の旗（街＝宅地地域・畑＝農地地域・森＝林地地域）・色が変わりかけた小旗（転換・移行しつつある地域）・腰の測量の道具・レンガ色/麦色/深緑 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/tochishubetsu_r.webp | R 土地の種別：8〜10歳くらいの小さな女の子。黒髪のおかっぱ。区画ごとに色の違うパッチワークのワンピース・服の布：家の柄（宅地）・畑の柄（農地）・森の柄（林地）・家の柄の布は小さく「住宅・店・工場」の柄に分かれている・森の柄の布は木の絵だけ切り抜かれている（立木竹を除く）・苔色/オレンジ/白 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/mikomichi_r.webp | R 見込地：20代の男性。体の右半分は農作業着と麦わら、左半分は街のジャケットへと変化している途中の衣装・右手に稲穂、左手に家の鍵・足元が畑から舗装道路へ変わっていく・黄緑/灰青/金 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/ikouchi_r.webp | R 移行地：30代の女性。長い三つ編み、引っ越し業者のつなぎとキャップ。荷車を引いている・荷車の上に家の模型と店の模型（住宅地域→商業地域への移行）・荷車は街の中の道にいる（宅地地域のうちにあって）・水色/クリーム/茶 |
| 背景（横長WebP） | public/images/backgrounds/chapter02/section01_main.webp | 第2章第1節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter02/type_two_sides.webp | 「種類＝種別×類型」：種別は「用途」、類型は「有形的利用及び権利関係の態様」。この二面の分析をまって初めて、精度の高い鑑定評価になる。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter02/area_and_land_categories.webp | 「地域の種別と土地の種別」：宅地地域の中→宅地、農地地域の中→農地、林地地域の中→林地。変わりつつある地域の中→見込地・移行地。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter02/conversion_vs_transition.webp | 「転換と移行」：転換＝宅地地域・農地地域・林地地域などの「相互間」で変わる（→見込地）。移行＝宅地地域などの「うちにあって」細分された地域の間で変わる（→移行地）。 |

## 基準学習モード：第2章第2節「不動産の類型」の画像（未作成。置けば自動で表示される）

指定の正は `data/study/` の ch2-s2。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（作成済み） | public/images/characters/chapter02/sarachi_r.webp | R 更地：鑑定クエストの更地（public/art/sarachi.png）を軽いWebPにしたもの |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/tatetsukichi_r.webp | R 建付地：40代の穏やかな男性。カーディガン姿、やわらかい笑顔。小さな家を背負い、足元の土地にしっかり立つ・背中の家（建物）・首から下げた一本の鍵が、家と足元の土地の両方につながっている（同一の所有者）・灰色/木の茶色/緑 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/shakuchiken_r.webp | R 借地権：20代の女性。肩までの赤毛、旅装のマント。背中に小さな家を背負う・地上権を表す金色の杭・賃借の契約の巻物（文字なし）・借りた土地の区画を示すロープ・紺/赤/金 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/sokochi_r.webp | R 底地：50代の女性。落ち着いた着物姿で髪をまとめる。自分の土地の上に建つ他人の小さな家を、穏やかに見上げる・地代を入れる小さな巾着・土地の権利書（文字なし）・足元の土地の上に、借地権キャラの家の模型・土色/深紅/真鍮色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/kubunchijouken_r.webp | R 区分地上権：10代前半の少女。安全ヘルメット、地層の縞柄のジャケット。体の上下に水平な光の帯が2本・足元に地下鉄のトンネルの模型・頭上に高架橋の模型・上下の範囲を示す2本の光の線・鋼色/黄/黒 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/jiyou_r.webp | R 自用の建物及びその敷地：30代の男性。室内着にスリッパ、自分の家の玄関の前に立ち、鍵を回している・一本だけの鍵（自分で使う）・後ろに一軒家の玄関・白/若葉色/木目の茶 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/kashiya_r.webp | R 貸家及びその敷地：60代の男性。丸眼鏡、ふっくらした体型、ベストに蝶ネクタイ、にこやかな笑顔・腰に部屋の数だけの鍵束（賃貸借）・小さなアパートの模型・マスタード/茶/クリーム |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/shakuchikentsuki_r.webp | R 借地権付建物：20代後半の男性。家の形をした大きなマント（屋根のフード）を羽織る・足元に借地の境界杭と金色の杭（借地権）・マントと杭が鎖でつながっている（建物＋借地権）・青緑/赤/銀 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter02/kubunshoyuu_r.webp | R 区分所有建物及びその敷地：5〜6歳くらいの三つ子（男の子2人・女の子1人）。おそろいのパジャマ風の服、背景にマンション・一人目：部屋の鍵（専有部分）・二人目：廊下と階段の模型のかけら（共用部分の共有持分）・三人目：土の地面のかけら（敷地利用権）・ラベンダー/灰/白 |
| 背景（横長WebP） | public/images/backgrounds/chapter02/section02_main.webp | 第2章第2節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter02/land_types.webp | 「宅地の類型」：更地＝建物なし・制約なし。建付地＝建物と敷地が同一の所有者。借地権と底地は同じ土地の表と裏。区分地上権＝上下の範囲を定めた地上権。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter02/building_site_types.webp | 「建物及びその敷地の類型」：自用＝同一人で制約なし。貸家＝同一人だが建物を賃貸借。借地権付建物＝建物＋借地権。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter02/condominium_three.webp | 「区分所有建物及びその敷地の3点」：専有部分・共用部分の共有持分・敷地利用権。区分所有法第２条の第３項・第４項・第６項。 |

## 基準学習モード：第3章第1節「一般的要因」の画像（未作成。置けば自動で表示される）

指定の正は `data/study/` の ch3-s1。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/kakakukeisei_r.webp | R 価格形成要因：40代の女性の指揮者。黒髪のベリーショート、燕尾服。指揮棒を高く掲げる・周りを舞う無数の光の音符（多数の要因）・背後に三段の譜面台（一般的要因・地域要因・個別的要因）・三つの音符が特に明るく光る（効用・相対的稀少性・有効需要）・黒/白/緋色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/ippanteki_r.webp | R 一般的要因：大柄な20代の男性。金髪の短髪、ゆったりしたマント。大きな地球儀を両腕に抱える・地球儀（一般経済社会）・胸に四つの紋章：山（自然）・人（社会）・硬貨（経済）・印章（行政）・群青/金/白 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/shizenyouin_r.webp | R 自然的要因：20代の日焼けした女性の地質学者。ポニーテール、作業用のショートパンツと丈夫なブーツ・地質ハンマー（地質・地盤）・土の層が見える透明な筒（土壌・土層）・起伏の模型（地勢）・コンパス（地理的位置関係）・気圧計（気象）・琥珀/苔色/空色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/shakaiyouin_r.webp | R 社会的要因：50代の男性。はちまきとはっぴ、明るく豪快な笑顔。人々に囲まれている・周りに大家族の人形（人口・家族構成）・学校の模型（教育）・スマホ型の小さな板（情報化）・瓦屋根と洋風屋根の模型（建築様式）・朱/藍/白 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/keizaiyouin_r.webp | R 経済的要因：30代の男性の銀行員。七三分け、細いフレームなしの顔立ち、紺のスリーピーススーツ・金のそろばん・硬貨が流れる小さな天秤・鉄道と船の小さな模型（交通体系・国際化）・歯車（技術革新・産業構造）・緑青/金/黒 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/gyouseiyouin_r.webp | R 行政的要因：50代の女性。白髪まじりのボブ、きっちりした役所の制服、腕章・色分けされた都市計画図（土地利用の計画）・分厚い法令集（規制）・大きな印鑑・防災用のヘルメットを腰に下げる（防災等の規制）・紺/銀/白 |
| 背景（横長WebP） | public/images/backgrounds/chapter03/section01_main.webp | 第3章第1節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/three_factor_levels.webp | 「価格形成要因の三段階」：効用・相対的稀少性・有効需要に影響する要因。広い順に、一般的要因（社会全体）→地域要因（その地域）→個別的要因（その不動産）。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/general_factors_four.webp | 「一般的要因の4区分」：自然的要因5・社会的要因8・経済的要因8・行政的要因5。「税負担」は経済、「不動産に関する税制」は行政。 |

## 基準学習モード：第3章第2節「地域要因」の画像（未作成。置けば自動で表示される）

指定の正は `data/study/` の ch3-s2。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/chiikiyouin_r.webp | R 地域要因：30代の男性の機織り職人。長めの黒髪を手ぬぐいでまとめ、作務衣。小さな機織り機の前に立つ・四色の糸（一般的要因の4区分）・織り上がった布に、街・畑・森の模様（各地域の特性）・藍/生成り/金糸 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/juutakuchiiki_r.webp | R 住宅地域：10歳くらいの男の子。ランドセル、黄色い通学帽、元気な笑顔・手に住宅街のジオラマ（生垣・街並み）・胸に小さな太陽のバッジ（日照）・風見鶏のキーホルダー（風向）・若葉色/黄/白 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/shougyouchiiki_r.webp | R 商業地域：20代後半の女性。髪を高く結い上げ、アーケード柄の羽織と前掛け。そろばんではなく提灯を持つ・提灯（繁華性）・背後にアーケード街・買い物客の小さな人形たち（顧客の質と量）・朱/金/黒 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/kougyouchiiki_r.webp | R 工業地域：40代の大柄な男性の工場長。作業つなぎ、安全ヘルメットを小脇に抱える。短い顎ひげ・背後に港のクレーン・貨物列車・トラック（輸送施設）・腰に大きな歯車（関連産業）・水と電気のメーター（動力資源及び用排水）・鉄灰/オレンジ/紺 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/nouchichiiki_r.webp | R 農地地域：60代の女性の農家。麦わら帽子に手ぬぐい、もんぺ姿。日焼けした笑顔・水路の水をすくう桶（水利及び水質）・野菜のかご（集荷地・消費地）・背景に集落と田畑・麦色/緑/空色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/rinchichiiki_r.webp | R 林地地域：20代の男性の林業家。頭にタオル、チェーンソーではなく斧を担ぐ。がっしりした腕・斧・腰の高度計（標高）・背景に山の斜面と林道・深緑/茶/白 |
| 背景（横長WebP） | public/images/backgrounds/chapter03/section02_main.webp | 第3章第2節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/regional_factor_definition.webp | 「地域要因のしくみ」：一般的要因が相関結合 → 各地域の特性（規模・構成の内容・機能等）ができる → その地域の不動産の価格に全般的な影響。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/residential_commercial_industrial.webp | 「住宅地域・商業地域・工業地域」：住宅地域の14項目が土台。商業地域・工業地域は「前記１．に掲げる地域要因のほか」に、それぞれ特有の要因が加わる。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/farm_forest_areas.webp | 「農地地域と林地地域」：農地地域10項目・林地地域6項目。気象はどちらも「風雨」。水利・集落・集荷地は農地、標高・林道・労働力は林地。 |

## 基準学習モード：第3章第3節「個別的要因」の画像（未作成。置けば自動で表示される）

指定の正は `data/study/` の ch3-s3。

| 種類 | パス | 内容 |
|---|---|---|
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/kobetsuyouin_r.webp | R 個別的要因：20代の女性の探偵。赤いベレー帽、チェックのケープコート、黒髪のショートボブ・大きなルーペ・巻尺・指紋のような模様の地図（二つとない個性）・茶/クリーム/深緑 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/juutakuchi_r.webp | R 住宅地：10代後半の女性。制服にカーディガン、ポニーテールではなく肩までの髪を片側でまとめる・巻尺（間口・奥行）・角地の区画の模型・ひまわりの髪飾り（日照）・ひまわりの黄/白/水色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/shougyouchi_r.webp | R 商業地：20代の男性の大道芸人。シルクハット、派手なベスト、細身・足元に人の流れを示す光の矢印（顧客の流動）・駅の方向を指す標識（主要交通機関）・街の中心を示す小さな地図・赤/金/白 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/kougyouchi_r.webp | R 工業地：30代の力持ちの女性技師。短い金茶の髪、作業着の袖をまくる、たくましい腕・肩にかけた電線の束（動力資源の引込）・水道管（用排水等）・足元にトラックの模型（輸送施設）・黄/灰/青 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/nouchi_r.webp | R 農地：15歳くらいの少年。頭にタオル、長靴、鍬を肩に担ぐ・鍬（耕うんの難易）・水門のハンドル（灌漑排水）・背景にあぜ道と農道・土色/緑/水色 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/rinchi_r.webp | R 林地：50代の女性の山仕事人。日焼けした顔、頭に手ぬぐい、動きやすい山着。背負子に丸太・背負子と丸太（木材の搬出、運搬）・剪定ばさみ（管理の難易）・苔色/焦茶/橙 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/tatemono_r.webp | R 建物：20代の男性。現場用ヘルメット、筋交い（斜めの補強材）の形をした鎧風の上着・胸の懐中時計（建築の年次）・盾は耐火レンガの模様（耐火性）・工具ベルト（維持管理）・コンクリートグレー/朱/白 |
| 立ち絵（透過・縦長。PNGで渡せばWebPに変換） | public/images/characters/chapter03/tatemonoshikichi_r.webp | R 建物及びその敷地：40代の女性の管理人。エプロンに腕まくり、髪をバンダナでまとめる。てきぱきした立ち姿・修繕計画の帳面・庭ばさみ・空室と入居中で色の違う部屋の鍵（貸室の稼働状況）・背後に建物・駐車場・庭の配置図・オリーブ/白/赤茶 |
| 背景（横長WebP） | public/images/backgrounds/chapter03/section03_main.webp | 第3章第3節の学習画面の背景 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/individual_land_factors.webp | 「住宅地・商業地・工業地の個別的要因」：地勢・間口・高低・接面街路などは共通の土台。住宅地は日照と生活施設との接近、商業地は中心・主要交通機関・顧客の流動、工業地は通勤・輸送施設・動力資源・用排水。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/farm_forest_land_factors.webp | 「農地と林地の個別的要因」：農地は農道・灌漑排水・耕うんの難易。林地は木材の搬出・運搬等の難易と管理の難易。気象はどちらも「日照、乾湿、雨量等」。 |
| 概念絵（正方形WebP） | public/images/concepts/chapter03/building_factors.webp | 「建物と、建物及びその敷地」：建物＝年次・機能性・性能・維持管理など9項目。建物及びその敷地＝敷地との適応の状態と修繕計画・管理計画。賃貸用なら賃貸経営管理の良否も。 |

## 保存先と使用プロンプト

### public/art/sarachi.png

Edit this user-supplied original character illustration into a production-ready game sprite. Remove ONLY the white background and make it truly transparent alpha. Keep the exact same full-body female character, face, green eyes, long taupe hair, ivory and dark green dress, gold rope, flowers, red white survey staff, floating land and boundary markers. Preserve pose, expression, intricate painted Japanese fantasy mobile game art, all colors and composition. No new text, no frame, no white halo. Full figure including staff and floating rocks within canvas with tiny margins. Output transparent PNG.

### public/art/station-land.png

Production background illustration for an original Japanese fantasy mobile game about real estate appraisal. Landscape 1536x1024. Luminous richly hand-painted anime art, refined fine linework, warm afternoon golden light, detailed Japanese station-front commercial district, tasteful modern mid-rise shops offices apartments, station entrance visible at back left, tiny pedestrians in background only, trees flowers streetlights. Center and foreground show a clearly visible empty rectangular undeveloped 300 square metre lot with exposed earth, sparse grass, short simple wooden boundary stakes and rope. Front road crossing foreground. Entire image is background illustration, absolutely no character portrait, no game interface, no cards, no buttons, no typography, no text, no logos, no watermarks. Clear perspective, beautiful aspirational city, ivory sandstone gold teal green palette, sophisticated 2D fantasy RPG painted environment harmonious with a long taupe-haired green-eyed earth spirit wearing ivory green gold. Keep central lot unobstructed so players understand it is empty land. Do not depict buildings on the lot. Edge buildings give depth, fine sunbeams. Original environment.
