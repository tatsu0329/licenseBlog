import { Question } from "../types";

// 自動車整備士1級 - エンジン分野
const questionAutoMechanic1Engine1: Question = {
  id: "auto-mechanic-1-2024-1-001",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "engine-1",
  questionNumber: "001",
  questionText:
    "直噴ガソリンエンジンの燃料噴射システムについて、噴射圧力とエミッション性能の関係に関する問題です。",
  questionTheme: "直噴ガソリンエンジンの燃料噴射システム",
  choices: [
    {
      number: 1,
      text: "噴射圧力を低くすると、微粒子状物質（PM）の排出量が減少する",
    },
    {
      number: 2,
      text: "高圧噴射により、燃料の微粒化が促進され、燃焼効率が向上する",
    },
    {
      number: 3,
      text: "噴射圧力は、排気ガス中のNOx（窒素酸化物）濃度に影響しない",
    },
    {
      number: 4,
      text: "噴射タイミングは、PMとNOxの排出量に同時に影響を与えることはない",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。直噴ガソリンエンジンでは、高圧噴射により燃料がより細かく微粒化され、燃焼室内での混合が均一になります。これにより、燃焼効率が向上し、エミッション性能も改善します。逆に、噴射圧力が低いと、燃料の微粒化が不十分となり、PMの排出量が増加します。",
  explanationDetail: `
## 詳細解説

### 直噴ガソリンエンジンの特徴

直噴ガソリンエンジン（GDI: Gasoline Direct Injection）は、燃料を直接シリンダー内に噴射するエンジンです。

### 噴射圧力とエミッション性能の関係

1. **高圧噴射のメリット**
   - 燃料の微粒化が促進される
   - 燃焼室内での混合が均一になる
   - 燃焼効率が向上する
   - PM（微粒子状物質）の排出量が減少する

2. **噴射タイミングの重要性**
   - 噴射タイミングは、PMとNOxの排出量に同時に影響を与える
   - 適切な噴射タイミングにより、両者のバランスを取ることが重要

3. **一般的な噴射圧力**
   - 従来型：約5～10MPa
   - 高圧直噴型：約15～20MPa（近年ではさらに高圧化が進んでいる）

### 関連知識

- 排気ガス規制（ポスト新長期規制）への対応
- NOxとPMのトレードオフ関係
- 三元触媒との組み合わせ
  `,
  difficulty: 4,
  tags: ["エンジン", "直噴", "燃料噴射", "エミッション", "1級"],
  relatedQuestionIds: [],
  source: "自動車整備士1級 2024年6月試験 学科 エンジン（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 自動車整備士1級 - シャシ分野
const questionAutoMechanic1Chassis1: Question = {
  id: "auto-mechanic-1-2024-1-002",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "chassis-1",
  questionNumber: "002",
  questionText:
    "ABS（アンチロック・ブレーキ・システム）の動作原理と制御方式に関する問題です。",
  questionTheme: "ABSの動作原理と制御方式",
  choices: [
    {
      number: 1,
      text: "ABSは、車輪のロックを防止するため、常にブレーキ圧を一定に保つ",
    },
    {
      number: 2,
      text: "ABSは、各車輪の滑り率を検出し、最適な滑り率を維持するようにブレーキ圧を増減制御する",
    },
    {
      number: 3,
      text: "ABSは、ブレーキペダルを踏む力を検出して動作する",
    },
    {
      number: 4,
      text: "ABSは、車速のみを検出して動作するため、路面状態の違いに対応できない",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。ABSは、各車輪に取り付けられた輪速センサーにより車輪の回転速度を検出し、滑り率を計算します。最適な滑り率（通常10～20%）を維持するように、ブレーキ圧を増減制御することで、ロックを防止しながら制動力を最大化します。",
  explanationDetail: `
## 詳細解説

### ABS（アンチロック・ブレーキ・システム）の基本構成

1. **輪速センサー**: 各車輪の回転速度を検出
2. **ECU（電子制御ユニット）**: 輪速センサーの信号を処理し、滑り率を計算
3. **ABS作動器**: ECUからの指令に基づき、ブレーキ圧を制御

### 滑り率と制動性能

滑り率 = (車速 - 輪速) / 車速 × 100(%)

- 滑り率0%：車輪が完全に回転（ブレーキが効いていない状態）
- 滑り率100%：車輪が完全にロック（ブレーキを強くかけすぎた状態）
- 最適な滑り率：10～20%（最大制動力を得られる範囲）

### ABSの制御方式

1. **4チャンネル式**: 4輪を個別に制御（高級車に多い）
2. **3チャンネル式**: 前輪は個別、後輪は一体制御
3. **2チャンネル式**: 左右を対角線で制御

### ポイント

- ABSは、ハンドル操作による回避動作が可能になる
- 制動距離を短縮する効果もあるが、最大のメリットはハンドル操作性の維持
  `,
  difficulty: 4,
  tags: ["シャシ", "ABS", "ブレーキ", "安全装置", "1級"],
  relatedQuestionIds: [],
  source: "自動車整備士1級 2024年6月試験 学科 シャシ（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 自動車整備士1級 - 電気装置分野
const questionAutoMechanic1Electrical1: Question = {
  id: "auto-mechanic-1-2024-1-003",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "electrical-1",
  questionNumber: "003",
  questionText:
    "ハイブリッド車の駆動システムについて、モータとエンジンの動力配分制御に関する問題です。",
  questionTheme: "ハイブリッド車の駆動システム",
  choices: [
    {
      number: 1,
      text: "シリーズハイブリッド方式では、エンジンが直接車輪を駆動する",
    },
    {
      number: 2,
      text: "パラレルハイブリッド方式では、モータとエンジンが同時に車輪を駆動することができる",
    },
    {
      number: 3,
      text: "モータのみで走行することは、いかなるハイブリッド方式でも不可能である",
    },
    {
      number: 4,
      text: "バッテリーの充電は、回生ブレーキのみで行われる",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。パラレルハイブリッド方式では、エンジンとモータが同じ駆動系に接続されており、両者を同時に使用して車輪を駆動することができます。これにより、加速時にはエンジンとモータの両方の力を利用して、強力な加速力を得ることができます。",
  explanationDetail: `
## 詳細解説

### ハイブリッド車の主要な方式

1. **シリーズハイブリッド方式**
   - エンジンは発電機を回すためだけに使用
   - エンジンは直接車輪を駆動しない
   - モータのみが車輪を駆動
   - 例：日産e-POWER

2. **パラレルハイブリッド方式**
   - エンジンとモータが同じ駆動系に接続
   - 両者を同時に使用可能
   - エンジン単独、モータ単独、両者同時の走行が可能
   - 例：ホンダ IMA（旧型）

3. **スプリット方式（トヨタ方式）**
   - パラレルとシリーズの両方の特徴を持つ
   - 動力分割機構（プラネタリーギア）により、柔軟な動力配分が可能
   - 例：トヨタ プリウス

### バッテリー充電方法

1. **回生ブレーキ**: 減速時にモータを発電機として動作させ、運動エネルギーを電気エネルギーに変換
2. **エンジン充電**: エンジンで発電機を回して充電
3. **外部充電**: プラグインハイブリッド車の場合、外部電源からも充電可能

### ポイント

- ハイブリッド車の効率的な走行には、最適な動力配分制御が重要
- モータのみでの走行（EV走行）は、多くのハイブリッド方式で可能
  `,
  difficulty: 5,
  tags: ["電気装置", "ハイブリッド", "モータ", "EV", "1級"],
  relatedQuestionIds: [],
  source: "自動車整備士1級 2024年6月試験 学科 電気装置（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 自動車整備士1級 - 故障診断分野
const questionAutoMechanic1Diagnosis1: Question = {
  id: "auto-mechanic-1-2024-1-004",
  certId: "auto-mechanic-1",
  year: 2024,
  season: 1,
  categoryId: "diagnosis-1",
  questionNumber: "004",
  questionText:
    "エンジン不調の故障診断において、OBD（On-Board Diagnostics）システムの活用方法に関する問題です。",
  questionTheme: "OBDシステムの活用と故障診断",
  choices: [
    {
      number: 1,
      text: "OBD-IIでは、故障コード（DTC）は読み取ることができるが、フリーズフレームデータは取得できない",
    },
    {
      number: 2,
      text: "OBD-IIでは、故障コードの確認だけでなく、ライブデータの読み取りにより、運転中のセンサー値などをリアルタイムで確認できる",
    },
    {
      number: 3,
      text: "OBDシステムは、エンジン系統の故障のみを検出し、シャシやボディ系統の故障は検出しない",
    },
    {
      number: 4,
      text: "故障コードを消去すれば、その故障は完全に解消される",
    },
  ],
  correctAnswer: 2,
  explanation:
    "正解は2です。OBD-IIシステムでは、故障コードの読み取りに加えて、ライブデータの読み取りが可能です。エンジン回転数、冷却水温、スロットル開度、空燃比センサーの出力値など、リアルタイムでセンサー値を確認することで、故障の原因をより詳細に診断できます。",
  explanationDetail: `
## 詳細解説

### OBD（On-Board Diagnostics）システムとは

車両に搭載された故障診断システムで、エンジンや排気ガス処理装置などの状態を監視します。

### OBD-IIの主要機能

1. **故障コード（DTC: Diagnostic Trouble Code）の検出**
   - Pコード：パワートレイン関連
   - Bコード：ボディ関連
   - Cコード：シャシ関連
   - Uコード：通信関連

2. **フリーズフレームデータ**
   - 故障が発生した瞬間の各種センサー値を記録
   - 故障原因の特定に有効

3. **ライブデータの読み取り**
   - リアルタイムでのセンサー値の確認
   - エンジン回転数、冷却水温、スロットル開度など
   - 故障の再現性確認に使用

### 診断手順の例

1. **故障コードの読み取り**: 故障が記録されていないか確認
2. **フリーズフレームデータの確認**: 故障発生時の状況を把握
3. **ライブデータの確認**: 現在の状態を確認
4. **修理後の確認**: 故障コードを消去し、再発がないか確認

### ポイント

- OBDシステムは、エンジン系統だけでなく、シャシやボディ系統の故障も検出可能
- 故障コードを消去しても、根本原因を解決しない限り、再び故障コードが記録される
  `,
  difficulty: 4,
  tags: ["故障診断", "OBD", "診断", "電子制御", "1級"],
  relatedQuestionIds: [],
  source: "自動車整備士1級 2024年6月試験 学科 故障診断（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 自動車整備士3級のサンプル問題（既存）
const questionAutoMechanic3: Question = {
  id: "auto-mechanic-3-2024-1-001",
  certId: "auto-mechanic-3",
  year: 2024,
  season: 1,
  categoryId: "engine-3",
  questionNumber: "001",
  questionText:
    "エンジンの基本構造と動作原理について、シリンダー内での燃焼過程に関する問題です。",
  questionTheme: "エンジンの基本構造",
  choices: [
    {
      number: 1,
      text: "選択肢1（要約）",
    },
    {
      number: 2,
      text: "選択肢2（要約）",
    },
    {
      number: 3,
      text: "選択肢3（要約）",
    },
    {
      number: 4,
      text: "選択肢4（要約）",
    },
  ],
  correctAnswer: 2,
  explanation:
    "この問題は、エンジンの基本構造に関する問題です。正解は2です。4サイクルエンジンでは、吸気、圧縮、燃焼（膨張）、排気の4つの工程が繰り返されます。",
  explanationDetail: `
## 詳細解説

### 4サイクルエンジンの動作原理

4サイクルエンジンは、以下の4つの工程を繰り返します。

1. **吸気行程**: ピストンが下降し、燃料と空気の混合気をシリンダー内に吸入
2. **圧縮行程**: ピストンが上昇し、混合気を圧縮
3. **燃焼行程**: 点火プラグで点火し、燃焼・膨張させてピストンを押し下げる
4. **排気行程**: ピストンが上昇し、燃焼ガスを排出

### ポイント

- 各行程の役割を理解する
- ピストンの上下運動とクランク機構の関係
- タイミングベルトの重要性

### 関連問題

- 2サイクルエンジンの動作原理
- エンジンの冷却システム
- 潤滑システム
  `,
  difficulty: 2,
  tags: ["エンジン", "基本構造", "4サイクル"],
  relatedQuestionIds: [],
  source: "自動車整備士3級 2024年6月試験 学科（国土交通省）",
  sourceUrl: "https://www.mlit.go.jp/",
  officialPastQuestionUrl: "https://www.mlit.go.jp/jidosha/jidosha.html",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// 介護福祉士のサンプル問題（既存）
const questionCareWorker: Question = {
  id: "care-worker-2024-1-001",
  certId: "care-worker",
  year: 2024,
  season: 1,
  categoryId: "care-practice",
  questionNumber: "001",
  questionText:
    "介護の基本原則に関する問題です。利用者の尊厳を尊重した介護の実践について問われています。",
  questionTheme: "介護の基本原則",
  choices: [
    {
      number: 1,
      text: "選択肢1（要約）",
    },
    {
      number: 2,
      text: "選択肢2（要約）",
    },
    {
      number: 3,
      text: "選択肢3（要約）",
    },
    {
      number: 4,
      text: "選択肢4（要約）",
    },
  ],
  correctAnswer: 1,
  explanation:
    "この問題は、介護の基本原則に関する問題です。正解は1です。介護においては、利用者の尊厳を尊重し、自己決定権を最大限に尊重することが重要です。",
  explanationDetail: `
## 詳細解説

### 介護の基本原則

介護福祉士は、以下の基本原則に基づいて介護を実践します。

1. **利用者の尊厳の尊重**: 一人ひとりの人格と人権を尊重する
2. **自己決定権の尊重**: 利用者自身の意思決定を尊重する
3. **個別性の尊重**: 一人ひとりの個性や特性を理解する
4. **自立支援**: できる限り自立した生活が送れるよう支援する

### ポイント

- 利用者中心のケアの重要性
- インフォームドコンセントの必要性
- プライバシーの保護

### 関連問題

- 権利擁護
- コミュニケーション技術
- ケア計画の作成
  `,
  difficulty: 2,
  tags: ["介護", "基本原則", "尊厳"],
  relatedQuestionIds: [],
  source: "介護福祉士 2024年1月試験 筆記試験（厚生労働省）",
  sourceUrl: "https://www.mhlw.go.jp/",
  officialPastQuestionUrl: "https://www.sssc.or.jp/",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// USCPAのサンプル問題（既存）
const questionUSCPA: Question = {
  id: "uscpa-2024-1-001",
  certId: "uscpa",
  year: 2024,
  season: 1,
  categoryId: "far",
  questionNumber: "001",
  questionText:
    "財務会計の基礎概念に関する問題です。一般に公正妥当と認められた会計原則（GAAP）の適用について問われています。",
  questionTheme: "GAAPの適用",
  choices: [
    {
      number: 1,
      text: "選択肢1（要約）",
    },
    {
      number: 2,
      text: "選択肢2（要約）",
    },
    {
      number: 3,
      text: "選択肢3（要約）",
    },
    {
      number: 4,
      text: "選択肢4（要約）",
    },
  ],
  correctAnswer: 3,
  explanation:
    "この問題は、US GAAPの適用に関する問題です。正解は3です。米国の財務会計基準では、保守主義の原則、継続性の原則、重要性の原則などが重要です。",
  explanationDetail: `
## 詳細解説

### US GAAPの基本原則

米国の一般に公正妥当と認められた会計原則（GAAP）には、以下の原則が含まれます。

1. **継続企業の前提**: 企業が継続して営業することを前提とする
2. **会計期間の仮定**: 会計期間を設定して損益を計算する
3. **保守主義の原則**: 不確実性がある場合は保守的な評価を採用
4. **重要性の原則**: 重要性の低い項目は簡便な処理を認める

### ポイント

- FASB（財務会計基準審議会）の役割
- IFRSとの違い
- 財務諸表の構成要素

### 関連問題

- 収益認識基準
- 金融商品の会計処理
- リース取引の会計
  `,
  difficulty: 4,
  tags: ["USCPA", "FAR", "GAAP", "財務会計"],
  relatedQuestionIds: [],
  source: "USCPA FAR 2024年試験（AICPA）",
  sourceUrl: "https://www.aicpa.org/",
  officialPastQuestionUrl: "https://www.aicpa.org/",
  permissionStatus: "pending",
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

export function getAllQuestions(): Question[] {
  return [
    // 自動車整備士1級
    questionAutoMechanic1Engine1,
    questionAutoMechanic1Chassis1,
    questionAutoMechanic1Electrical1,
    questionAutoMechanic1Diagnosis1,
    // 自動車整備士3級
    questionAutoMechanic3,
    // 介護福祉士
    questionCareWorker,
    // USCPA
    questionUSCPA,
  ];
}

export function getQuestion(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id);
}

export function getQuestionsByCert(certId: string): Question[] {
  return getAllQuestions().filter((q) => q.certId === certId);
}
