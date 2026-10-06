/**
 * 曽根 大誠 (Taisei Sone) - ゲームプログラマー ポートフォリオスクリプト
 * 1. 作品一覧の自動描画 (projects-data.js より読み込み)
 * 2. カテゴリフィルター処理
 * 3. 作品詳細モーダルウィンドウ制御 (YouTube埋め込みプレーヤー連携)
 * 4. ナビゲーション制御
 */

document.addEventListener('DOMContentLoaded', () => {
  renderWorks();
  initCategoryFilter();
  initProjectModals();
  initWikiToc();
});

/* ==========================================================================
   1. 作品カードのレンダリング (projects-data.js から動的生成)
   ========================================================================== */
function getTagClass(tag) {
  if (tag.includes('3年次')) return 'card-tag-grade grade-3rd';
  if (tag.includes('2年次')) return 'card-tag-grade grade-2nd';
  if (tag.includes('1年次')) return 'card-tag-grade grade-1st';
  if (tag === '個人開発' || tag.includes('個人開発')) return 'card-tag-grade grade-dev';
  return '';
}

function getProjectGrade(item) {
  const gradeTag = item.tags.find((t) => t.includes('年次') || t.includes('個人開発'));
  if (!gradeTag) return 'dev';
  if (gradeTag.includes('3年次')) return '3rd';
  if (gradeTag.includes('2年次')) return '2nd';
  if (gradeTag.includes('1年次')) return '1st';
  return 'dev';
}

