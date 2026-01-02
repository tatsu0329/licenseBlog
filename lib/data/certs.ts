import { Cert } from "../types";

// 1級自動車整備士
const certAutoMechanic1: Cert = {
  id: "auto-mechanic-1",
  slug: "auto-mechanic-1",
  name: "1級自動車整備士",
  shortName: "1級自動車整備士",
  description:
    "1級自動車整備士は、自動車整備分野における最高位の国家資格であり、自動車の構造・性能・電子制御システムに関する高度な専門知識と判断力を有することを証明する資格です。\n\nエンジンやシャシといった従来の機械構造に加え、近年の自動車に不可欠な電子制御・安全支援システム・故障診断技術までを体系的に理解し、複雑な不具合の原因究明や、適切な整備方法の選択が求められます。\n\n1級自動車整備士は、現場での整備作業にとどまらず、整備方針の判断、後進の指導、工場全体の技術的中核を担う立場として位置づけられており、自動車整備工場やディーラーにおいて高い専門性が評価されます。\n\n本資格、学科（筆記・口述）および実技を通して、理論と実務の両面から能力が確認されます。その難易度は高く、確かな基礎力と計画的な学習が合格への鍵となります。",
  difficulty: 4,
  // 合格率・受験者数は年度により変動するため、トップレベルの固定値は持たない
  // 参考値が必要な場合は passRateHistory を参照すること
  annualExaminees: undefined,
  passRate: undefined,
  studyHours: {
    beginner: 800,
    experienced: 400,
  },
  examInfo: {
    // 受験資格：原則として2級取得後実務経験が必要だが、養成施設修了など条件により異なる
    eligibility:
      "下記のいずれか\n・2級自動車整備士取得後、実務経験3年以上\n・一級整備士養成課程の修了者",
    // 試験日は年度ごとに変動するため、固定日付は持たない
    // 試験は年2回（第1回・第2回）実施されるが、具体的な日程は年度ごとに公表される
    // 最新情報は公式サイトでご確認ください: https://www.jaspa.or.jp/mechanic/
    // 参考例：令和6年度第2回学科試験はR7.03.23（2025年3月23日）実施
    examDates: {
      spring: "実施なし", // 年度により変動するため固定値なし（例：令和6年度第1回は2024年6月頃実施）
      autumn: "令和7年3月23日実施(直近の実施回)", // 最新の実施日（参考例）
    },
    // 合格基準：年度ごとに公表される。学科・口述・実技それぞれに基準が設けられる
    // 1級は学科→口述→実技の段階的試験であり、各段階で合格基準が異なる
    // 出典: 一般社団法人日本自動車整備振興会連合会（JASPA）
    // 参考例（令和6年度第2回）：学科試験は50問中40問以上正解かつ各分野40%以上、口述試験は20点満点中16点以上、実技試験は40点満点中32点以上かつ各問題40%以上
    // 公式サイト: https://www.jaspa.or.jp/mechanic/
    passCriteria:
      "合格基準は年度ごとに公表され、学科試験・口述試験・実技試験それぞれに基準が設けられます。学科試験合格者のみが口述試験に進み、学科・口述両方に合格した者が実技試験を受験できます。\n・学科試験:総得点の基準（50問中40問以上）と各分野ごとの基準（各分野40%以上）\n・口述試験:総得点の基準（20点中16点以上）\n・実技試験:総得点の基準（40点中32点以上）と各分野ごとの基準（各分野40%以上）",
    // 合格率履歴：年度別の実績値（参考値として保持）
    // 出典: 一般社団法人日本自動車整備振興会連合会（JASPA）
    // 注：学科・口述・実技で合格率が異なるため、ここでは学科試験の結果を記載
    // 最終合格率（学科→口述→実技すべて通過）は各段階の合格率を乗算した値となる
    passRateHistory: [
      // 参考値として過去の実績を保持（学科・口述・実技の詳細は公式サイトで確認のこと）
      // 公式サイト: https://www.jaspa.or.jp/mechanic/result/
      {
        year: 2021,
        // 令和3年度第2回学科試験結果
        autumn: {
          passRate: 59,
          examinees: 2341,
          passers: 1381,
          examDate: "R4.03.20実施", // 令和4年3月20日実施（令和3年度第2回）
        },
      },
      {
        year: 2022,
        // 令和4年度第2回学科試験結果
        autumn: {
          passRate: 53.0,
          examinees: 2456,
          passers: 1302,
          examDate: "R5.03.26実施", // 令和5年3月26日実施（令和4年度第2回）
        },
      },
      {
        year: 2023,
        // 令和5年度第2回学科試験結果
        // 出典: https://www.jaspa.or.jp/mechanic/result/2023_2nd.html
        // 注: 1級は学科→口述→実技の段階的試験のため、これは学科試験のみの結果
        autumn: {
          passRate: 59.1, // 一級小型（筆記）学科試験合格率
          examinees: 2784, // 受験者数
          passers: 1645, // 合格者数
          examDate: "R6.03.24実施", // 令和6年3月24日実施（令和5年度第2回）
        },
      },
      {
        year: 2024,
        // 令和6年度第2回学科試験結果
        // 出典: https://www.jaspa.or.jp/mechanic/result/2024_2nd.html
        // 注: 1級は学科→口述→実技の段階的試験のため、これは学科試験のみの結果
        autumn: {
          passRate: 65.7, // 一級小型（筆記）学科試験合格率
          examinees: 2895, // 受験者数
          passers: 1902, // 合格者数
          examDate: "R7.03.23実施", // 令和7年3月23日実施（令和6年度第2回）
        },
      },
    ],
    // 試験構成：1級は学科→口述→実技の3段階で実施される
    // この情報は examInfo に追加フィールドとして持つ想定（型定義拡張が必要な場合は対応）
    // 現時点では passCriteria の説明文で言及している
  },
  relatedCertIds: ["auto-mechanic-2"],
  tags: ["自動車", "整備", "1級", "国家資格", "技術", "主任技術者"],
  features: ["trend", "articles"], // 出題傾向分析と記事機能を有効化
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-12-01"), // データ修正日
};

