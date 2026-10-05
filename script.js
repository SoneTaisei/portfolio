/**
 * 曽根 大成 (Taisei Sone) - ゲームプログラマー ポートフォリオスクリプト
 * 1. 背景のパーティクル＆幾何学ライン演出 (Canvas API)
 * 2. 作品一覧の自動描画 (projects-data.js より読み込み)
 * 3. 作品カテゴリーフィルター
 * 4. 作品詳細モーダルウィンドウ制御
 * 5. スクロールスパイ＆ナビゲーション制御
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  renderWorks();
  initCategoryFilter();
  initProjectModals();
  initNavigation();
});

/* ==========================================================================
   1. 背景パーティクル演出 (Canvas)
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

      // マウスとのインタラクション（近寄ると反発）
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

    // 近接パーティクル同士をラインで結ぶ
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
   2. 作品カードのレンダリング (projects-data.js から生成)
   ========================================================================== */
function renderWorks() {
  const container = document.getElementById('works-grid');
  if (!container || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  container.innerHTML = PORTFOLIO_PROJECTS.map((item) => {
    // サムネイル表示（画像があれば画像、なければスタイリッシュなモックキャンバス）
    let thumbHtml = '';
    if (item.image) {
      thumbHtml = `<img src="${item.image}" alt="${escapeHtml(item.title)}" class="card-img">`;
    } else {
      thumbHtml = `
        <div class="mock-canvas">
          <i class="${item.icon}" style="color: ${item.iconColor || '#00f0ff'};"></i>
          <span>${escapeHtml(item.title.split(' ')[0])}</span>
          <span class="sub-tech">${escapeHtml(item.subTitle)}</span>
        </div>
      `;
    }

    return `
      <article class="work-card" data-category="${item.category}" data-id="${item.id}">
        <div class="card-thumb">
          ${item.featured ? '<div class="thumb-badge">注目の実績</div>' : ''}
          ${thumbHtml}
        </div>
        <div class="card-content">
          <div class="card-tags">
            ${item.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-desc">${escapeHtml(item.shortDesc)}</p>
          <div class="card-footer">
            <button class="btn-detail" data-target="${item.id}">
              <span>詳細・こだわり</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHubリポジトリ">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   3. カテゴリーフィルター
   ========================================================================== */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.work-card');

      cards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// アニメーション用キーフレーム
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);

/* ==========================================================================
   4. 詳細モーダルウィンドウ
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');

  function openModal(id) {
    if (typeof PORTFOLIO_PROJECTS === 'undefined') return;
    const data = PORTFOLIO_PROJECTS.find((p) => p.id === id);
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-tags">
          ${data.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <h2 class="modal-title">${escapeHtml(data.title)}</h2>
        <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="modal-repo-link">
          <i class="fa-brands fa-github"></i> GitHubリポジトリを見る
        </a>
      </div>
      <div class="modal-body">
        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-align-left"></i> 作品概要</h3>
          <p class="modal-text">${escapeHtml(data.details.summary)}</p>
        </div>

        <div class="modal-meta-grid">
          <div class="meta-item">
            <span class="meta-label">担当箇所</span>
            <span class="meta-value">${escapeHtml(data.details.role)}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">制作期間</span>
            <span class="meta-value">${escapeHtml(data.details.period)}</span>
          </div>
        </div>

        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-gears"></i> 実装のポイント・技術的こだわり</h3>
          <ul class="modal-list">
            ${data.details.points.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
          </ul>
        </div>

        ${
          data.details.codeSnippet
            ? `
        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-code"></i> コード・設計の工夫</h3>
          <pre class="modal-code-snippet"><code>${escapeHtml(data.details.codeSnippet)}</code></pre>
        </div>
        `
            : ''
        }
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // イベント委譲で詳細ボタンを捕捉
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-detail');
    if (btn) {
      const targetId = btn.dataset.target;
      openModal(targetId);
    }
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
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ==========================================================================
   5. ナビゲーション & スクロールスパイ
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