function renderWorks() {
  const container = document.getElementById('works-grid');
  if (!container || typeof PORTFOLIO_PROJECTS === 'undefined') return;

  container.innerHTML = PORTFOLIO_PROJECTS.map((item) => {
    // サムネイル表示
    let visualHtml = '';
    if (item.image) {
      visualHtml = `
        <div class="card-img-wrapper">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" class="card-img" loading="lazy">
          ${item.youtubeId ? `
            <div class="card-video-badge">
              <i class="fa-brands fa-youtube card-video-icon"></i>
              <span>動画あり</span>
            </div>
          ` : ''}
          ${!item.youtubeId && item.repoUrl ? `
            <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" class="card-git-badge" title="GitHubリポジトリを見る" onclick="event.stopPropagation()">
              <i class="fa-brands fa-github card-git-icon"></i>
              <span>GitHub</span>
            </a>
          ` : ''}
        </div>
      `;
    } else {
      visualHtml = `
        <i class="${item.icon} card-visual-icon" style="color: ${item.iconColor || 'var(--accent-primary-hover)'};"></i>
        <span class="card-visual-title">${escapeHtml(item.title.split(' ')[0])}</span>
        <span class="card-visual-sub">${escapeHtml(item.subTitle)}</span>
        ${item.repoUrl ? `
          <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" class="card-git-badge" title="GitHubリポジトリを見る" onclick="event.stopPropagation()">
            <i class="fa-brands fa-github card-git-icon"></i>
            <span>GitHub</span>
          </a>
        ` : ''}
      `;
    }

    return `
      <article class="work-card" data-category="${item.category}" data-grade="${getProjectGrade(item)}" data-id="${item.id}" role="button" tabindex="0" aria-label="${escapeHtml(item.title)}の詳細を見る">
        <div class="card-header-visual">
          ${item.featured ? '<span class="card-featured-badge">看板作品</span>' : ''}
          ${visualHtml}
        </div>
        <div class="card-body">
          <div class="card-tags">
            ${item.tags.map((t) => `<span class="card-tag ${getTagClass(t)}">${escapeHtml(t)}</span>`).join('')}
          </div>
          <h3 class="card-title">${escapeHtml(item.title)}</h3>
          <p class="card-desc">${escapeHtml(item.shortDesc)}</p>
          <div class="card-actions">
            <span class="card-action-indicator">
              <span>${item.youtubeId ? '動画・詳細' : '詳細・こだわり'}</span>
              <i class="fa-solid fa-arrow-right"></i>
            </span>
            <div class="card-links-group">
              ${item.youtubeUrl ? `
                <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="link-youtube-icon" title="YouTubeで動画を見る" onclick="event.stopPropagation()">
                  <i class="fa-brands fa-youtube"></i>
                </a>
              ` : ''}
              ${item.repoUrl ? `
                <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" class="link-repo-icon" title="GitHubリポジトリ" onclick="event.stopPropagation()">
                  <i class="fa-brands fa-github"></i>
                </a>
              ` : ''}
            </div>
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

    // YouTube動画プレイヤーの埋め込みHTML
    let videoHtml = '';
    if (data.youtubeId) {
      const isFileProtocol = window.location.protocol === 'file:';
      const fileNoticeHtml = isFileProtocol
        ? `
          <div class="modal-video-notice">
            <i class="fa-solid fa-circle-info"></i>
            <span>※ ローカル直接起動（<code>file://</code>）時はYouTubeのセキュリティ制限（リファラー制限）でエラー153が出る場合があります。GitHub Pagesへの公開後やWebサーバー環境では正常に再生されます。右側の「YouTubeで再生」から直接視聴も可能です。</span>
          </div>
        `
        : '';

      videoHtml = `
        <div class="modal-video-section">
          <div class="modal-video-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/${encodeURIComponent(data.youtubeId)}?rel=0" 
              title="${escapeHtml(data.title)}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="modal-video-caption">
            <span><i class="fa-solid fa-play"></i> プレイ動画・作品デモ</span>
            <a href="${data.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="video-direct-link">
              YouTubeで全画面再生 <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
          ${fileNoticeHtml}
        </div>
      `;
    }

    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-tags">
          ${data.tags.map((t) => `<span class="card-tag ${getTagClass(t)}">${escapeHtml(t)}</span>`).join('')}
        </div>
        <h2 class="modal-title">${escapeHtml(data.title)}</h2>
        <div class="modal-header-links">
          ${data.youtubeUrl ? `
            <a href="${data.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="modal-link-badge modal-youtube-badge">
              <i class="fa-brands fa-youtube"></i> YouTube動画
            </a>
          ` : ''}
          ${data.repoUrl ? `
            <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="modal-link-badge modal-github-badge">
              <i class="fa-brands fa-github"></i> GitHub
            </a>
          ` : ''}
        </div>
      </div>
      <div class="modal-body">
        ${videoHtml}

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
    // YouTube動画の音声を即座に停止するため中身をクリア
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        modalContent.innerHTML = '';
      }
    }, 200);
  }

  // イベント委譲（カード全体または詳細ボタンのクリックでモーダルを開く）
  document.addEventListener('click', (e) => {
    // 外部リンク（GitHub/YouTube等のaタグ）がクリックされた場合はモーダルを開かない
    if (e.target.closest('a')) {
      return;
    }

    // 作品カードまたは詳細ボタンがクリックされた場合
    const cardOrBtn = e.target.closest('.work-card, .hero-featured-card, .btn-open-detail');
    if (cardOrBtn) {
      const targetId = cardOrBtn.dataset.id || cardOrBtn.dataset.target;
      if (targetId) {
        openModal(targetId);
      }
    }
  });

  // キーボード操作（Enter / Space でフォーカス中のカードを開く）
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !modal.classList.contains('active')) {
      const focusedCard = document.activeElement?.closest('.work-card, .hero-featured-card');
      if (focusedCard && !document.activeElement.closest('a, button')) {
        e.preventDefault();
        const targetId = focusedCard.dataset.id || focusedCard.dataset.target;
        if (targetId) {
          openModal(targetId);
        }
      }
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
   4. Wikipedia風 右側固定目次 (表示/非表示トグル & スムーズスクロール & ハイライト)
   ========================================================================== */
function initWikiToc() {
  const toc = document.getElementById('wiki-toc');
  const toggleBtn = document.getElementById('wiki-toc-toggle');
  if (!toc || !toggleBtn) return;

  // 初期開閉状態の判定 (小画面では初期折りたたみ、それ以外は保存設定を復元)
  const isMobile = window.innerWidth <= 768;
  const savedState = localStorage.getItem('wiki_toc_collapsed');
  if (savedState === 'true' || (isMobile && savedState === null)) {
    toc.classList.add('is-collapsed');
    toggleBtn.textContent = '表示';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  // 表示 / 非表示 切替トグル
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isCollapsed = toc.classList.toggle('is-collapsed');
    toggleBtn.textContent = isCollapsed ? '表示' : '非表示';
    toggleBtn.setAttribute('aria-expanded', !isCollapsed);
    try {
      localStorage.setItem('wiki_toc_collapsed', isCollapsed ? 'true' : 'false');
    } catch (err) {
      // localStorageが制限されている環境への安全策
    }
  });

  // 目次リンクのクリックジャンプ処理
  const tocLinks = toc.querySelectorAll('.wiki-toc-link, .wiki-toc-sublink');
  tocLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (!targetHref || !targetHref.startsWith('#')) return;

      const targetEl = document.querySelector(targetHref);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });

        // URLハッシュを更新
        if (history.pushState) {
          history.pushState(null, '', targetHref);
        } else {
          window.location.hash = targetHref;
        }

        // 小画面の場合は遷移後に自動で折りたたむ
        if (window.innerWidth <= 768) {
          toc.classList.add('is-collapsed');
          toggleBtn.textContent = '表示';
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // スクロールスパイ（現在閲覧中のセクションを目次でハイライト）
  const watchedTargets = [
    { id: 'hero', el: document.getElementById('hero') },
    { id: 'about', el: document.getElementById('about') },
    { id: 'skills', el: document.getElementById('skills') },
    { id: 'skills-lang', el: document.getElementById('skills-lang') },
    { id: 'skills-graphics', el: document.getElementById('skills-graphics') },
    { id: 'skills-engine', el: document.getElementById('skills-engine') },
    { id: 'works', el: document.getElementById('works') }
  ].filter(item => item.el !== null);

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    let currentId = '';

    watchedTargets.forEach((item) => {
      const top = item.el.offsetTop - 120;
      const height = item.el.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = item.id;
      }
    });

    if (currentId) {
      tocLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }
  }, { passive: true });
}