// 2級自動車整備士
const certAutoMechanic2: Cert = {
  id: "auto-mechanic-2",
  slug: "auto-mechanic-2",
  name: "2級自動車整備士",
  shortName: "2級自動車整備士",
  description:
    "2級自動車整備士は、自動車の整備に関する専門知識と技能を有することを証明する国家資格です。2級整備士は、ガソリン自動車、ジーゼル自動車、二輪自動車、シャシの4つの専門分野に分かれており、それぞれの専門性を深めることができます。\n\n2級整備士は、3級整備士の上位資格として位置づけられ、より高度な整備技術と判断力が求められます。自動車整備工場やディーラーにおいて、中堅技術者として重要な役割を担います。\n\n━━━\n\n【2級ガソリン自動車整備士】\nガソリンエンジン搭載の四輪自動車を専門に整備する資格です。乗用車から軽自動車まで、幅広いガソリン車の点検・整備・修理に対応できます。最も受験者数が多い種類で、一般的な自動車整備工場やディーラーで最も需要が高い資格です。ガソリンエンジンの燃焼理論、燃料噴射システム、点火装置、排気ガス浄化システムなど、ガソリン車特有の技術を深く学びます。\n\n━━━\n\n【2級ジーゼル自動車整備士】\nディーゼルエンジン搭載の自動車（主にトラック・バスなどの商用車）を専門に整備する資格です。ディーゼルエンジンは構造が異なり、燃料噴射システムやターボチャージャー、DPF（ディーゼル微粒子捕集フィルター）など、専用の知識が必要です。商用車の整備工場や輸送業界で特に需要が高く、専門性が評価される資格です。ディーゼルエンジンの圧縮着火理論、燃料噴射ポンプ、過給システム、排気ガス後処理装置など、ディーゼル特有の技術を体系的に学びます。\n\n━━━\n\n【2級二輪自動車整備士】\nオートバイ（自動二輪車）を専門に整備する資格です。四輪車とは異なる構造・メカニズムを持ち、エンジンから駆動系、サスペンション、ブレーキシステムまで、二輪車特有の整備技術が求められます。4種類の中で最も合格率が高いのが特徴です。オートバイ専門店や二輪車ディーラーで需要が高く、バイク愛好家やレーサーを目指す方にも人気の資格です。二輪車の軽量コンパクトな構造、チェーン駆動、キャブレター・燃料噴射、2ストローク・4ストロークエンジンの違いなど、二輪車の特性を理解することが重要です。\n\n━━━\n\n【2級シャシ自動車整備士】\n自動車のシャシ（車体構造・走行装置）を専門に整備する資格です。エンジンや動力伝達装置を除く、車体の骨格構造、サスペンション、ステアリング、ブレーキ、タイヤなどの走行に関わる装置全般の点検・整備・修理に対応します。シャシは自動車の走行性能や安全性に直接関わる重要な部分であり、その整備技術は特に重要です。サスペンションの構造と調整、ブレーキシステムの診断と整備、タイヤの選択とバランス調整、アライメント調整など、シャシ特有の技術を体系的に学びます。",
  difficulty: 3,
  annualExaminees: 25000,
  passRate: 64.5, // 令和7年度第1回の最新合格率（二級ガソリン・ジーゼル・２輪の合計）
  studyHours: {
    beginner: 600,
    experienced: 300,
    // 種類別の勉強時間（合格率の平均に基づいて設定）
    // ガソリン: 平均73.7% → 普通 → 500時間/300時間
    // ジーゼル: 平均74.1% → 普通 → 500時間/300時間
    // 二輪: 平均80.1% → 易しい → 450時間/280時間
    // シャシ: 平均90.4% → 易しい → 400時間/250時間
    byType: {
      gasoline: {
        beginner: 500,
        experienced: 300,
      },
      diesel: {
        beginner: 550,
        experienced: 320,
      },
      motorcycle: {
        beginner: 450,
        experienced: 280,
      },
      chassis: {
        beginner: 500,
        experienced: 300,
      },
    },
  },
  examInfo: {
    eligibility:
      "下記のいずれか\n・3級自動車整備士取得後、実務経験1〜2年以上(学歴要件による)\n・二級整備士養成課程の修了者",
    examDates: {
      spring: "令和7年10月5日実施(直近の実施回)", // 令和7年度第1回
      autumn: "令和7年3月23日実施",
    },
    passCriteria:
      "合格基準は年度ごとに公表され、学科試験・実技試験それぞれに基準が設けられます。学科試験合格者のみが実技試験を受験できます。\n・学科試験(シャシ以外):総得点の基準（40問中28問以上）と各分野ごとの基準（各分野40%以上）\n・学科試験(シャシ)　　:総得点の基準（30問中21問以上）と各分野ごとの基準（各分野40%以上）\n・実技試験(シャシ含む):総得点の基準（30点中18点以上）と各分野ごとの基準（各分野40%以上）",
    passRateHistory: [
      {
        year: 2022,
        // 令和4年度第2回学科試験結果（R5.03.26実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2022_2nd.html
        //
        // 【種類別の詳細データ】
        // 二級ガソリン自動車整備士:
        //   申請者数: 10,733名
        //   受験者数: 10,562名
        //   合格者数: 9,323名
        //   合格率: 88.3%
        //   受験率: 98.4%
        //
        // 二級ジーゼル自動車整備士:
        //   申請者数: 8,229名
        //   受験者数: 8,134名
        //   合格者数: 7,835名
        //   合格率: 96.3%
        //   受験率: 98.8%
        //
        // 二級シャシ自動車整備士:
        //   申請者数: 278名
        //   受験者数: 266名
        //   合格者数: 196名
        //   合格率: 73.7%
        //   受験率: 95.7%
        //
        // 注: 二級２輪のデータはこの回次には存在しない
        //
        // 【合計（ガソリン+ジーゼル+シャシ）】
        //   申請者数: 19,240名（10,733 + 8,229 + 278）
        //   受験者数: 18,962名（10,562 + 8,134 + 266）
        //   合格者数: 17,354名（9,323 + 7,835 + 196）
        //   合格率: 91.5%（計算値）
        autumn: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined, // 種類別データから計算されるため未設定
          passers: undefined, // 種類別データから計算されるため未設定
          examDate: "R5.03.26実施", // 令和5年3月26日実施（令和4年度第2回）
          byType: {
            gasoline: {
              // 2級ガソリン自動車整備士
              passRate: 88.3,
              examinees: 10562,
              passers: 9323,
              applicants: 10733,
              examRate: 98.4,
            },
            diesel: {
              // 2級ジーゼル自動車整備士
              passRate: 96.3,
              examinees: 8134,
              passers: 7835,
              applicants: 8229,
              examRate: 98.8,
            },
            chassis: {
              // 2級シャシ自動車整備士
              passRate: 73.7,
              examinees: 266,
              passers: 196,
              applicants: 278,
              examRate: 95.7,
            },
            // 注: 二級２輪のデータはこの回次には存在しない
          },
        },
      },
      {
        year: 2023,
        // 令和5年度第1回学科試験結果（R5.10.01実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2023_1st.html
        //
        // 【種類別の詳細データ】
        // 二級ガソリン自動車整備士:
        //   申請者数: 2,519名
        //   受験者数: 2,433名
        //   合格者数: 1,492名
        //   合格率: 61.3%
        //   受験率: 96.6%
        //
        // 二級ジーゼル自動車整備士:
        //   申請者数: 424名
        //   受験者数: 405名
        //   合格者数: 230名
        //   合格率: 56.8%
        //   受験率: 95.5%
        //
        // 二級二輪自動車整備士:
        //   申請者数: 759名
        //   受験者数: 733名
        //   合格者数: 572名
        //   合格率: 78.0%
        //   受験率: 96.6%
        //
        // 注: 二級シャシのデータはこの回次には存在しない
        //
        // 【合計（ガソリン+ジーゼル+２輪）】
        //   申請者数: 3,702名（2,519 + 424 + 759）
        //   受験者数: 3,571名（2,433 + 405 + 733）
        //   合格者数: 2,294名（1,492 + 230 + 572）
        //   合格率: 64.2%（計算値）
        spring: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined, // 種類別データから計算されるため未設定
          passers: undefined, // 種類別データから計算されるため未設定
          examDate: "R5.10.01実施", // 令和5年10月1日実施（令和5年度第1回）
          byType: {
            gasoline: {
              // 2級ガソリン自動車整備士
              passRate: 61.3,
              examinees: 2433,
              passers: 1492,
              applicants: 2519,
              examRate: 96.6,
            },
            diesel: {
              // 2級ジーゼル自動車整備士
              passRate: 56.8,
              examinees: 405,
              passers: 230,
              applicants: 424,
              examRate: 95.5,
            },
            motorcycle: {
              // 2級二輪自動車整備士
              passRate: 78.0,
              examinees: 733,
              passers: 572,
              applicants: 759,
              examRate: 96.6,
            },
            // 注: 二級シャシのデータはこの回次には存在しない
          },
        },
        // 令和5年度第2回学科試験結果（R6.03.24実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2023_2nd.html
        //
        // 【種類別の詳細データ】
        // 二級ガソリン自動車整備士:
        //   申請者数: 9,729名
        //   受験者数: 9,600名
        //   合格者数: 8,331名
        //   合格率: 86.8%
        //   受験率: 98.7%
        //
        // 二級ジーゼル自動車整備士:
        //   申請者数: 7,583名
        //   受験者数: 7,515名
        //   合格者数: 7,017名
        //   合格率: 93.4%
        //   受験率: 99.1%
        //
        // 二級シャシ自動車整備士:
        //   申請者数: 351名
        //   受験者数: 321名
        //   合格者数: 276名
        //   合格率: 86.0%
        //   受験率: 91.5%
        //
        // 注: 二級２輪のデータはこの回次には存在しない
        //
        // 【合計（ガソリン+ジーゼル+シャシ）】
        //   申請者数: 17,663名（9,729 + 7,583 + 351）
        //   受験者数: 17,436名（9,600 + 7,515 + 321）
        //   合格者数: 15,624名（8,331 + 7,017 + 276）
        //   合格率: 89.6%（計算値）
        autumn: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined, // 種類別データから計算されるため未設定
          passers: undefined, // 種類別データから計算されるため未設定
          examDate: "R6.03.24実施", // 令和6年3月24日実施（令和5年度第2回）
          byType: {
            gasoline: {
              // 2級ガソリン自動車整備士
              passRate: 86.8,
              examinees: 9600,
              passers: 8331,
              applicants: 9729,
              examRate: 98.7,
            },
            diesel: {
              // 2級ジーゼル自動車整備士
              passRate: 93.4,
              examinees: 7515,
              passers: 7017,
              applicants: 7583,
              examRate: 99.1,
            },
            chassis: {
              // 2級シャシ自動車整備士
              passRate: 86.0,
              examinees: 321,
              passers: 276,
              applicants: 351,
              examRate: 91.5,
            },
            // 注: 二級２輪のデータはこの回次には存在しない
          },
        },
      },
      {
        year: 2024,
        // 令和6年度第1回学科試験結果（R06.10.06実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2024_1st.html
        //
        // 【種類別の詳細データ】
        // 二級ガソリン自動車整備士:
        //   申請者数: 2,425名
        //   受験者数: 2,310名
        //   合格者数: 1,383名
        //   合格率: 59.9%
        //   受験率: 95.3%
        //
        // 二級ジーゼル自動車整備士:
        //   申請者数: 385名
        //   受験者数: 370名
        //   合格者数: 185名
        //   合格率: 50.0%
        //   受験率: 96.1%
        //
        // 二級二輪自動車整備士:
        //   申請者数: 640名
        //   受験者数: 617名
        //   合格者数: 494名
        //   合格率: 80.1%
        //   受験率: 96.4%
        //
        // 注: 二級シャシのデータはこの回次には存在しない
        //
        // 【合計（ガソリン+ジーゼル+２輪）】
        //   申請者数: 3,450名（2,425 + 385 + 640）
        //   受験者数: 3,297名（2,310 + 370 + 617）
        //   合格者数: 2,062名（1,383 + 185 + 494）
        //   合格率: 62.5%（計算値）
        spring: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined, // 種類別データから計算されるため未設定
          passers: undefined, // 種類別データから計算されるため未設定
          examDate: "R06.10.06実施", // 令和6年10月6日実施（令和6年度第1回）
          byType: {
            gasoline: {
              // 2級ガソリン自動車整備士
              passRate: 59.9,
              examinees: 2310,
              passers: 1383,
              applicants: 2425,
              examRate: 95.3,
            },
            diesel: {
              // 2級ジーゼル自動車整備士
              passRate: 50.0,
              examinees: 370,
              passers: 185,
              applicants: 385,
              examRate: 96.1,
            },
            motorcycle: {
              // 2級二輪自動車整備士
              passRate: 80.1,
              examinees: 617,
              passers: 494,
              applicants: 640,
              examRate: 96.4,
            },
            // 注: 二級シャシのデータはこの回次には存在しない
          },
        },
        // 令和6年度第2回学科試験結果（R7.03.23実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2024_2nd.html
        //
        // 【種類別の詳細データ】
        // 二級ガソリン自動車整備士:
        //   申請者数: 9,423名
        //   受験者数: 9,287名
        //   合格者数: 8,001名
        //   合格率: 86.2%
        //   受験率: 98.6%
        //
        // 二級ジーゼル自動車整備士:
        //   申請者数: 6,950名
        //   受験者数: 6,864名
        //   合格者数: 6,471名
        //   合格率: 94.3%
        //   受験率: 98.8%
        //
        // 二級シャシ自動車整備士:
        //   申請者数: 194名
        //   受験者数: 192名
        //   合格者数: 182名
        //   合格率: 94.8%
        //   受験率: 99.0%
        //
        // 注: 二級２輪のデータも存在するが、詳細はWebページで確認のこと
        //
        // 【合計（ガソリン+ジーゼル+シャシ+２輪）】
        //   申請者数: （ガソリン+ジーゼル+シャシ+２輪の合計）
        //   受験者数: （ガソリン+ジーゼル+シャシ+２輪の合計）
        //   合格者数: （ガソリン+ジーゼル+シャシ+２輪の合計）
        //   合格率: （計算値）
        autumn: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined, // 種類別データから計算されるため未設定
          passers: undefined, // 種類別データから計算されるため未設定
          examDate: "R7.03.23実施", // 令和7年3月23日実施（令和6年度第2回）
          byType: {
            gasoline: {
              // 2級ガソリン自動車整備士
              passRate: 86.2,
              examinees: 9287,
              passers: 8001,
              applicants: 9423,
              examRate: 98.6,
            },
            diesel: {
              // 2級ジーゼル自動車整備士
              passRate: 94.3,
              examinees: 6864,
              passers: 6471,
              applicants: 6950,
              examRate: 98.8,
            },
            chassis: {
              // 2級シャシ自動車整備士
              passRate: 94.8,
              examinees: 192,
              passers: 182,
              applicants: 194,
              examRate: 99.0,
            },
            // 注: 二級２輪のデータはWebページで確認のこと
          },
        },
      },
      {
        year: 2025,
        // 令和7年度第1回学科試験結果（R7.10.05実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2025_1st.html
        //
        // 【種類別の詳細データ】
        // 二級ガソリン自動車整備士:
        //   申請者数: 2,669名
        //   受験者数: 2,581名
        //   合格者数: 1,597名
        //   合格率: 61.9%
        //   受験率: 96.7%
        //
        // 二級ジーゼル自動車整備士:
        //   申請者数: 408名
        //   受験者数: 379名
        //   合格者数: 222名
        //   合格率: 58.6%
        //   受験率: 92.9%
        //
        // 二級二輪自動車整備士:
        //   申請者数: 591名
        //   受験者数: 569名
        //   合格者数: 456名
        //   合格率: 80.1%
        //   受験率: 96.3%
        //
        // 【合計】
        //   申請者数: 3,668名
        //   受験者数: 3,529名
        //   合格者数: 2,275名
        //   合格率: 64.5%
        //   受験率: 96.2%
        spring: {
          passRate: 64.5, // 二級ガソリン・ジーゼル・２輪の合計合格率
          examinees: 3529, // 2,581 + 379 + 569
          passers: 2275, // 1,597 + 222 + 456
          examDate: "R7.10.05実施", // 令和7年10月5日実施（令和7年度第1回）
          byType: {
            gasoline: {
              // 2級ガソリン自動車整備士
              passRate: 61.9,
              examinees: 2581,
              passers: 1597,
              applicants: 2669,
              examRate: 96.7,
            },
            diesel: {
              // 2級ジーゼル自動車整備士
              passRate: 58.6,
              examinees: 379,
              passers: 222,
              applicants: 408,
              examRate: 92.9,
            },
            motorcycle: {
              // 2級二輪自動車整備士
              passRate: 80.1,
              examinees: 569,
              passers: 456,
              applicants: 591,
              examRate: 96.3,
            },
          },
        },
      },
    ],
  },
  relatedCertIds: ["auto-mechanic-1", "auto-mechanic-3"],
  tags: ["自動車", "整備", "2級", "国家資格", "技術"],
  features: ["trend"], // 出題傾向分析機能を有効化
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2025-10-05"), // 令和7年度第1回試験結果反映日
};

