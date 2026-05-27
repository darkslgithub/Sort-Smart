// ── RENDERING & EVENT HANDLING ─────────────────────────────────────────────

const App = (() => {
  const root = document.getElementById('app');

  // ── HELPERS ──────────────────────────────────────────────────────────────

  function getBin(key) {
    return BINS.find(b => b.key === key);
  }

  function renderHeader() {
    return `
      <header class="site-header">
        <div class="logo">SortSmart</div>
        <div class="lang-pill">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          English
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </header>`;
  }

  function renderRefFab() {
    return `
      <a href="reference.html" class="ref-fab" target="_blank" rel="noopener">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/>
          <line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/>
        </svg>
        <span>Reference</span>
      </a>`;
  }

  // ── START SCREEN ─────────────────────────────────────────────────────────

  function renderBinsIllustration() {
    const order = [
      { color: '#8d6e63', icon: ICONS.paperPkg },
      { color: '#2e7d32', icon: ICONS.food },
      { color: '#1565c0', icon: ICONS.paper },
      { color: '#7b1fa2', icon: ICONS.plastic },
      { color: '#546e7a', icon: ICONS.metal }
    ];

    const bins = order.map(b => `
      <div class="illus-bin">
        <div class="illus-lid" style="background:${b.color}"></div>
        <div class="illus-body" style="background:${b.color}">${b.icon}</div>
      </div>`).join('');

    return `<div class="illus-oval">${bins}</div>`;
  }

  function renderStart() {
    return `
      <main class="screen start-screen">
        ${renderBinsIllustration()}
        <h1 class="start-title">Welcome to SortSmart!</h1>
        <p class="start-subtitle">An interactive way to learn recycling in Sweden</p>
        <button class="start-btn" id="startBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Start Learning
        </button>
      </main>`;
  }

  // ── GAME SCREEN ──────────────────────────────────────────────────────────

  function renderBinTile(bin, s) {
    let badge = '';
    if (s.answered) {
      if (bin.key === s.feedback.correctBin) {
        badge = `<span class="tile-badge badge-correct">✅</span>`;
      } else if (bin.key === s.feedback.selectedBin && !s.feedback.correct) {
        badge = `<span class="tile-badge badge-wrong">❌</span>`;
      }
    }
    const disabledClass = s.answered ? 'tile-disabled' : '';
    return `
      <button class="bin-tile ${disabledClass}" style="background:${bin.color}" data-bin="${bin.key}" ${s.answered ? 'disabled' : ''}>
        <span class="tile-icon">${bin.icon}</span>
        <span class="tile-label">${bin.label}</span>
        ${badge}
      </button>`;
  }

  function renderGame(s) {
    const q = s.currentQuestion;
    const total = s.totalQuestions;
    const qNum = s.questionIndex + 1;
    const progressPct = s.answered
      ? (qNum / total) * 100
      : ((qNum - 1) / total) * 100;

    let statusIcon = '';
    if (s.answered) {
      statusIcon = s.feedback.correct
        ? '<span class="status-icon icon-correct">✅</span>'
        : '<span class="status-icon icon-wrong">❌</span>';
    }

    const binsHtml = BINS.map(bin => renderBinTile(bin, s)).join('');

    return `
      <main class="screen game-screen">
        <nav class="game-nav">
          <button class="home-btn" id="homeBtn">Home</button>
          <div class="progress-wrap">
            <div class="q-label">Question ${qNum}/${total} ${statusIcon}</div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${progressPct}%"></div>
            </div>
          </div>
          <div class="score-display">Score: <strong>${s.score}</strong></div>
        </nav>

        <div class="question-card">
          <p class="question-text">Which bin does this item belong to?</p>
          <span class="item-emoji" role="img" aria-label="${q.item}">${q.emoji}</span>
          <div class="item-pill">${q.item}</div>
        </div>

        <div class="bins-grid">${binsHtml}</div>

        ${s.answered ? `
          <div class="feedback-bar ${s.feedback.correct ? 'fb-correct' : 'fb-wrong'}">
            ${s.feedback.correct ? '✅' : '❌'}
            ${s.feedback.hint}
          </div>
          <div class="game-footer">
            <button class="next-btn" id="nextBtn">Next →</button>
          </div>` : ''}
      </main>`;
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────────────────

  function renderResult(s) {
    const total = s.totalQuestions;
    const perfect = s.score === total;
    const pct = Math.round((s.score / total) * 100);

    let medal = '🥉', msg = 'Keep practising — you\'ll get there!';
    if (pct === 100) { medal = '🏆'; msg = 'Perfect score! You\'re a recycling hero! 🌟'; }
    else if (pct >= 80) { medal = '🥇'; msg = 'Great job! Almost perfect!'; }
    else if (pct >= 60) { medal = '🥈'; msg = 'Good effort! A bit more practice and you\'ll ace it.'; }

    const bars = Array.from({ length: total }, (_, i) => {
      const filled = i < s.score;
      return `<div class="score-pip ${filled ? 'pip-filled' : 'pip-empty'}"></div>`;
    }).join('');

    return `
      <main class="screen result-screen">
        <div class="result-card">
          <div class="result-medal">${medal}</div>
          <h2 class="result-title">Game Complete!</h2>
          <div class="result-score">${s.score}<span>/${total}</span></div>
          <div class="score-pips">${bars}</div>
          <p class="result-msg">${msg}</p>
        </div>
        <div class="result-actions">
          <button class="start-btn" id="playAgainBtn">♻️ Play Again</button>
          <button class="ghost-btn" id="homeResultBtn">🏠 Back to Start</button>
        </div>
      </main>`;
  }

  // ── EVENT BINDING ─────────────────────────────────────────────────────────

  function attachEvents(s) {
    const $ = id => document.getElementById(id);

    const startBtn = $('startBtn');
    if (startBtn) startBtn.addEventListener('click', () => { Game.startGame(); render(); });

    const homeBtn = $('homeBtn');
    if (homeBtn) homeBtn.addEventListener('click', () => { Game.goHome(); render(); });

    const nextBtn = $('nextBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => { Game.next(); render(); });

    const playAgainBtn = $('playAgainBtn');
    if (playAgainBtn) playAgainBtn.addEventListener('click', () => { Game.startGame(); render(); });

    const homeResultBtn = $('homeResultBtn');
    if (homeResultBtn) homeResultBtn.addEventListener('click', () => { Game.goHome(); render(); });

    if (s && s.screen === 'game' && !s.answered) {
      document.querySelectorAll('.bin-tile').forEach(tile => {
        tile.addEventListener('click', () => {
          Game.answer(tile.dataset.bin);
          render();
        });
      });
    }
  }

  // ── MAIN RENDER ───────────────────────────────────────────────────────────

  function render() {
    const s = Game.getState();
    let html = renderHeader();

    if (s.screen === 'start')        html += renderStart();
    else if (s.screen === 'game')    html += renderGame(s);
    else if (s.screen === 'result')  html += renderResult(s);

    html += renderRefFab();
    root.innerHTML = html;
    attachEvents(s);
  }

  return { render };
})();

App.render();
