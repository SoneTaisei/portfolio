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
    subTitle: "C++ / 独自物理挙動 / リプレイエディター",
    repoUrl: "https://github.com/SoneTaisei/SoneEngine",
    youtubeId: "",
    youtubeUrl: "",
    image: "assets/images/sone-engine-github.png",
    icon: "fa-solid fa-cubes",
    iconColor: "#ea580c",
    tags: ["C++", "DirectX", "独自物理挙動", "リプレイエディター", "Dear ImGui"],
    shortDesc: "独自実装の物理挙動シミュレーションと、1フレーム単位で挙動を巻き戻し・検証できるデバッグ用リプレイエディターを統合したC++製ゲームエンジン。",
    details: {
      summary: "描画パイプラインの構築にとどまらず、ゲーム開発における『手触りの良さ』と『デバッグ効率の極大化』を徹底的に追求したオリジナルゲームエンジンです。特に、剛体・衝突判定の物理挙動の自前実装と、不具合の瞬間を1フレーム単位で巻き戻して内部パラメータを検証できるデバッグ用リプレイエディターを最大の強みとしています。",
      role: "個人開発（エンジンアーキテクチャ、物理演算パイプライン、リプレイシステム、ImGuiデバッグUI）",
      period: "開発中 / 継続アップデート",
      points: [
        "【デバッグ用リプレイエディター】入力とゲーム状態のスナップショット管理により、1フレーム単位のコマ送り・巻き戻し（Rewind）を実現。再現性の低いバグも確実に原因特定が可能",
        "【独自の物理挙動シミュレーション】OBB/カプセル/球による交差判定、めり込み補正、反発・摩擦の力学計算を自前で実装し、破綻のない滑らかな挙動を担保",
        "【ImGui連携デバッグ環境】#ifdef USE_IMGUI により、リプレイ巻き戻し中にもタイムラインシーク、コライダー枠・速度ベクトルの可視化、パラメータのリアルタイム調整が可能",
        "【DirectX描画パイプライン】頂点/ピクセルシェーダー、定数バッファのアライメント管理、テクスチャや3Dメッシュのアセット管理アーキテクチャの自作"
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
    subTitle: "C++ / 3Dダークアクション / 3年チーム制作 (TD3)",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "eScajmbx_0U",
    youtubeUrl: "https://youtu.be/eScajmbx_0U",
    image: "https://i.ytimg.com/vi/eScajmbx_0U/hqdefault.jpg",
    icon: "fa-solid fa-skull",
    iconColor: "#dc2626",
    tags: ["C++", "DirectX", "3Dアクション", "チーム制作 (TD3)", "ボスバトル"],
    shortDesc: "ダークで独特な世界観のなか繰り広げられる3Dアクションゲーム。プレイヤーのアクション制御、ボス戦の攻撃判定・挙動ロジックを実装。",
    details: {
      summary: "3年次のチーム制作（TD3）作品です。世界観の表現とプレイヤーの手触り感にこだわり、緊迫感のあるボスバトルとダイナミックなアクション演出を構築しました。",
      role: "メインプログラマー（プレイヤーアクション、エネミー・ボスAI、当たり判定、演出連携）",
      period: "3年チーム制作",
      points: [
        "プレイヤーの近接攻撃コンボ・回避行動のステートマシン構築と先行入力バッファリング",
        "ボスのフェーズ移行に伴う行動パターン分岐（近接・遠距離弾幕・広範囲衝撃波）のAI実装",
        "当たり判定（カプセル・OBB）の精密制御およびカメラ振動・ヒットストップによる手応え演出",
        "チーム制作におけるGitブランチ運用とコードレビューのリード"
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
    subTitle: "C++ / 3D物理パズル / 2年チーム制作 (TD2)",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "UwGkuZmjAUI",
    youtubeUrl: "https://youtu.be/UwGkuZmjAUI",
    image: "https://i.ytimg.com/vi/UwGkuZmjAUI/hqdefault.jpg",
    icon: "fa-solid fa-bowling-ball",
    iconColor: "#0284c7",
    tags: ["C++", "DirectX", "3D球体物理", "チーム制作 (TD2)", "パズルアクション"],
    shortDesc: "ステージを直感的に傾けてビー玉をゴールへ運ぶ3D物理パズルゲーム。球の回転・慣性・反発シミュレーションを自前で実装。",
    details: {
      summary: "ステージ全体の傾き入力に応じて転がるビー玉のダイナミックな動きを楽しむ物理アクションゲームです。斜面での滑り落ちやジャンプ台、トラップとの相互作用を数学的・物理的に計算して実装しました。",
      role: "物理演算・プレイヤー挙動プログラマー（球体物理、ステージ傾き制御、トラップ判定）",
      period: "2年後期（TD2）",
      points: [
        "ステージの傾きベクトルに応じた重力加速度の分解と、ビー玉への摩擦・トルク回転の反映",
        "球体とメッシュ・傾斜面との連続衝突判定（めり込み押し戻しと法線反発ベクトルの計算）",
        "加速床・ジャンプ台・動く障害物などインタラクティブなギミックのプログラミング",
        "直感的で遊びやすいカメラ追従システムの導入"
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
    subTitle: "C++ / 3D高速下山アクション / 2年チーム制作 (TD2)",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "lmy89EQdwKY",
    youtubeUrl: "https://youtu.be/lmy89EQdwKY",
    image: "https://i.ytimg.com/vi/lmy89EQdwKY/hqdefault.jpg",
    icon: "fa-solid fa-mountain",
    iconColor: "#16a34a",
    tags: ["C++", "3Dアクション", "チーム制作 (TD2)", "傾斜移動", "スピード感"],
    shortDesc: "険しい山道をハイスピードで駆け下りる3Dアクションゲーム。急勾配の慣性制御や障害物回避、爽快なスピード感を追求。",
    details: {
      summary: "急斜面の山を一気に駆け下りるスピード感と、障害物をギリギリで避けるスリルを融合させた3Dアクションゲームです。斜度に応じた自然な加減速と接地制御にこだわりました。",
      role: "キャラクター制御・移動物理プログラマー（急勾配の移動計算、接地判定、障害物処理）",
      period: "2年後期（TD2）",
      points: [
        "地形の勾配に応じた下り加速とブレーキ入力時の慣性スライド挙動の実装",
        "レイキャストによる接地判定と地形ポリゴン法線に沿ったプレイヤー姿勢のクォータニオン回転補正",
        "倒木や落石などの動的トラップのスポーンおよび当たり判定処理",
        "スピードに応じたFOV（画角）変化とエフェクトによるスピード感の演出"
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
    subTitle: "C++ / 3Dサバイバルアクション / 2年チーム制作 (TD2)",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "arflBtpMQ3w",
    youtubeUrl: "https://youtu.be/arflBtpMQ3w",
    image: "https://i.ytimg.com/vi/arflBtpMQ3w/hqdefault.jpg",
    icon: "fa-solid fa-shuttle-space",
    iconColor: "#4f46e5",
    tags: ["C++", "3Dアクション", "チーム制作 (TD2)", "宇宙脱出", "DirectX"],
    shortDesc: "未知の宇宙空間に取り残された主人公が地球への帰還を目指す3Dサバイバルアクション。3D空間での移動・カメラワーク・脱出ギミックを実装。",
    details: {
      summary: "過酷な宇宙空間の基地を探索し、脱出ポッドを目指す3Dサバイバルアクションゲームです。限られたリソースと危険なギミックを突破する緊張感をプログラミングで演出しました。",
      role: "3Dプログラマー（プレイヤーアクション、TPSカメラ制御、ステージギミック）",
      period: "2年後期（TD2）",
      points: [
        "壁や遮蔽物に潜り込まないスプリングアーム方式のTPS追従カメラの実装",
        "無重力・低重力エリアにおける浮遊感とジャンプ・ブースト挙動の物理プログラミング",
        "隔壁扉の開閉、エネルギーチャージスイッチなどのインタラクティブギミック",
        "3D音響と連動したアラート演出およびUIステータス管理"
      ],
      codeSnippet: `// スプリングアームカメラの遮蔽物回避（レイキャスト）
Vector3 desiredPos = target_->GetPosition() - forward_ * armLength_;
RaycastHit hit;
if (Physics::Raycast(target_->GetPosition(), -forward_, armLength_, &hit)) {
    camera_->SetPosition(hit.point + hit.normal * 0.2f); // めり込み防止
} else {
    camera_->SetPosition(desiredPos);
}`
    }
  },
  {
    id: "kachitto-taisha",
    category: "game",
    featured: false,
    title: "カチッと退社",
    subTitle: "C++ / 短期チーム開発 (10Days) / オフィス脱出アクション",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "Wv0tr8IxW8I",
    youtubeUrl: "https://youtu.be/Wv0tr8IxW8I",
    image: "https://i.ytimg.com/vi/Wv0tr8IxW8I/hqdefault.jpg",
    icon: "fa-solid fa-briefcase",
    iconColor: "#ea580c",
    tags: ["C++", "チーム制作", "10Days", "コミカルアクション", "ステルス脱出"],
    shortDesc: "迫りくる残業と上司をかいくぐり定時退社を勝ち取るオフィス脱出アクション。短期間のチーム開発で完成度の高いゲームプレイを実現。",
    details: {
      summary: "わずか10日間で仕様策定・実装・調整までを行う短期集中開発（10Days）で制作したコミカルアクションゲームです。「定時にオフィスから脱出する」という明確なコンセプトのもと、テンポの良いゲームデザインを構築しました。",
      role: "リードプログラマー（ゲームループ構築、エネミー巡回AI、ギミック制御）",
      period: "2年前期（10Days）",
      points: [
        "上司や同僚（敵）の視界コーン判定とウェイポイント巡回・追尾AIの実装",
        "タイムカードの打刻、デスク下の隠れギミック、トラップ回避のシステム設計",
        "10日間という極めてタイトなスケジュールでのタスク分解と進捗マネジメント",
        "プレイヤーが操作した瞬間のレスポンスの良さと軽快なアニメーション同期"
      ],
      codeSnippet: `// 上司キャラクターの視界判定（視野角と距離）
Vector3 toPlayer = playerPos - bossPos;
float dist = Length(toPlayer);
if (dist < viewDistance_) {
    float dotVal = Dot(bossForward_, Normalize(toPlayer));
    if (dotVal > cos(viewAngle_ * 0.5f)) {
        TriggerOvertimeAlert(); // プレイヤー発見・残業アラート
    }
}`
    }
  },
  {
    id: "sekai-hanten",
    category: "game",
    featured: false,
    title: "世界反転",
    subTitle: "C++ / 2年生個人制作 (AL3) / 重力・空間反転アクション",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "rcfJW63mxmA",
    youtubeUrl: "https://youtu.be/rcfJW63mxmA",
    image: "https://i.ytimg.com/vi/rcfJW63mxmA/hqdefault.jpg",
    icon: "fa-solid fa-arrows-up-down",
    iconColor: "#9333ea",
    tags: ["C++", "個人制作", "AL3", "重力反転", "空間幾何学", "DirectX"],
    shortDesc: "天地が逆転するギミックを駆使してステージを踏破するパズルアクションゲーム。空間変換行列の反転処理と接地・落下物理を独自実装。",
    details: {
      summary: "画面の天地がひっくり返る「世界反転」をメインメカニクスに据えた個人制作（AL3）作品です。重力ベクトルの動的変更と、それに伴うコライダー・接地判定・カメラの座標変換を数学的アプローチで実装しました。",
      role: "個人開発（企画、プログラム、物理演算、ステージ設計、UI）",
      period: "2年前期（AL3）",
      points: [
        "重力方向の反転に伴うプレイヤーの上下移動・加速度計算と着地判定の再計算",
        "カメラの滑らかな180度回転遷移（イージング補間）と視界の違和感解消",
        "上下反転ギミックと連動するスイッチ、リフト、トラップのステート連動",
        "数学的理解（アフィン変換行列）に基づいた空間座標の変換処理"
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
    subTitle: "C++ / チーム制作 (TD1) / パズルアクション",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "lDyEmL3mluk",
    youtubeUrl: "https://youtu.be/lDyEmL3mluk",
    image: "https://i.ytimg.com/vi/lDyEmL3mluk/hqdefault.jpg",
    icon: "fa-solid fa-terminal",
    iconColor: "#059669",
    tags: ["C++", "チーム制作", "TD1", "プログラミングテーマ", "ステージギミック"],
    shortDesc: "デジタルコードの世界を舞台にしたアクションパズル作品。ステージギミックの突破とスムーズな操作性を目指したチーム制作。",
    details: {
      summary: "プログラミングの世界観をモチーフにしたユニークなステージを攻略するチーム制作（TD1）アクションゲームです。ステージ進行ロジックとギミック同期をプログラミングしました。",
      role: "ゲームロジックプログラマー（ステージギミック、当たり判定、進行管理）",
      period: "1年後期（TD1）",
      points: [
        "ブロックの生成・消滅ギミックとプレイヤーの乗降判定",
        "クリア・リトライ時のスムーズなシーン遷移とゲーム状態のリセット処理",
        "チーム内での仕様共有とC++コードのモジュール化"
      ],
      codeSnippet: `// ステージギミックのブロック更新
void PuzzleBlock::Update() {
    if (isActive_) {
        collider_->SetEnabled(true);
        RenderBlock();
    }
}`
    }
  },
  {
    id: "okashina-hoshi",
    category: "game",
    featured: false,
    title: "おかしな星で強奪大作戦!! ～全ては欲望のままに～",
    subTitle: "C++ / チーム制作 (TD1) / 爽快強奪アクション",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "UALtEt4JrNU",
    youtubeUrl: "https://youtu.be/UALtEt4JrNU",
    image: "https://i.ytimg.com/vi/UALtEt4JrNU/hqdefault.jpg",
    icon: "fa-solid fa-cookie-bite",
    iconColor: "#f59e0b",
    tags: ["C++", "チーム制作", "TD1", "アクション", "エネミー挙動"],
    shortDesc: "お菓子の惑星を舞台に繰り広げられるコミカルで爽快な強奪アクション。敵キャラクターの配置やアクションの手応えを追求。",
    details: {
      summary: "ポップでお菓子だらけの不思議な惑星でお宝を強奪していく賑やかなアクションゲームです。敵キャラクターの索敵行動やプレイヤーの攻撃判定・エフェクト同期を担当しました。",
      role: "プログラマー（プレイヤー攻撃、エネミー挙動、スコア・アイテム取得判定）",
      period: "1年後期（TD1）",
      points: [
        "スイーツアイテムの取得アニメーションとスコア加算・UIフィードバック",
        "コミカルな敵キャラクターの巡回および追跡行動のステートマシン",
        "操作入力の遅延を感じさせない快適な移動・ジャンプ挙動のチューニング"
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
    subTitle: "C++ / チーム制作 (TD1) / 宇宙ギミックアクション",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "QdHGXE4jaMw",
    youtubeUrl: "https://youtu.be/QdHGXE4jaMw",
    image: "https://i.ytimg.com/vi/QdHGXE4jaMw/hqdefault.jpg",
    icon: "fa-solid fa-rocket",
    iconColor: "#6366f1",
    tags: ["C++", "チーム制作", "TD1", "宇宙アクション", "トラップギミック"],
    shortDesc: "宇宙空間の果てを目指して様々なギミックを突破していくアクションゲーム。トラップの衝突判定とステージ進行システムを実装。",
    details: {
      summary: "宇宙の果てを目指して旅する冒険アクションゲームです。ステージ上に配置された多彩な宇宙トラップや浮遊床とのインタラクションを構築しました。",
      role: "プログラマー（ギミック判定、ステージ管理、演出制御）",
      period: "1年後期（TD1）",
      points: [
        "移動する足場や障害物との精密な当たり判定とプレイヤーの慣性連動",
        "ゴール到達時のクリア演出とリザルト画面への遷移フロー制御",
        "オブジェクト指向に基づいたトラップクラス群のポリモーフィズム設計"
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
    subTitle: "C++ / 短期チーム開発 (10Days) / ダンジョンアクション",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "6FFvJGtwfxg",
    youtubeUrl: "https://youtu.be/6FFvJGtwfxg",
    image: "https://i.ytimg.com/vi/6FFvJGtwfxg/hqdefault.jpg",
    icon: "fa-solid fa-dungeon",
    iconColor: "#b45309",
    tags: ["C++", "チーム制作", "10Days", "ダンジョン探索", "アクション"],
    shortDesc: "1年生の短期集中チーム制作（10Days）で開発した地下ダンジョン探索アクション。限られた期間で完成度の高いゲームループを構築。",
    details: {
      summary: "1年生時に初めて挑んだ10日間の短期チーム制作作品です。地下ダンジョンを舞台に、勇者が敵を倒しながら深層を目指す王道のアクション要素を迅速に実装しました。",
      role: "プログラマー（プレイヤー攻撃、当たり判定、ダンジョン遷移）",
      period: "1年前期（10Days）",
      points: [
        "10日間という短期間での迅速なプロトタイピングとゲームループ完成",
        "剣攻撃の当たり判定と敵のノックバック処理による爽快感の創出",
        "チームメンバーとの連携によるアセット組み込みとバグ修正"
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
    subTitle: "C++ / 1年生個人制作 (AL1) / 2Dジャンプアクション",
    repoUrl: "https://github.com/SoneTaisei",
    youtubeId: "oeu8M0S-SfQ",
    youtubeUrl: "https://youtu.be/oeu8M0S-SfQ",
    image: "https://i.ytimg.com/vi/oeu8M0S-SfQ/hqdefault.jpg",
    icon: "fa-solid fa-seedling",
    iconColor: "#65a30d",
    tags: ["C++", "個人制作", "AL1", "2Dアクション", "ジャンプ挙動"],
    shortDesc: "1年生前期の個人制作（AL1）作品。愛嬌のあるキャラクターを操作して父親の怒りから逃げるジャンプアクションゲーム。",
    details: {
      summary: "ゲームプログラミングを学び始めて最初期に制作した2Dアクションゲームです。C++によるゲームループの基礎、当たり判定、重力とジャンプの物理計算をゼロから理解して実装しました。",
      role: "個人開発（企画、プログラム、全アセット組み込み）",
      period: "1年前期（AL1）",
      points: [
        "重力加速度と初速度によるパラボラ軌道のジャンプ挙動の実装",
        "矩形（AABB）同士の交差判定と障害物との衝突押し戻し処理",
        "ゲームオーバーからリスタートへのスムーズなステート遷移"
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