// 3級自動車整備士
const certAutoMechanic3: Cert = {
  id: "auto-mechanic-3",
  slug: "auto-mechanic-3",
  name: "3級自動車整備士",
  shortName: "3級自動車整備士",
  description:
    "3級自動車整備士は、自動車の整備に関する基礎知識と技能を有することを証明する国家資格です。3級整備士は、ガソリン自動車、ジーゼル自動車、二輪自動車、シャシの4つの専門分野に分かれており、それぞれの専門性を深めることができます。\n\n3級整備士は、自動車整備の基礎を学ぶ最初のステップとして位置づけられており、基本的な整備技術と判断力が求められます。自動車整備工場やディーラーにおいて、基礎的な整備作業を担当する重要な役割を担います。\n\n━━━\n\n【3級ガソリン自動車整備士】\nガソリンエンジン搭載の四輪自動車を専門に整備する資格です。乗用車から軽自動車まで、幅広いガソリン車の基本的な点検・整備・修理に対応できます。最も受験者数が多い種類で、一般的な自動車整備工場やディーラーで最も需要が高い資格です。ガソリンエンジンの基本構造、燃料システム、点火システム、排気システムなど、ガソリン車の基礎的な技術を学びます。3級では、2級ほど専門的な知識は求められませんが、基本的な整備作業を行うために必要な知識と技能を身につけることができます。\n\n━━━\n\n【3級ジーゼル自動車整備士】\nディーゼルエンジン搭載の自動車（主にトラック・バスなどの商用車）を専門に整備する資格です。ディーゼルエンジンはガソリンエンジンとは構造が異なるため、基本的な構造の理解や燃料システム、過給システム、排気システムなどの基礎知識が必要です。商用車の整備工場や輸送業界で需要が高く、基礎的な整備技術を習得するための重要な資格です。ディーゼルエンジンの基本構造、燃料噴射システムの基礎、過給システムの基礎、排気ガス後処理装置の基礎など、ディーゼル車の基本技術を体系的に学びます。\n\n━━━\n\n【3級二輪自動車整備士】\nオートバイ（自動二輪車）を専門に整備する資格です。四輪車とは異なる構造・メカニズムを持つ二輪車の基本的な点検・整備・修理に対応できます。エンジンから駆動系、サスペンション、ブレーキシステムまで、二輪車特有の整備技術の基礎を学びます。オートバイ専門店や二輪車ディーラーで需要が高く、バイク愛好家やレーサーを目指す方にも人気の資格です。二輪車の軽量コンパクトな構造、チェーン駆動、キャブレター・燃料噴射、2ストローク・4ストロークエンジンの違いなど、二輪車の特性を基礎から理解することが重要です。\n\n━━━\n\n【3級シャシ自動車整備士】\n自動車のシャシ（車体構造・走行装置）を専門に整備する資格です。エンジンや動力伝達装置を除く、車体の骨格構造、サスペンション、ステアリング、ブレーキ、タイヤなどの走行に関わる装置全般の基本的な点検・整備・修理に対応します。シャシは自動車の走行性能や安全性に直接関わる重要な部分であり、その基礎的な整備技術を習得することは重要です。サスペンションの基本構造、ブレーキシステムの基礎知識、タイヤの基礎知識、アライメント調整の基礎など、シャシ特有の基礎技術を体系的に学びます。",
  difficulty: 2,
  annualExaminees: 35000,
  passRate: 67.7, // 令和7年度第1回の最新合格率（合計）
  studyHours: {
    beginner: 400,
    experienced: 200,
    // 種類別の勉強時間（合格率の平均に基づいて設定）
    // ガソリン: 平均約70.6% → 普通 → 400時間/200時間
    // ジーゼル: 平均約61.8% → やや難しい → 450時間/220時間
    // 2輪: 平均約85.9% → 易しい → 350時間/180時間
    // シャシ: 平均約66.6% → 普通 → 400時間/200時間
    byType: {
      gasoline: {
        beginner: 160,
        experienced: 80,
      },
      diesel: {
        beginner: 180,
        experienced: 100,
      },
      motorcycle: {
        beginner: 140,
        experienced: 70,
      },
      chassis: {
        beginner: 160,
        experienced: 80,
      },
    },
  },
  examInfo: {
    eligibility:
      "下記のいずれか\n・実務経験3〜6ヶ月以上(学歴要件による)\n・三級整備士養成課程の修了者",
    examDates: {
      spring: "令和7年10月5日実施(直近の実施回)", // 令和7年度第1回
      autumn: "令和7年3月23日実施",
    },
    passCriteria:
      "合格基準は年度ごとに公表され、学科試験・実技試験それぞれに基準が設けられます。学科試験合格者のみが実技試験を受験できます。\n・学科試験:総得点の基準（30問中21問以上）\n・実技試験:総得点の基準（30点中18点以上）",
    passRateHistory: [
      {
        year: 2022,
        // 令和4年度第2回学科試験結果（R5.03.26実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2022_2nd.html
        autumn: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined,
          passers: undefined,
          examDate: "R5.03.26実施", // 令和5年3月26日実施（令和4年度第2回）
          byType: {
            gasoline: {
              // 三級ガソリン自動車整備士
              passRate: 71.9,
              examinees: 4008,
              passers: 2881,
              applicants: 4193,
              examRate: 95.6,
            },
            diesel: {
              // 三級ジーゼル自動車整備士
              passRate: 60.6,
              examinees: 709,
              passers: 430,
              applicants: 739,
              examRate: 95.9,
            },
            chassis: {
              // 三級シャシ自動車整備士
              passRate: 63.8,
              examinees: 1799,
              passers: 1148,
              applicants: 1843,
              examRate: 97.6,
            },
            motorcycle: {
              // 三級二輪自動車整備士
              // 注: 三級2輪は各年度の第2回のみ実施
              // 出典: https://www.jaspa.or.jp/mechanic/result/2022_2nd.html
              passRate: 84.1,
              examinees: 245,
              passers: 206,
              applicants: 255, // 推定値（公式サイトで確認が必要）
              examRate: undefined, // 公式サイトで確認が必要
            },
          },
        },
      },
      {
        year: 2023,
        // 令和5年度第1回学科試験結果（R5.10.01実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2023_1st.html
        spring: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined,
          passers: undefined,
          examDate: "R5.10.01実施", // 令和5年10月1日実施（令和5年度第1回）
          byType: {
            gasoline: {
              // 三級ガソリン自動車整備士
              passRate: 74.0,
              examinees: 3756,
              passers: 2779,
              applicants: 3857,
              examRate: 97.4,
            },
            diesel: {
              // 三級ジーゼル自動車整備士
              passRate: 57.7,
              examinees: 343,
              passers: 198,
              applicants: 358,
              examRate: 95.8,
            },
            chassis: {
              // 三級シャシ自動車整備士
              passRate: 64.4,
              examinees: 942,
              passers: 607,
              applicants: 966,
              examRate: 97.5,
            },
            motorcycle: {
              // 三級二輪自動車整備士
              // 注: 三級2輪は各年度の第2回のみ実施されるため、第1回にはデータなし
              passRate: undefined,
              examinees: undefined,
              passers: undefined,
              applicants: undefined,
              examRate: undefined,
            },
          },
        },
        // 令和5年度第2回学科試験結果（R6.03.24実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2023_2nd.html
        autumn: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined,
          passers: undefined,
          examDate: "R6.03.24実施", // 令和6年3月24日実施（令和5年度第2回）
          byType: {
            gasoline: {
              // 三級ガソリン自動車整備士
              passRate: 65.6,
              examinees: 3659,
              passers: 2399,
              applicants: 3823,
              examRate: 95.7,
            },
            diesel: {
              // 三級ジーゼル自動車整備士
              passRate: 57.6,
              examinees: 688,
              passers: 396,
              applicants: 712,
              examRate: 96.6,
            },
            chassis: {
              // 三級シャシ自動車整備士
              passRate: 67.4,
              examinees: 1816,
              passers: 1224,
              applicants: 1892,
              examRate: 96.0,
            },
            motorcycle: {
              // 三級二輪自動車整備士
              // 注: 三級2輪は各年度の第2回のみ実施
              // 出典: https://www.jaspa.or.jp/mechanic/result/2023_2nd.html
              // 令和5年度第2回の詳細データは公式サイトで確認が必要
              passRate: 83.0,
              examinees: 265,
              passers: 220,
              applicants: 278,
              examRate: 95.3,
            },
          },
        },
      },
      {
        year: 2024,
        // 令和6年度第1回学科試験結果（R06.10.06実施）
        spring: {
          passRate: undefined, // 種類別データから計算されるため未設定
          examinees: undefined,
          passers: undefined,
          examDate: "R06.10.06実施",
          byType: {
            gasoline: {
              passRate: 74.5,
              examinees: 3756,
              passers: 2799,
              applicants: 3863,
              examRate: 97.2,
            },
            diesel: {
              passRate: 61.7,
              examinees: 269,
              passers: 166,
              applicants: 286,
              examRate: 94.1,
            },
            chassis: {
              passRate: 65.9,
              examinees: 819,
              passers: 540,
              applicants: 851,
              examRate: 96.2,
            },
            motorcycle: {
              // 三級二輪自動車整備士
              // 注: 三級2輪は各年度の第2回のみ実施されるため、第1回にはデータなし
              passRate: undefined,
              examinees: undefined,
              passers: undefined,
              applicants: undefined,
              examRate: undefined,
            },
          },
        },
        // 令和6年度第2回学科試験結果（R7.03.23実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2024_2nd.html
        autumn: {
          passRate: 68.8, // 合計合格率
          examinees: 8434, // 合計受験者数（ガソリン3,682 + ジーゼル637 + シャシ1,588 + その他）
          passers: 5802, // 合計合格者数（ガソリン2,519 + ジーゼル376 + シャシ1,070 + その他）
          examDate: "R7.03.23実施", // 令和7年3月23日実施（令和6年度第2回）
          byType: {
            gasoline: {
              // 三級ガソリン自動車整備士
              passRate: 68.4,
              examinees: 3682,
              passers: 2519,
              applicants: 3838,
              examRate: 95.9,
            },
            diesel: {
              // 三級ジーゼル自動車整備士
              passRate: 59.0,
              examinees: 637,
              passers: 376,
              applicants: 665,
              examRate: 95.8,
            },
            chassis: {
              // 三級シャシ自動車整備士
              passRate: 67.4,
              examinees: 1588,
              passers: 1070,
              applicants: 1645,
              examRate: 96.5,
            },
            motorcycle: {
              // 三級二輪自動車整備士
              // 注: 三級2輪は各年度の第2回のみ実施
              // 出典: https://www.jaspa.or.jp/mechanic/result/2024_2nd.html
              passRate: 87.7,
              examinees: 236,
              passers: 207,
              applicants: undefined, // 公式サイトで確認が必要
              examRate: undefined, // 公式サイトで確認が必要
            },
          },
        },
      },
      {
        year: 2025,
        // 令和7年度第1回学科試験結果（R7.10.05実施）
        // 出典: https://www.jaspa.or.jp/mechanic/result/2025_1st.html
        spring: {
          passRate: 67.7, // 合計合格率
          examinees: 8566, // 合計受験者数
          passers: 5799, // 合計合格者数
          examDate: "R7.10.05実施", // 令和7年10月5日実施（令和7年度第1回）
          byType: {
            gasoline: {
              // 三級ガソリン自動車整備士
              passRate: 69.2,
              examinees: 3831,
              passers: 2650,
              applicants: 3951,
              examRate: 97.0,
            },
            diesel: {
              // 三級ジーゼル自動車整備士
              passRate: 74.1,
              examinees: 270,
              passers: 200,
              applicants: 285,
              examRate: 94.7,
            },
            chassis: {
              // 三級シャシ自動車整備士
              passRate: 70.8,
              examinees: 750,
              passers: 531,
              applicants: 775,
              examRate: 96.8,
            },
            motorcycle: {
              // 三級二輪自動車整備士
              // 注: 三級2輪は各年度の第2回のみ実施されるため、第1回にはデータなし
              passRate: undefined,
              examinees: undefined,
              passers: undefined,
              applicants: undefined,
              examRate: undefined,
            },
          },
        },
      },
    ],
  },
  relatedCertIds: ["auto-mechanic-2"],
  tags: ["自動車", "整備", "3級", "国家資格", "技術"],
  features: ["trend"], // 出題傾向分析機能を有効化
  publishedAt: new Date("2024-01-01"),
  updatedAt: new Date("2025-10-05"), // 令和7年度第1回試験結果反映日
};


export function getAllCerts(): Cert[] {
  return [
    certAutoMechanic1,
    certAutoMechanic2,
    certAutoMechanic3,
  ];
}

export function getCert(slug: string): Cert | undefined {
  return getAllCerts().find((c) => c.slug === slug);
}
