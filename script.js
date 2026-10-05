/**
 * Taisei Sone - Game Programmer Portfolio Script
 * Handles:
 * 1. Background Particle & Constellation Canvas FX
 * 2. Works Category Filter
 * 3. Project Detail Modal Data & Control
 * 4. Navigation & Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initCategoryFilter();
  initProjectModals();
  initNavigation();
});

/* ==========================================================================
   1. Background Particle Canvas FX
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
  const particles = [];
  const mouse = { x: null, y: null, maxDist: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(59, 130, 246,';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          const force = (mouse.maxDist - dist) / mouse.maxDist;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between near particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.22;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Works Category Filter
   ========================================================================== */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Add CSS keyframe dynamically
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleTag);

/* ==========================================================================
   3. Project Detailed Information & Modal Control
   ========================================================================== */
const projectData = {
  'sone-engine': {
    title: 'SoneEngine (自作ゲームエンジン)',
    repoUrl: 'https://github.com/SoneTaisei/SoneEngine',
    tags: ['C++', 'DirectX', 'Dear ImGui', 'Original Engine'],
    summary: 'DirectXを活用したレンダリングパイプラインと、開発効率を高めるImGuiデバッグUIを統合したオリジナルのC++製ゲームエンジンです。',
    features: [
      'DirectX描画パイプラインの構築とシェーダー・定数バッファのバインド管理',
      '#ifdef USE_IMGUI によるデバッグ/デベロップモードの切り替えとGUIパラメータ調整機能の実装',
      'テクスチャ・3Dメッシュなどのアセット管理機構の設計',
      'ゲームオブジェクトの親子付けやシーン管理、トランスフォーム計算の自作'
    ],
    codeSnippet: `// ImGuiデバッグ制御の設計例
#ifdef USE_IMGUI
    ImGui::Begin("Engine Inspector");
    ImGui::DragFloat3("Light Direction", &lightDir.x, 0.05f);
    ImGui::ColorEdit3("Ambient Color", &ambientColor.x);
    ImGui::Text("FPS: %.1f", ImGui::GetIO().Framerate);
    ImGui::End();
#endif`
  },
  'pg3': {
    title: '3Dゲーム制作実習 (PG3)',
    repoUrl: 'https://github.com/SoneTaisei/PG3',
    tags: ['C++', '3D Action', 'Game Loop', 'Collision'],
    summary: '3Dアクションゲームの実装。プレイヤーの移動・ジャンプ・カメラ追従、敵との当たり判定、ステージ進行の制御をC++で一貫して構築しました。',
    features: [
      '三人称視点（TPS）カメラの注視点補間と衝突めり込み防止処理',
      '球・カプセル・OBBを用いたプレイヤーとマップ・敵との衝突判定',
      'エフェクトの発生タイミングやサウンド再生と連動した攻撃モーション制御',
      '状態遷移（待機・移動・攻撃・ダメージ）を明確に分離したステートマシン設計'
    ],
    codeSnippet: `// プレイヤーステートの更新
void Player::Update() {
    currentState_->Update(*this);
    UpdateTransform();
    UpdateCollider();
}`
  },
  'mt4': {
    title: 'HLSL シェーダー & 描画研究 (MT4)',
    repoUrl: 'https://github.com/SoneTaisei/MT4',
    tags: ['HLSL', 'DirectX', 'Lighting', 'PostProcess'],
    summary: 'DirectX環境におけるプログラマブルシェーダーの実験と研究。ライティングモデルやポストエフェクトの実装を通してGPUプログラミングを習得。',
    features: [
      'ランバート反射・フォン鏡面反射（Phong / Blinn-Phong）のピクセルシェーダー実装',
      '法線マップを用いた詳細な凹凸表現（Tangent空間での計算）',
      '画面全体のカラーグレーディングやブラー等のポストエフェクト基礎研究',
      'DirectX側との定数バッファ（CB）アライメント管理とデータ受け渡し'
    ],
    codeSnippet: `// Example Pixel Shader Lighting calculation
float3 N = normalize(input.normal);
float3 L = normalize(-lightDir);
float diffuse = max(dot(N, L), 0.0f);
return float4(albedo.rgb * diffuse, albedo.a);`
  },
  'al4': {
    title: 'ゲームアルゴリズム開発 (AL4)',
    repoUrl: 'https://github.com/SoneTaisei/AL4',
    tags: ['C++', 'Algorithms', 'AI Behavior', 'Optimization'],
    summary: 'ゲームロジックの堅牢性と保守性を高めるためのアルゴリズム研究。エネミー行動ルーチンやデータ構造の最適化に取り組みました。',
    features: [
      'ステートパターンおよびビヘイビアツリー的アプローチによる敵AIの行動分岐',
      '空間分割（グリッド分割）を用いた衝突判定チェック回数の削減・最適化',
      'ゲーム内イベント管理（Observerパターン）による疎結合なシステム設計',
      'シーン切り替え時のメモリリーク防止とスマートポインタ活用'
    ],
    codeSnippet: `// 状態管理インターフェース
class IEnemyState {
public:
    virtual ~IEnemyState() = default;
    virtual void Enter(Enemy& enemy) = 0;
    virtual void Execute(Enemy& enemy) = 0;
    virtual void Exit(Enemy& enemy) = 0;
};`
  },
  'math-3d': {
    title: '3D幾何・行列演算ライブラリ (00_01_ExtendedTo3D)',
    repoUrl: 'https://github.com/SoneTaisei/00_01_ExtendedTo3D',
    tags: ['C++', '3D Math', 'Linear Algebra', 'Quaternion'],
    summary: 'DirectXMath等のライブラリに頼らず、3D変換行列やベクトルの計算を自前で実装。3D空間の幾何学的な理解を深めたライブラリ制作です。',
    features: [
      'Vector3 / Vector4 の内積・外積・正規化・線形補間（Lerp）演算',
      'Matrix4x4 の平行移動・回転（オイラー角・任意軸）・スケーリングおよび逆行列計算',
      '透視投影（Perspective）行列およびビュー行列の算出アルゴリズム',
      'ジンバルロックを回避するためのクォータニオン（四元数）と球面線形補間（Slerp）'
    ],
    codeSnippet: `// 4x4 同次変換行列の合成
Matrix4x4 MakeAffineMatrix(const Vector3& scale, const Vector3& rot, const Vector3& trans) {
    Matrix4x4 S = MakeScaleMatrix(scale);
    Matrix4x4 R = MakeRotateXYZMatrix(rot);
    Matrix4x4 T = MakeTranslateMatrix(trans);
    return Multiply(Multiply(S, R), T);
}`
  },
  'td2': {
    title: 'アクションゲーム開発 (TD2)',
    repoUrl: 'https://github.com/SoneTaisei/TD2_L2_1',
    tags: ['C++', 'Game Mechanics', 'Level Design'],
    summary: '操作の心地よさとテンポの良いゲーム性を目指したアクションゲーム制作。ギミックの配置や演出の細部にこだわった作品です。',
    features: [
      '入力バッファリングと先行入力によるレスポンスの良いアクション操作感',
      'ステージギミック（動く足場、トラップ、スイッチ連動）の制御',
      'タイム計測、スコア管理、ゲームオーバー/クリア画面のフロー制御',
      'ヒットストップや画面揺れ（スクリーンシェイク）による攻撃ヒット時の爽快感演出'
    ],
    codeSnippet: `// ヒットストップ処理
if (isHit) {
    ScreenShake::Trigger(0.2f, 5.0f); // 揺れ時間と強度
    TimeManager::RequestHitStop(0.08f);
}`
  },
  'unity-project': {
    title: 'Unity プロジェクト制作 (TR1_2_Unity)',
    repoUrl: 'https://github.com/SoneTaisei/TR1_2_Unity',
    tags: ['Unity', 'C#', 'Component Pattern', 'Physics'],
    summary: 'Unity環境におけるコンポーネント指向でのゲームプロトタイピング。RigidbodyやPhysicsを活用したテンポの良いゲームプレイを実装。',
    features: [
      'Unityのライフサイクル（Awake, Start, Update, FixedUpdate）に適した責務分離',
      'ScriptableObjectを用いたゲームパラメータ（敵ステータスや武器データ）の管理',
      'パーティクルシステム（Shuriken）とアニメーターのブレンドツリー連携',
      'UIアニメーションとDOTweenを活用した直感的なユーザーインターフェース'
    ],
    codeSnippet: `// 武器パラメータをScriptableObjectから取得
public class PlayerAttack : MonoBehaviour {
    [SerializeField] private WeaponData weaponData;
    public void Fire() {
        Instantiate(weaponData.bulletPrefab, muzzle.position, muzzle.rotation);
    }
}`
  },
  'tl1-tool': {
    title: '開発自動化スクリプト & ツール (TL1)',
    repoUrl: 'https://github.com/SoneTaisei/TL1',
    tags: ['Batch', 'PowerShell', 'Automation', 'DevOps'],
    summary: 'チームや個人開発での作業効率を劇的に向上させるためのビルド自動化・アセット変換スクリプト群。環境整備への意識を形にしたツールです。',
    features: [
      'Visual Studioのビルドコマンド（MSBuild）を連携させたワンクリックビルドスクリプト',
      'テクスチャ画像や3Dモデルファイルの一括リネーム・配置自動化',
      '配布用パッケージング（不要な中間ファイルを除外したZIP自動生成）',
      'コミット前のクリーンアップや設定ファイルチェックによるトラブル防止'
    ],
    codeSnippet: `@echo off
echo Starting automated build pipeline...
msbuild SoneEngine.sln /p:Configuration=Release /p:Platform=x64
if %errorlevel% neq 0 (
    echo Build Failed!
    exit /b %errorlevel%
)
echo Build Succeeded.`
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.btn-detail');

  function openModal(id) {
    const data = projectData[id];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-tags">
          ${data.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
        </div>
        <h2 class="modal-title">${data.title}</h2>
        <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="modal-repo-link">
          <i class="fa-brands fa-github"></i> View on GitHub Repository
        </a>
      </div>
      <div class="modal-body">
        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-align-left"></i> 概要</h3>
          <p class="modal-text">${data.summary}</p>
        </div>
        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-gears"></i> 実装のポイント・こだわり</h3>
          <ul class="modal-list">
            ${data.features.map((f) => `<li>${f}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-code"></i> コード・設計ハイライト</h3>
          <pre class="modal-code-snippet"><code>${escapeHtml(data.codeSnippet)}</code></pre>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      openModal(targetId);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ==========================================================================
   4. Navigation & Scrollspy
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}
