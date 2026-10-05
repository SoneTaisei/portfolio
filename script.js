/**
 * 曽根 大誠 (Taisei Sone) - ゲームプログラマー ポートフォリオスクリプト
 * 1. 作品一覧の自動描画 (projects-data.js より読み込み)
 * 2. カテゴリフィルター処理
 * 3. 作品詳細モーダルウィンドウ制御
 * 4. ナビゲーション制御
 */

document.addEventListener('DOMContentLoaded', () => {
  renderWorks();
  initCategoryFilter();
  initProjectModals();
  initNavigation();
});

/* ==========================================================================
   1. 作品カードのレンダリング (projects-data.js から動的生成)
   ========================================================================== */
function renderWorks() {
  const container = document.getElementById('works-grid');
  if (!container || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  container.innerHTML = PORTFOLIO_PROJECTS.map((item) => {
    // サムネイル表示
    let visualHtml = '';
    if (item.image) {
      visualHtml = `<img src="${item.image}" alt="${escapeHtml(item.title)}" class="card-img">`;
    } else {
      visualHtml = `
        <i class="${item.icon} card-visual-icon" style="color: ${item.iconColor || 'var(--accent-primary-hover)'};"></i>
        <span class="card-visual-title">${escapeHtml(item.title.split(' ')[0])}</span>
        <span class="card-visual-sub">${escapeHtml(item.subTitle)}</span>
      `;
    }

    return `
      <article class="work-card" data-category="${item.category}" data-id="${item.id}">
        <div class="card-header-visual">
          ${item.featured ? '<span class="card-featured-badge">看板作品</span>' : ''}
          ${visualHtml}
        </div>
        <div class="card-body">
          <div class="card-tags">
            ${item.tags.map((t) => `<span class="card-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-desc">${escapeHtml(item.shortDesc)}</p>
          <div class="card-actions">
            <button class="btn-open-detail" data-target="${item.id}">
              <span>詳細・こだわり</span>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" class="link-repo-icon" title="GitHubリポジトリ">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   2. カテゴリーフィルター
   ========================================================================== */
function initCategoryFilter() {
  const tabs = document.querySelectorAll('.filter-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      const cards = document.querySelectorAll('.work-card');

      cards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.25s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// アニメーション用スタイル
const animStyle = document.createElement('style');
animStyle.innerHTML = `
@keyframes fadeInCard {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(animStyle);

/* ==========================================================================
   3. 作品詳細モーダルウィンドウ
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
          ${data.tags.map((t) => `<span class="card-tag">${escapeHtml(t)}</span>`).join('')}
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
          <h3 class="modal-section-title"><i class="fa-solid fa-wrench"></i> 実装のポイント・技術的こだわり</h3>
          <ul class="modal-list">
            ${data.details.points.map((pt) => `<li>${escapeHtml(pt)}</li>`).join('')}
          </ul>
        </div>

        ${
          data.details.codeSnippet
            ? `
        <div>
          <h3 class="modal-section-title"><i class="fa-solid fa-code"></i> コード・設計ハイライト</h3>
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

  // イベント委譲（ヒーローカード内のボタンにも対応）
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-open-detail');
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
   4. ナビゲーション & スクロール制御
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
      const sectionTop = current.offsetTop - 100;
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
