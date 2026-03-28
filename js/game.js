/* ===================================================
   game.js  —  Mini Game: Tebak Karakter
   =================================================== */

const GAME_DURATION = 30;

function startGame() {
  document.getElementById('gameMenu').style.display = 'none';
  document.getElementById('gameOver').style.display = 'none';
  document.getElementById('gamePlay').style.display = 'block';

  S._gameScore   = 0;
  S._gameCorrect = 0;
  S._gameWrong   = 0;
  S._gameTimeLeft= GAME_DURATION;
  S._gameActive  = true;

  document.getElementById('gameScore').textContent   = '0';
  document.getElementById('gameCorrect').textContent = '0';
  document.getElementById('timeLeft').textContent    = GAME_DURATION;
  document.getElementById('timeBar').style.width     = '100%';

  nextGameQuestion();

  if (S._gameTimer) clearInterval(S._gameTimer);
  S._gameTimer = setInterval(tickGame, 1000);
}

function tickGame() {
  S._gameTimeLeft--;
  const pct = (S._gameTimeLeft / GAME_DURATION) * 100;
  const timeBarEl = document.getElementById('timeBar');
  const timeLeftEl= document.getElementById('timeLeft');
  if (timeBarEl) timeBarEl.style.width = pct + '%';
  if (timeLeftEl) timeLeftEl.textContent = S._gameTimeLeft;

  // Color warning
  if (timeBarEl) {
    if (S._gameTimeLeft <= 10) timeBarEl.style.background = 'var(--red)';
    else if (S._gameTimeLeft <= 20) timeBarEl.style.background = 'linear-gradient(90deg, var(--gold), var(--red))';
  }

  if (S._gameTimeLeft <= 0) endGame();
}

function nextGameQuestion() {
  if (!S._gameActive) return;
  const word = ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
  S._gameWord = word;

  const charEl = document.getElementById('gameChar');
  if (charEl) {
    charEl.style.opacity = '0';
    charEl.style.transform = 'scale(0.8)';
    setTimeout(() => {
      charEl.textContent = word.char;
      charEl.style.opacity = '1';
      charEl.style.transform = 'scale(1)';
      charEl.style.transition = 'all 0.15s';
    }, 60);
  }

  // 3 wrong + 1 correct
  const wrongPool = ALL_WORDS.filter(w => w.char !== word.char);
  const wrong = shuffle(wrongPool).slice(0, 3);
  const opts  = shuffle([word, ...wrong]);

  const choicesEl = document.getElementById('gameChoices');
  if (choicesEl) {
    choicesEl.innerHTML = opts.map(o => `
      <button class="game-choice"
        onclick="checkGameAnswer(this, '${esc(o.meaning)}', '${esc(word.meaning)}')">
        ${esc(o.meaning)}
      </button>
    `).join('');
  }
}

function checkGameAnswer(btn, selected, correct) {
  if (!S._gameActive) return;

  // Disable all
  document.querySelectorAll('.game-choice').forEach(b => b.disabled = true);

  if (selected === correct) {
    btn.classList.add('right');
    // Score = base 5 + time bonus
    const bonus = Math.max(5, Math.floor(S._gameTimeLeft * 3));
    S._gameScore  += bonus;
    S._gameCorrect++;
    playSFX('correct');
    if (S.autoSpeak && S._gameWord) speak(S._gameWord.char);

    document.getElementById('gameScore').textContent   = S._gameScore;
    document.getElementById('gameCorrect').textContent = S._gameCorrect;
  } else {
    btn.classList.add('wrong');
    S._gameWrong++;
    playSFX('wrong');
    // Highlight correct
    document.querySelectorAll('.game-choice').forEach(b => {
      if (b.textContent.trim() === correct) b.classList.add('right');
    });
  }

  setTimeout(nextGameQuestion, 800);
}

function endGame() {
  clearInterval(S._gameTimer);
  S._gameActive = false;

  document.getElementById('gamePlay').style.display = 'none';
  document.getElementById('gameOver').style.display = 'block';

  // High score
  if (S._gameScore > S.highScore) {
    S.highScore = S._gameScore;
    document.getElementById('hsScore').textContent = S.highScore;
  }
  if (S._gameCorrect > S.highCorrect) {
    S.highCorrect = S._gameCorrect;
    document.getElementById('hsBest').textContent = S.highCorrect;
  }
  saveState();

  // XP reward
  const earned = Math.max(5, Math.floor(S._gameScore / 8));
  addXP(earned);

  const medal = S._gameCorrect >= 15 ? '🥇'
              : S._gameCorrect >= 10 ? '🥈'
              : S._gameCorrect >= 5  ? '🥉' : '🎮';

  document.getElementById('goMedal').textContent   = medal;
  document.getElementById('goScore').textContent   = S._gameScore;
  document.getElementById('goCorrect').textContent = S._gameCorrect;
  document.getElementById('goWrong').textContent   = S._gameWrong;
  document.getElementById('goXP').textContent      = '+' + earned;

  updateHomeStats();
}
