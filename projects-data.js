/**
 * ==========================================================================
 * ポートフォリオ作品データ (編集用ファイル)
 * ==========================================================================
 * ここを書き換えるだけで、サイト上の作品情報やモーダル詳細が自動的に更新されます。
 * 新しい作品を追加したり、文章や画像パスを自由に変更できます。
 */

const PORTFOLIO_PROJECTS = [
  // ==========================================
  // 看板作品・自作ゲームエンジン
  // ==========================================
  {
    id: "sone-engine",
    category: "engine",
    featured: true,
    title: "SoneEngine (自作ゲームエンジン)",
    subTitle: "C++ / 自作物理・リプレイエディター搭載 / 自作ゲームエンジン",
    repoUrl: "https://github.com/SoneTaisei/SoneEngine",
    youtubeId: "",
    youtubeUrl: "",
    image: "assets/images/sone-engine-github.png",
    icon: "fa-solid fa-cubes",
    iconColor: "#ea580c",
    tags: ["個人開発", "C++", "DirectX", "自作物理挙動", "リプレイエディター", "Dear ImGui"],
    shortDesc: "物体の転がりや衝突などの物理挙動を自作し、不具合の瞬間を1コマ単位で巻き戻して調べられるリプレイ機能を備えたC++製オリジナルゲームエンジン。",
    details: {
      summary: "『ゲームの手触りの良さ』と『バグを見つけやすいデバッグ環境』を追求してゼロから作ったオリジナルゲームエンジンです。物体のリアルな跳ね返りや摩擦を自前で計算する物理シミュレーションと、ゲームの動きを巻き戻して怪しい挙動をじっくり検証できるリプレイ機能を開発しました。",
      role: "個人開発（エンジン構造設計、物理シミュレーション、リプレイ巻き戻し機能、ImGuiデバッグ画面）",
      period: "開発中 / 継続アップデート",
      points: [
        "【コマ送り・巻き戻し機能】ゲームの進行を1フレーム単位で巻き戻し、バグが起きた瞬間の状況をじっくり検証できるリプレイ機能を実装",
        "【自作の物理シミュレーション】箱やカプセル、球体同士の当たり判定・めり込み防止・跳ね返りや摩擦の計算を自前でプログラミング",
        "【リアルタイム調整UI（ImGui）】ゲームを動かしながら当たり判定の枠線を表示したり、速度やパラメータを画面上で即座に調整できるデバッグ環境を構築",
        "【DirectXによる3D描画】シェーダーを使った質感表現や3Dモデル・テクスチャの読み込みなど、描画の土台をゼロから構築"
      ],
      codeSnippet: `// リプレイエディターとデバッグUIの制御例
#ifdef USE_IMGUI
    ImGui::Begin("リプレイ & 物理デバッガー");
    if (ImGui::Button("録画 / 一時停止")) { replayManager_->TogglePause(); }
    
    // タイムラインシークバー（巻き戻し）
    int currentFrame = replayManager_->GetCurrentFrame();
    if (ImGui::SliderInt("フレームシーク", &currentFrame, 0, replayManager_->GetMaxFrame())) {
        replayManager_->SeekFrame(currentFrame); // 状態を巻き戻し復元
    }
    
    // 物理パラメータと速度ベクトルの検証
    ImGui::Text("剛体速度: (%.2f, %.2f, %.2f)", rb.velocity.x, rb.velocity.y, rb.velocity.z);
    ImGui::Checkbox("コライダーワイヤーフレーム表示", &debugDrawColliders);
    ImGui::End();
#endif`
    }
  },

  // ==========================================
  // 制作ゲーム作品群 (YouTube動画あり)
  // ==========================================
  {
    id: "itsumademo-shippaisaku",
    category: "game",
    featured: false,
    title: "いつまでも失敗作",
    subTitle: "C++ / 3Dボスバトルアクション / 3年次 チーム制作",
    repoUrl: "",
    downloadUrl: "Game/いつまでも失敗作.zip",
    downloadSize: "約 487 MB",
    youtubeId: "eScajmbx_0U",
    youtubeUrl: "https://youtu.be/eScajmbx_0U",
    image: "https://i.ytimg.com/vi/eScajmbx_0U/hqdefault.jpg",
    icon: "fa-solid fa-crosshairs",
    iconColor: "#dc2626",
    tags: ["3年次 チーム制作", "C++", "DirectX", "3Dアクション", "ボスバトル", "ロックオン"],
    shortDesc: "巨大なボスと一騎打ちを繰り広げる本格3Dアクションゲーム。ロックオンや回避、攻撃コンボの小気味よい操作性と、ヒット時の手応え演出を追求。",
    details: {
      summary: "3年次のチーム制作作品です。巨大なボスに立ち向かう本格的な3Dボスバトルアクションゲームです。ロックオンで狙いを定めて攻撃を叩き込むテンポの良さや、ボスの猛攻をステップ回避でかいくぐる気持ちよさにこだわり、攻撃が当たった瞬間のヒットストップや画面の揺れなど手応えのあるアクション演出をプログラミングしました。",
      role: "メインプログラマー（プレイヤーのアクション制御、ボスのAI・攻撃パターン、当たり判定、演出連携）",
      period: "3年次 チーム制作",
      points: [
        "ロックオン機能、連続攻撃（コンボ）、ステップ回避がスムーズにつながる快適な操作感の実装",
        "ボスの残り体力に応じて攻撃パターンが変化するAI（接近攻撃・遠距離弾幕・広範囲衝撃波）の実装",
        "攻撃が当たった瞬間の『ヒットストップ』や画面の揺れにより、ズバッと斬った手応えを演出",
        "チーム開発でのGitブランチ管理とコードレビューを担当し、バグの早期発見をリード"
      ],
      codeSnippet: `// ボスの行動ステート更新と攻撃判定
void BossEnemy::Update() {
    behaviorTree_->Update();
    if (isAttacking_) {
        attackCollider_->SetCenter(handBonePosition_);
        CheckPlayerHit(attackCollider_);
    }
#ifdef USE_IMGUI
    ImGui::Text("Boss State: %s", currentStateName_);
    ImGui::ProgressBar(hp_ / maxHp_);
#endif
}`
    }
  },
  {
    id: "beedama-korokoro",
    category: "game",
    featured: false,
    title: "ビー玉コロコロ",
    subTitle: "C++ / 3D物理アクション / 2年次 チーム制作",
    repoUrl: "",
    downloadUrl: "Game/ビー玉コロコロ.zip",
    downloadSize: "約 130 MB",
    youtubeId: "UwGkuZmjAUI",
    youtubeUrl: "https://youtu.be/UwGkuZmjAUI",
    image: "https://i.ytimg.com/vi/UwGkuZmjAUI/hqdefault.jpg",
    icon: "fa-solid fa-bowling-ball",
    iconColor: "#0284c7",
    tags: ["2年次 チーム制作", "C++", "DirectX", "3D球体物理", "物理アクション", "ジャイロ操作"],
    shortDesc: "コントローラーのジャイロ操作で直感的にステージを傾け、ビー玉を操る3D物理アクションゲーム。球体の慣性・摩擦・回転トルクや反発シミュレーションを自前で実装。",
    details: {
      summary: "2年次後期のチーム制作作品です。コントローラーのジャイロセンサーを活用し、プレイヤーの手元の傾きと連動してステージを傾ける直感的な操作感を実現した3D物理アクションゲームです。単なる数値シミュレーションにとどまらず、プレイヤーが心地よく操作できるように球体の回転慣性・斜面摩擦・動く壁や回転障害物との衝突・反発挙動を数学的・物理的に自前実装しました。",
      role: "物理演算・入力制御プログラマー（球体物理、ジャイロ連動ステージ制御、ギミック衝突判定）",
      period: "2年次 後期 チーム制作",
      points: [
        "ジャイロセンサーの姿勢入力による、手元の傾きとダイレクトに連動する直感的なステージ操作の実装",
        "ステージの傾きベクトルに応じた重力加速度の分解と、ビー玉への摩擦・回転トルクの自作シミュレーション",
        "球体とメッシュ・傾斜面との連続衝突判定（めり込み押し戻しと法線反発ベクトルの計算）",
        "動く壁・回転するブロック・壊れる足場など動的ギミックとの衝突応答",
        "スピード感とステージの傾き状況を把握しやすいカメラ追従制御"
      ],
      codeSnippet: `// 傾斜面における重力加速度と摩擦力の計算
Vector3 slopeNormal = surfaceCollider_->GetNormal();
Vector3 gravity = Vector3(0.0f, -9.8f, 0.0f);
Vector3 parallelGravity = gravity - slopeNormal * Dot(gravity, slopeNormal);
ballVelocity_ += (parallelGravity - ballVelocity_ * frictionFactor_) * deltaTime;`
    }
  },
  {
    id: "gezan",
    category: "game",
    featured: false,
    title: "下山",
    subTitle: "C++ / 3Dレールアクション / 2年次 チーム制作",
    repoUrl: "",
    downloadUrl: "Game/下山.zip",
    downloadSize: "約 132 MB",
    youtubeId: "lmy89EQdwKY",
    youtubeUrl: "https://youtu.be/lmy89EQdwKY",
    image: "https://i.ytimg.com/vi/lmy89EQdwKY/hqdefault.jpg",
    icon: "fa-solid fa-mountain",
    iconColor: "#16a34a",
    tags: ["2年次 チーム制作", "C++", "DirectX", "3Dレールアクション", "スキー風加減速"],
    shortDesc: "スキーのように「まっすぐ進むと加速、横に曲がると減速」する3Dレールアクション。スピード調整とコース取りで障害物やクマを避けて山を下るゲーム。",
    details: {
      summary: "2年次後期のチーム制作作品です。山道を一気に駆け下りる3Dレールアクションゲームです。特にこだわったのは『スキーのようにまっすぐ進むと一気に速くなり、横に曲がるとブレーキがかかって遅くなる』操作感です。最高スピードで突っ切るか、曲がって減速しながら安全に避けるかという駆け引きを楽しめるようにしました。スピードに合わせたカメラの演出や、坂道に沿って自然に傾くプレイヤーの動きも実装しています。",
      role: "プレイヤー移動・挙動プログラマー（スキー風の加減速処理、坂道への接地・姿勢制御、カメラ演出）",
      period: "2年次 後期 チーム制作",
      points: [
        "まっすぐ進むと加速、横に曲がると減速するスキーのような加減速の仕組みを実装",
        "曲がり具合に合わせて自然にスピードが落ちる計算を行い、コース取りの駆け引きを表現",
        "斜面の傾きに合わせてプレイヤーの体を自然に傾ける姿勢制御と接地判定",
        "スピードが上がるほど視界（画角）が広がって疾走感がアップするカメラ演出",
        "山道に配置された木や障害物、迫り来るクマとの当たり判定処理"
      ],
      codeSnippet: `// 速度に応じたカメラ視野角（FOV）のダイナミック制御
float targetFov = baseFov_ + (currentSpeed_ / maxSpeed_) * fovBoostAmount_;
camera_->SetFov(Lerp(camera_->GetFov(), targetFov, 0.1f));`
    }
  },
  {
    id: "uchu-kikan",
    category: "game",
    featured: false,
    title: "宇宙からの帰還",
    subTitle: "C++ / ワンボタン3Dアクション / 2年次 チーム制作",
    repoUrl: "",
    downloadUrl: "Game/宇宙からの帰還.zip",
    downloadSize: "約 121 MB",
    youtubeId: "arflBtpMQ3w",
    youtubeUrl: "https://youtu.be/arflBtpMQ3w",
    image: "https://i.ytimg.com/vi/arflBtpMQ3w/hqdefault.jpg",
    icon: "fa-solid fa-shuttle-space",
    iconColor: "#4f46e5",
    tags: ["2年次 チーム制作", "C++", "DirectX", "ワンボタンアクション", "タイムアタック"],
    shortDesc: "ボタンひとつのシンプル操作で宇宙空間を駆け抜ける3Dアクション。気流や障害物をタイミングよく突破し、最速ゴールタイムを目指すゲーム。",
    details: {
      summary: "2年次後期のチーム制作作品です。誰でも直感的に遊べる『ボタンひとつのシンプル操作』にこだわった3Dタイムアタックアクションゲームです。タイミングよくボタンを押してダッシュを行い、ステージ内の気流ギミックや障害物をかいくぐってゴールを目指します。手軽だからこそ何度も挑戦したくなるリトライ性と、最速タイムを競うやりこみ要素を追求しました。",
      role: "プレイヤー制御・ギミックプログラマー（ワンボタン操作レスポンス、気流ギミック、タイム記録機能、追従カメラ）",
      period: "2年次 後期 チーム制作",
      points: [
        "ボタンひとつ（スペース / Aボタン）で小気味よくダッシュできる直感的な操作感の実装",
        "プレイヤーを押し流す気流ギミックやダメージブロックなど、タイミングが求められる仕掛けの制作",
        "自己ベストタイムの記録・ランキング表示と、すぐに再挑戦できる快適なリトライ処理",
        "壁際や狭い通路でもプレイヤーを見失わない、遮蔽物を回避する追従カメラ制御"
      ],
      codeSnippet: `// スプリングアームカメラの遮蔽物回避（レイキャスト）
Vector3 desiredPos = target_->GetPosition() - forward_ * armLength_;
RaycastHit hit;
if (Physics::Raycast(target_->GetPosition(), -forward_, armLength_, &hit)) {
    camera_->SetPosition(hit.point + hit.normal * 0.2f); // めり込み防止
} else {
    camera_->SetPosition(desiredPos);
} `
    }
  },
  {
    id: "kachitto-taisha",
    category: "game",
    featured: false,
    title: "カチッと退社",
    subTitle: "C++ / 10日間の短期チーム制作 / 光切り替えパズルアクション",
    repoUrl: "",
    downloadUrl: "Game/カチッと退社.zip",
    downloadSize: "約 5.8 MB",
    youtubeId: "Wv0tr8IxW8I",
    youtubeUrl: "https://youtu.be/Wv0tr8IxW8I",
    image: "https://i.ytimg.com/vi/Wv0tr8IxW8I/hqdefault.jpg",
    icon: "fa-solid fa-lightbulb",
    iconColor: "#ea580c",
    tags: ["2年次 チーム制作", "C++", "短期集中開発 (10Days)", "光切り替えギミック", "パズルアクション", "全20ステージ"],
    shortDesc: "光の当たる方向を切り替えてオブジェクトの性質を変え、定時退社を目指すパズルアクション。10日間の短期開発で全20ステージを実装。",
    details: {
      summary: "2年次前期にわずか10日間で開発した短期集中チーム制作（10Days）作品です。スイッチをカチッと切り替えて『光の当たる方向』を変えることで、ツタが伸びて壁を登れるようになったりオブジェクトの効果が変わるパズルアクションゲームです。10日間という限られた期間の中で、光とギミックの連動システムをゼロから設計し、全20ステージを完成させました。",
      role: "リードプログラマー（光の照射・オブジェクト変化ギミック、全20ステージ進行、敵の視界判定）",
      period: "2年次 前期 短期チーム制作 (10Days)",
      points: [
        "【10日間のスピード開発】限られた期間内でタスクを素早く分解し、全20ステージの豊富なボリュームを完成",
        "【光によるギミック変化】ライトの向きに応じてツタが伸びたり障害物の効果が変わる、光とオブジェクトの連動システム",
        "【敵の視界とパズル性】見回る敵の視界を判定し、光を当てて足止めしたり影に隠れて進む仕掛けの実装",
        "【快適なアクション操作】ツタの登り降りやジャンプ、ミスしてもすぐやり直せるテンポの良い手触り作り"
      ],
      codeSnippet: `// ライトの照射方向切り替えとステージギミックの更新
void LightManager::SetLightDirection(Direction newDir) {
    currentLightDir_ = newDir;
    PlaySE("light.mp3");
    // 光の向きに合わせてツタの成長やオブジェクトの状態を更新
    for (auto& object : stageObjects_) {
        object->UpdateByLight(currentLightDir_);
    }
}`
    }
  },
  {
    id: "sekai-hanten",
    category: "game",
    featured: false,
    title: "世界反転",
    subTitle: "C++ / 2年次 個人制作 / 重力・空間反転アクション",
    repoUrl: "",
    downloadUrl: "Game/世界反転.zip",
    downloadSize: "約 28.5 MB",
    youtubeId: "rcfJW63mxmA",
    youtubeUrl: "https://youtu.be/rcfJW63mxmA",
    image: "https://i.ytimg.com/vi/rcfJW63mxmA/hqdefault.jpg",
    icon: "fa-solid fa-arrows-up-down",
    iconColor: "#9333ea",
    tags: ["2年次 個人制作", "C++", "DirectX", "重力反転アクション", "パズルアクション"],
    shortDesc: "ボタン一つで部屋の天地がぐるっと逆さまになる3Dアクション。天井が床へと変わる重力反転ギミックと、なめらかに回転するカメラを実装。",
    details: {
      summary: "画面の天地がひっくり返る『世界反転』がテーマの2年次個人制作アクションパズルです。重力が逆さまになると今まで天井だった場所が足場になり、歩けるルートがガラリと変化します。ひっくり返る瞬間にプレイヤーが酔ったり迷ったりしないよう、スムーズにくるっと回るカメラの動きにこだわりました。",
      role: "個人開発（企画、プログラム、重力反転処理、ステージ設計、UI）",
      period: "2年次 前期 個人制作",
      points: [
        "ワンボタンで重力の向きが上下反転し、天井へ向かって自然に落下・着地する移動処理の実装",
        "世界が反転したときに画面がなめらかに180度回転し、操作方向の混乱を防ぐカメラワーク",
        "重力が上下どちらに向いているかで動く向きが変わるリフトやスイッチの仕掛け",
        "個人制作として企画・ステージ設計からプログラミングまでをトータルでやり切った経験"
      ],
      codeSnippet: `// 重力反転時の重力ベクトル切り替えとカメラ回転補間
void World::InvertGravity() {
    gravityDirection_ *= -1.0f;
    isUpsideDown_ = !isUpsideDown_;
    cameraController_->StartFlipTransition(isUpsideDown_ ? 180.0f : 0.0f);
}`
    }
  },
  {
    id: "helloworld",
    category: "game",
    featured: false,
    title: "HelloWorld",
    subTitle: "C++ / 1年次 チーム制作 / デジタルVSアナログ ボスバトル",
    repoUrl: "",
    downloadUrl: "Game/HelloWorld.zip",
    downloadSize: "約 19.2 MB",
    youtubeId: "lDyEmL3mluk",
    youtubeUrl: "https://youtu.be/lDyEmL3mluk",
    image: "https://i.ytimg.com/vi/lDyEmL3mluk/hqdefault.jpg",
    icon: "fa-solid fa-code",
    iconColor: "#059669",
    tags: ["1年次 チーム制作", "C++", "デジタルVSアナログ", "筆箱ボス戦", "deleteコマンド"],
    shortDesc: "黒板（アナログ）の世界で巨大な「筆箱ボス」に挑む2Dアクション。プログラムならではの「deleteコマンド」で大ダメージを叩き込んで撃破。",
    details: {
      summary: "1年次後期のチーム制作作品です。黒板の世界を舞台に、コードを操るデジタルな主人公が巨大な『筆箱ボス』に立ち向かう「デジタル VS アナログ」をテーマにした2Dボスバトルアクションです。筆箱から繰り出される多彩な攻撃や弾幕を避けながら、プログラムならではの必殺アクション『deleteコマンド』で大ダメージを与えて撃破する爽快なバトルをプログラミングしました。",
      role: "バトル・システムプログラマー（筆箱ボスの行動AI・弾幕、deleteコマンド大ダメージ処理、当たり判定）",
      period: "1年次 後期 チーム制作",
      points: [
        "【deleteコマンドの実装】条件を満たして発動し、ボスへ特大ダメージを叩き込むプログラムならではの必殺アクション",
        "【筆箱ボスの行動AI】怒り状態や体力の減少に応じて攻撃パターン（弾幕や突進）が激化するボス行動ロジックの構築",
        "【ショット撃ち分けと手応え】複数の弾の切り替え、当たり判定、巨大なボスHPバーやヒット効果音の同期",
        "【チーム開発の第一歩】初めてのチーム制作でメンバーとアイデアを出し合い、仕様策定からバグ修正までを完走"
      ],
      codeSnippet: `// deleteコマンド実行：ボスへ特大ダメージを与える
void CommandManager::ExecuteDelete() {
    PlaySE("deleteMode.mp3");
    boss_->TakeMassiveDamage(deleteDamageAmount_); // 特大ダメージ
    TriggerEffect("allDelete.png");
}`
    }
  },
  {
    id: "okashina-hoshi",
    category: "game",
    featured: false,
    title: "おかしな星で強奪大作戦!! ～全ては欲望のままに～",
    subTitle: "C++ / 1年次 チーム制作 / 爽快強奪アクション",
    repoUrl: "",
    downloadUrl: "Game/おかしな星で強奪大作戦!!~全ては欲望のままに~.zip",
    downloadSize: "約 29.6 MB",
    youtubeId: "UALtEt4JrNU",
    youtubeUrl: "https://youtu.be/UALtEt4JrNU",
    image: "https://i.ytimg.com/vi/UALtEt4JrNU/hqdefault.jpg",
    icon: "fa-solid fa-cookie-bite",
    iconColor: "#f59e0b",
    tags: ["1年次 チーム制作", "C++", "コミカルアクション", "スイーツ強奪"],
    shortDesc: "お菓子だらけの惑星でスイーツを奪いまくるコミカルで爽快なアクション。テンポの良いジャンプ・攻撃や、アイテムをテンポよく集める心地よさを追求。",
    details: {
      summary: "ポップでカラフルなお菓子の惑星を舞台に、お宝スイーツを奪っていく1年次後期のチーム制作アクションゲームです。可愛い敵を攻撃でポーンと弾き飛ばしたり、散らばるお菓子アイテムをポンポン集めるリズミカルで気持ちいい手触りを重視して制作しました。",
      role: "プログラマー（プレイヤーの攻撃・ジャンプ、敵のパトロール挙動、アイテム回収判定）",
      period: "1年次 後期 チーム制作",
      points: [
        "お菓子アイテムを取った瞬間にピョンと跳ねる演出と、小気味よい効果音・スコア加算の連動",
        "ウロウロ見回りをしながら、プレイヤーを見つけると向かってくるコミカルな敵の動き",
        "ボタンを押したときに遅れなくキビキビ動く、快適なジャンプや攻撃の操作感"
      ],
      codeSnippet: `// アイテム取得とスコア加算の処理
if (CheckCollision(playerCollider_, sweetItem_->GetCollider())) {
    sweetItem_->OnCollected();
    scoreManager_->AddScore(sweetItem_->GetPoint());
    PlaySE("collect_sweet.wav");
}`
    }
  },
  {
    id: "uchu-no-hate",
    category: "game",
    featured: false,
    title: "宇宙の果てまで!",
    subTitle: "C++ / 1年次 チーム制作 / 宇宙ギミックアクション",
    repoUrl: "",
    downloadUrl: "Game/宇宙の果てまで!.zip",
    downloadSize: "約 11.7 MB",
    youtubeId: "QdHGXE4jaMw",
    youtubeUrl: "https://youtu.be/QdHGXE4jaMw",
    image: "https://i.ytimg.com/vi/QdHGXE4jaMw/hqdefault.jpg",
    icon: "fa-solid fa-rocket",
    iconColor: "#6366f1",
    tags: ["1年次 チーム制作", "C++", "宇宙アクション", "動く足場・トラップ"],
    shortDesc: "宇宙の果てを目指して危険な罠や動く足場を乗り越えていくアクションゲーム。動く足場にしっかり乗って運ばれる仕組みやステージ進行を実装。",
    details: {
      summary: "宇宙の果てを目指して危険な障害物をくぐり抜けていく、1年次後期のチーム制作アクションゲームです。ふわふわ動く足場にタイミングよく飛び乗ったり、迫り来る障害物を避けながら進む王道のアクションステージをプログラミングしました。",
      role: "プログラマー（動く足場の処理、障害物の当たり判定、ステージ進行・クリア演出）",
      period: "1年次 後期 チーム制作",
      points: [
        "左右や上下に動く足場に乗ったとき、プレイヤーが滑り落ちずにしっかり一緒に運ばれる処理",
        "ゴールに入ったときのクリアファンファーレや次のステージへの切り替え演出",
        "色々な種類の障害物や罠をコードを整理して作り分けたクラス設計"
      ],
      codeSnippet: `// 移動する足場とプレイヤーの追従連動
if (isGroundedOnMovingPlatform_) {
    playerPos_ += currentPlatform_->GetMoveDelta();
}`
    }
  },
  {
    id: "yuusha-chika",
    category: "game",
    featured: false,
    title: "最強？勇者の地下伝説",
    subTitle: "C++ / 1年次 短期チーム制作 (10Days) / ダンジョンアクション",
    repoUrl: "",
    downloadUrl: "Game/最強？勇者の地下伝説.zip",
    downloadSize: "約 6.5 MB",
    youtubeId: "wqKRQNIobTQ",
    youtubeUrl: "https://youtu.be/wqKRQNIobTQ",
    image: "https://i.ytimg.com/vi/wqKRQNIobTQ/hqdefault.jpg",
    icon: "fa-solid fa-dungeon",
    iconColor: "#b45309",
    tags: ["1年次 チーム制作", "C++", "短期集中開発 (10Days)", "ダンジョン探索アクション"],
    shortDesc: "10日間の短期チーム制作（10Days）で開発した地下ダンジョン探索アクション。剣で敵をザクザク斬り倒して吹き飛ばす爽快感を追求。",
    details: {
      summary: "1年次前期に初めて挑戦した、わずか10日間で1本のゲームを完成させる短期集中チーム制作（10Days）の作品です。剣を持った勇者を操作し、地下ダンジョンに潜む敵を倒しながら奥へと進むアクションの基本をスピード感を持って実装しました。",
      role: "プログラマー（剣の攻撃判定、敵を吹き飛ばすノックバック処理、ダンジョン進行）",
      period: "1年次 前期 短期チーム制作 (10Days)",
      points: [
        "10日間という短い期間でアイデアをまとめ、しっかり遊べる完成度までスピード開発",
        "剣を振ったときの当たり判定と、当たった敵が後ろに吹き飛ぶ（ノックバック）爽快な演出",
        "チームメンバーが作ったイラストやマップを素早くゲーム内に組み込み、バグを修正"
      ],
      codeSnippet: `// 剣攻撃判定とノックバック
void AttackHitBox::OnHit(Enemy& enemy) {
    enemy.TakeDamage(attackPower_);
    enemy.ApplyKnockback(attackDirection_ * knockbackForce_);
}`
    }
  },
  {
    id: "soramame",
    category: "game",
    featured: false,
    title: "ソラマメの日常 ～父の怒り編～",
    subTitle: "C++ / 1年次 個人制作 / 2Dジャンプアクション",
    repoUrl: "",
    downloadUrl: "Game/ソラマメの日常～父の怒り編～.zip",
    downloadSize: "約 2.0 MB",
    youtubeId: "oeu8M0S-SfQ",
    youtubeUrl: "https://youtu.be/oeu8M0S-SfQ",
    image: "https://i.ytimg.com/vi/oeu8M0S-SfQ/hqdefault.jpg",
    icon: "fa-solid fa-seedling",
    iconColor: "#65a30d",
    tags: ["1年次 個人制作", "C++", "2Dアクション", "ジャンプ挙動"],
    shortDesc: "ゲーム制作を始めて最初に作った記念すべき第1作。怒るお父さんから逃げるキャラクターを操作する、手作りの2Dジャンプアクション。",
    details: {
      summary: "プログラミングを学び始めて数ヶ月の1年次前期に制作した、初めての個人制作2Dアクションゲームです。C++でのゲーム作りの基礎となる『キャラクターを動かす』『重力で落下してジャンプする』『壁や床にぶつかって止まる』といった仕組みをゼロから勉強して形にしました。",
      role: "個人開発（企画、プログラミング、ドット絵アセットの組み込み）",
      period: "1年次 前期 個人制作",
      points: [
        "重力で引っ張られながら綺麗に弧を描いて跳ぶ、自然な放物線のジャンプ計算",
        "キャラクターが床やブロックを通り抜けずにしっかり上に乗れる当たり判定（衝突押し戻し）",
        "失敗してもすぐにやり直せるシンプルなゲームループの構築"
      ],
      codeSnippet: `// ジャンプと重力の初歩的物理計算
if (isGrounded_ && isJumpTriggered) {
    velocityY_ = jumpPower_;
    isGrounded_ = false;
}
velocityY_ += gravity_ * deltaTime;
posY_ += velocityY_ * deltaTime;`
    }
  }
];

