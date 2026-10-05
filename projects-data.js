/**
 * ==========================================================================
 * ポートフォリオ作品データ (編集用ファイル)
 * ==========================================================================
 * ここを書き換えるだけで、サイト上の作品情報やモーダル詳細が自動的に更新されます。
 * 新しい作品を追加したり、文章や画像パスを自由に変更できます。
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "sone-engine",
    category: "engine", // "engine" | "game" | "unity-tools"
    featured: true,     // おすすめバッジを表示するか
    title: "SoneEngine (自作ゲームエンジン)",
    subTitle: "DirectX / C++ / ImGui",
    repoUrl: "https://github.com/SoneTaisei/SoneEngine",
    image: "", // 画像がある場合は "assets/images/sone-engine.png" のように指定
    icon: "fa-solid fa-cubes",
    iconColor: "#0284c7",
    tags: ["C++", "DirectX", "Dear ImGui", "自作エンジン"],
    shortDesc: "DirectXを用いた描画パイプラインの構築と、ImGuiによるデバッグ・開発ツールを統合した独自のC++製ゲームエンジンです。",
    details: {
      summary: "市販のゲームエンジンに頼らず、ハードウェアとDirectXの描画パイプラインの仕組みを深く理解するためにゼロから構築したオリジナルのゲームエンジンです。デバッグ効率と拡張性を重視して設計しています。",
      role: "個人開発（エンジンアーキテクチャ設計、DirectX描画パイプライン、デバッグGUI構築）",
      period: "開発中 / 継続アップデート",
      points: [
        "DirectX描画パイプラインの自作と、頂点バッファ・定数バッファのバインド管理",
        "#ifdef USE_IMGUI によるデバッグ/デベロップモードの切り替えと、リアルタイムなGUIパラメータ調整機能の実装",
        "テクスチャ、3Dメッシュなどのアセット管理機構とリソースリーク防止設計",
        "ゲームオブジェクトの階層構造（親子関係）およびトランスフォーム行列計算の自作"
      ],
      codeSnippet: `// ImGuiデバッグ制御の設計例
#ifdef USE_IMGUI
    ImGui::Begin("エンジン設定 / インスペクター");
    ImGui::DragFloat3("平行光源の向き", &lightDir.x, 0.05f);
    ImGui::ColorEdit3("環境光カラー", &ambientColor.x);
    ImGui::Text("フレームレート: %.1f FPS", ImGui::GetIO().Framerate);
    ImGui::End();
#endif`
    }
  },
  {
    id: "pg3",
    category: "game",
    featured: false,
    title: "3Dゲーム制作実習 (PG3)",
    subTitle: "C++ / 3Dアクション",
    repoUrl: "https://github.com/SoneTaisei/PG3",
    image: "",
    icon: "fa-solid fa-gamepad",
    iconColor: "#2563eb",
    tags: ["C++", "3Dアクション", "ゲームループ", "当たり判定"],
    shortDesc: "C++で制作した3Dアクションゲーム。プレイヤーの移動・ジャンプ挙動、カメラ追従、敵との当たり判定、ステージ進行を実装。",
    details: {
      summary: "3D空間におけるプレイヤーの操作感（接地判定、慣性、ジャンプ感）にこだわり、カメラの追従性や障害物とのめり込み回避を丁寧に実装した3Dゲーム制作プロジェクトです。",
      role: "メインプログラマー（プレイヤー挙動、カメラ制御、衝突判定、ゲーム進行）",
      period: "約2ヶ月",
      points: [
        "三人称視点（TPS）カメラの注視点補間および地形・壁とのめり込み防止処理",
        "球・カプセル・OBB（有向境界ボックス）を用いた高精度な衝突判定システム",
        "攻撃判定の発生タイミングやサウンド再生と連動させたアニメーション制御",
        "待機・移動・攻撃・被ダメージを明確に分離したステートマシン（State Pattern）の導入"
      ],
      codeSnippet: `// プレイヤーステートの更新
void Player::Update() {
    currentState_->Update(*this);
    UpdateTransform();
    UpdateCollider();
}`
    }
  },
  {
    id: "mt4",
    category: "engine",
    featured: false,
    title: "HLSL シェーダー & 描画研究 (MT4)",
    subTitle: "HLSL / DirectX / ライティング",
    repoUrl: "https://github.com/SoneTaisei/MT4",
    image: "",
    icon: "fa-solid fa-wand-magic-sparkles",
    iconColor: "#7c3aed",
    tags: ["HLSL", "シェーダー", "DirectX", "ライティング"],
    shortDesc: "プログラマブルシェーダーによるグラフィックス表現の研究。頂点/ピクセルシェーダー、ライティングモデル、ポストプロセスを実装。",
    details: {
      summary: "GPUの描画パイプラインを深く制御するため、HLSLを用いて各種ライティング計算やポストエフェクトのシェーダーコードを記述・検証した研究リポジトリです。",
      role: "シェーダープログラミング、DirectX描画連携",
      period: "継続研究",
      points: [
        "ランバート反射、フォン鏡面反射（Phong / Blinn-Phong）のピクセルシェーダー実装",
        "法線マップ（Normal Mapping）による微細な凹凸表現（Tangent空間での計算）",
        "画面全体のカラーグレーディングやブルーム、ブラー等のポストエフェクト検証",
        "DirectX側との定数バッファ（16バイトアライメント）連携と最適化"
      ],
      codeSnippet: `// Example Pixel Shader Lighting calculation
float3 N = normalize(input.normal);
float3 L = normalize(-lightDir);
float diffuse = max(dot(N, L), 0.0f);
return float4(albedo.rgb * diffuse, albedo.a);`
    }
  },
  {
    id: "al4",
    category: "game",
    featured: false,
    title: "ゲームアルゴリズム開発 (AL4)",
    subTitle: "C++ / 敵AI / 最適化",
    repoUrl: "https://github.com/SoneTaisei/AL4",
    image: "",
    icon: "fa-solid fa-shield-halved",
    iconColor: "#0d9488",
    tags: ["C++", "アルゴリズム", "敵AI", "設計パターン"],
    shortDesc: "保守性と拡張性の高いゲーム設計を目指したアルゴリズム研究。エネミー行動制御やデータ構造の最適化に取り組みました。",
    details: {
      summary: "ゲーム開発においてコードが複雑化するのを防ぎ、拡張しやすいアーキテクチャを確立するための実践プロジェクトです。エネミーの行動パターン管理や衝突判定の計算量削減に注力しました。",
      role: "ゲームロジック・アルゴリズム設計",
      period: "約1ヶ月",
      points: [
        "ステートパターンを活用したエネミーAIの行動分岐（索敵・追跡・攻撃・逃走）",
        "空間分割（グリッド分割）を用いた衝突判定の探索回数削減・高速化",
        "イベント通知（Observerパターン）によるUIとゲーム本体の疎結合化",
        "スマートポインタ（std::unique_ptr / std::shared_ptr）による安全なメモリ管理"
      ],
      codeSnippet: `// 敵キャラクターの行動インターフェース
class IEnemyState {
public:
    virtual ~IEnemyState() = default;
    virtual void Enter(Enemy& enemy) = 0;
    virtual void Execute(Enemy& enemy) = 0;
    virtual void Exit(Enemy& enemy) = 0;
};`
    }
  },
  {
    id: "math-3d",
    category: "engine",
    featured: false,
    title: "3D幾何・行列演算ライブラリ (ExtendedTo3D)",
    subTitle: "C++ / 3D数学 / クォータニオン",
    repoUrl: "https://github.com/SoneTaisei/00_01_ExtendedTo3D",
    image: "",
    icon: "fa-solid fa-compass-drafting",
    iconColor: "#059669",
    tags: ["C++", "3D数学", "線形代数", "クォータニオン"],
    shortDesc: "既存ライブラリに頼らず、3D変換行列やベクトルの計算を自前で実装。ゲームを支える数学的基盤を構築。",
    details: {
      summary: "ゲームグラフィックスの根本である線形代数・3D幾何学を身につけるため、ベクトル・行列・クォータニオンの各種演算クラスを独自に実装しました。",
      role: "数学ライブラリ開発",
      period: "基礎研究",
      points: [
        "Vector3 / Vector4 の内積・外積・正規化・線形補間（Lerp）の実装",
        "4x4同次変換行列による平行移動・回転・スケーリングおよび逆行列計算",
        "透視投影（パースペクティブ）行列およびビュー変換行列の数式からの導出",
        "ジンバルロックを防止する四元数（クォータニオン）と球面線形補間（Slerp）の実装"
      ],
      codeSnippet: `// 4x4 アフィン変換行列の合成
Matrix4x4 MakeAffineMatrix(const Vector3& scale, const Vector3& rot, const Vector3& trans) {
    Matrix4x4 S = MakeScaleMatrix(scale);
    Matrix4x4 R = MakeRotateXYZMatrix(rot);
    Matrix4x4 T = MakeTranslateMatrix(trans);
    return Multiply(Multiply(S, R), T);
}`
    }
  },
  {
    id: "td2",
    category: "game",
    featured: false,
    title: "アクションゲーム開発 (TD2)",
    subTitle: "C++ / レベルデザイン / 爽快感演出",
    repoUrl: "https://github.com/SoneTaisei/TD2_L2_1",
    image: "",
    icon: "fa-solid fa-crosshairs",
    iconColor: "#ea580c",
    tags: ["C++", "アクション", "演出制御", "ステージギミック"],
    shortDesc: "操作の心地よさとテンポの良いゲーム性を目指したアクションゲーム制作。ギミックの配置や演出の細部にこだわった作品。",
    details: {
      summary: "プレイヤーが遊んでいて「気持ちいい」と感じる操作感と、テンポの良いゲーム進行を重視して制作したアクションゲームです。",
      role: "ゲームプログラマー（操作感チューニング、ギミック制御、演出）",
      period: "約1.5ヶ月",
      points: [
        "入力バッファリングと先行入力の受付による快適なアクション操作感",
        "動く床・トゲ・スイッチなどのインタラクティブなステージギミック制御",
        "ヒットストップや画面揺れ（スクリーンシェイク）による攻撃ヒット時の手応え演出",
        "タイム計測、スコア管理、ゲームオーバー/クリア画面の遷移フロー制御"
      ],
      codeSnippet: `// ヒットストップと画面揺れの連携
if (isHit) {
    ScreenShake::Trigger(0.2f, 5.0f); // 揺れ時間と強度
    TimeManager::RequestHitStop(0.08f); // 一瞬の静止
}`
    }
  },
  {
    id: "unity-project",
    category: "unity-tools",
    featured: false,
    title: "Unity プロジェクト制作 (TR1_2_Unity)",
    subTitle: "Unity / C# / コンポーネント指向",
    repoUrl: "https://github.com/SoneTaisei/TR1_2_Unity",
    image: "",
    icon: "fa-brands fa-unity",
    iconColor: "#e11d48",
    tags: ["Unity", "C#", "コンポーネント指向", "物理挙動"],
    shortDesc: "UnityとC#によるゲーム制作。コンポーネント指向に基づいた設計と、物理挙動を活用したスピーディーなゲームプレイを構築。",
    details: {
      summary: "Unityエンジンの機能をフル活用し、スピーディーなプロトタイピングとデータドリブンなゲーム設計を実践したプロジェクトです。",
      role: "Unityプログラマー",
      period: "約1ヶ月",
      points: [
        "Unityライフサイクル（Update / FixedUpdate）に適した責務分離",
        "ScriptableObjectを用いた敵ステータスや武器パラメータのデータ管理",
        "RigidbodyとPhysicsエンジンを用いた跳ね返りや重力ギミックの実装",
        "UIアニメーションとDOTweenを活用した直感的な操作フィードバック"
      ],
      codeSnippet: `// ScriptableObjectを活用したパラメータ管理
public class PlayerAttack : MonoBehaviour {
    [SerializeField] private WeaponData weaponData;
    public void Fire() {
        Instantiate(weaponData.bulletPrefab, muzzle.position, muzzle.rotation);
    }
}`
    }
  },
  {
    id: "tl1-tool",
    category: "unity-tools",
    featured: false,
    title: "開発支援スクリプト & ツール (TL1)",
    subTitle: "自動化 / バッチ / 開発環境改善",
    repoUrl: "https://github.com/SoneTaisei/TL1",
    image: "",
    icon: "fa-solid fa-terminal",
    iconColor: "#d97706",
    tags: ["Batch", "PowerShell", "自動化", "ワークフロー"],
    shortDesc: "日々のビルド作業やファイル管理を効率化するスクリプト群。ゲーム開発を円滑に進めるための環境整備への取り組み。",
    details: {
      summary: "手作業によるミスを減らし、ゲームプログラミング本来の作業に集中できるよう、定型業務をワンクリックで実行できる自動化環境を構築しました。",
      role: "ツール作成・開発環境整備",
      period: "随時作成",
      points: [
        "Visual StudioのMSBuildと連携したワンクリック一括ビルドスクリプト",
        "テクスチャや3Dモデルアセットの一括リネーム・配置自動化",
        "不要な中間ファイルを除外した配布用ZIPパッケージの自動生成",
        "コミット前のファイル差分確認とクリーンアップによる事故防止"
      ],
      codeSnippet: `@echo off
echo 自動ビルド処理を開始します...
msbuild SoneEngine.sln /p:Configuration=Release /p:Platform=x64
if %errorlevel% neq 0 (
    echo ビルドに失敗しました。
    exit /b %errorlevel%
)
echo ビルドが正常に完了しました。`
    }
  }
];
