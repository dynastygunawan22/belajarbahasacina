/* ===================================================
   quiz.js  —  Quiz page (local + AI-generated)
   =================================================== */

function initQuizPage() {
  // Show/hide API notice
  const notice = document.getElementById('quizApiNotice');
  if (notice) {
    notice.style.display = S.apiKey ? 'none' : 'flex';
    const inp = document.getElementById('apiKeyQuiz');
    if (inp && S.apiKey) inp.value = S.apiKey;
  }
  renderQuizSetup();
}

/* ---- Setup screen ---- */
function renderQuizSetup() {
  document.getElementById('quizArea').innerHTML = `
    <div class="quiz-setup">
      <div class="quiz-setup-icon">🤖</div>
      <h2>Pilih Mode Kuis</h2>
      <p>AI akan membuat soal unik setiap sesi sesuai levelmu</p>

      <div class="quiz-setup-row">
        <button class="chip active" id="qm-character" onclick="setQuizMode('character')">漢→ Arti</button>
        <button class="chip"        id="qm-meaning"   onclick="setQuizMode('meaning')">Arti→漢</button>
        <button class="chip"        id="qm-pinyin"    onclick="setQuizMode('pinyin')">漢→ Pinyin</button>
      </div>

      <div class="quiz-setup-row">
        <button class="chip active" id="qd-easy"   onclick="setQuizDiff('easy')">🟢 Mudah</button>
        <button class="chip"        id="qd-medium" onclick="setQuizDiff('medium')">🟡 Sedang</button>
        <button class="chip"        id="qd-hard"   onclick="setQuizDiff('hard')">🔴 Sulit</button>
      </div>

      <button class="btn btn--primary" onclick="startQuiz()" id="startQuizBtn" style="margin-top:8px">
        Mulai Kuis (10 Soal)
      </button>
    </div>
  `;
}

function setQuizMode(m) {
  S._quizMode = m;
  ['character','meaning','pinyin'].forEach(x => {
    const el = document.getElementById('qm-' + x);
    if (el) el.classList.toggle('active', x === m);
  });
}

function setQuizDiff(d) {
  S._quizDiff = d;
  ['easy','medium','hard'].forEach(x => {
    const el = document.getElementById('qd-' + x);
    if (el) el.classList.toggle('active', x === d);
  });
}

/* ---- Start quiz ---- */
async function startQuiz() {
  const btn = document.getElementById('startQuizBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Membuat soal...'; }

  const questions = S.apiKey
    ? await generateAIQuiz()
    : generateLocalQuiz();

  if (!questions || questions.length === 0) {
    if (btn) { btn.disabled = false; btn.textContent = 'Mulai Kuis (10 Soal)'; }
    showToast('❌ Gagal membuat soal, coba lagi');
    return;
  }

  S._quizQuestions = questions;
  S._quizCurrent   = 0;
  S._quizScore     = 0;
  S._quizAnswered  = false;
  renderQuizQuestion();
}

/* ---- Local question generator ---- */
function generateLocalQuiz() {
  const pools = {
    easy:   [...(VOCAB_DATA['Sapaan'] || []), ...(VOCAB_DATA['Angka'] || [])],
    medium: [...(VOCAB_DATA['Makanan'] || []), ...(VOCAB_DATA['Warna'] || []), ...(VOCAB_DATA['Waktu'] || [])],
    hard:   ALL_WORDS,
  };
  const pool = pools[S._quizDiff] || ALL_WORDS;
  const selected = shuffle(pool).slice(0, 10);

  return selected.map(w => {
    const wrong   = randomPick(ALL_WORDS.filter(x => x.char !== w.char), 3);
    const options = shuffle([w, ...wrong]);

    let question, answer, optionTexts;
    if (S._quizMode === 'character') {
      question    = w.char;
      answer      = w.meaning;
      optionTexts = options.map(o => o.meaning);
    } else if (S._quizMode === 'meaning') {
      question    = w.meaning;
      answer      = w.char;
      optionTexts = options.map(o => o.char);
    } else {
      question    = w.char;
      answer      = w.pinyin;
      optionTexts = options.map(o => o.pinyin);
    }

    return {
      question,
      questionType: S._quizMode,
      pinyin:       S._quizMode === 'character' ? w.pinyin : '',
      answer,
      options:      optionTexts,
      explanation:  `${w.char} (${w.pinyin}) = ${w.meaning}`,
      originalChar: w.char,
    };
  });
}

/* ---- AI question generator ---- */
async function generateAIQuiz() {
  const levelMap = { easy: 'HSK 1 (pemula)', medium: 'HSK 2 (menengah awal)', hard: 'HSK 3-4 (menengah-lanjut)' };
  const modeMap  = {
    character: 'tampilkan karakter Hanzi sebagai pertanyaan, pilihan jawaban berupa arti dalam Bahasa Indonesia',
    meaning:   'tampilkan arti dalam Bahasa Indonesia sebagai pertanyaan, pilihan jawaban berupa karakter Hanzi',
    pinyin:    'tampilkan karakter Hanzi sebagai pertanyaan, pilihan jawaban berupa pinyin',
  };

  const prompt = `Buat tepat 10 soal kuis Bahasa Mandarin modern untuk level ${levelMap[S._quizDiff]}.
Mode: ${modeMap[S._quizMode]}.

Kembalikan HANYA JSON array berikut tanpa teks lain, tanpa markdown, tanpa backtick:
[
  {
    "question": "teks pertanyaan",
    "questionType": "${S._quizMode}",
    "pinyin": "pinyin jika questionType=character, string kosong jika lainnya",
    "answer": "jawaban benar (harus ada di options)",
    "options": ["opsi1","opsi2","opsi3","opsi4"],
    "explanation": "penjelasan singkat",
    "originalChar": "karakter Hanzi asli"
  }
]
Buat soal beragam, modern, relevan dengan kehidupan sehari-hari. Pastikan "answer" selalu ada persis sama di "options".`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': S.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);

    const raw  = data.content.map(c => c.text || '').join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('Invalid format');
    return parsed;
  } catch (e) {
    showToast('⚠️ AI tidak tersedia, pakai soal lokal');
    return generateLocalQuiz();
  }
}

/* ---- Render question ---- */
function renderQuizQuestion() {
  const q     = S._quizQuestions[S._quizCurrent];
  const total = S._quizQuestions.length;
  const isLarge = q.questionType !== 'meaning';

  const dots = Array.from({ length: total }, (_, i) => `
    <div class="q-dot ${i < S._quizCurrent ? 'done' : i === S._quizCurrent ? 'current' : ''}"></div>
  `).join('');

  document.getElementById('quizArea').innerHTML = `
    <div class="quiz-header">
      <span>Soal <strong>${S._quizCurrent + 1}</strong> / ${total}</span>
      <div class="quiz-dots">${dots}</div>
      <span style="color:var(--gold);font-weight:700">✓ ${S._quizScore}</span>
    </div>

    <div class="quiz-card">
      <div class="quiz-question" style="${!isLarge ? 'font-size:26px;font-family:var(--font-body)' : ''}">
        ${esc(q.question)}
      </div>
      <div class="quiz-pinyin">${q.pinyin ? esc(q.pinyin) : ''}</div>

      <div class="quiz-options" id="quizOpts">
        ${q.options.map(opt => `
          <button class="quiz-option"
            onclick="checkAnswer(this, ${JSON.stringify(esc(opt))}, ${JSON.stringify(esc(q.answer))}, ${JSON.stringify(esc(q.explanation))}, ${JSON.stringify(q.originalChar || '')})">
            ${esc(opt)}
          </button>
        `).join('')}
      </div>

      <div class="quiz-feedback" id="quizFeedback"></div>
      <button class="quiz-next-btn" id="quizNextBtn" onclick="nextQuestion()" style="display:none">
        ${S._quizCurrent < total - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil 🏆'}
      </button>
    </div>
  `;

  S._quizAnswered = false;
}

/* ---- Check answer ---- */
function checkAnswer(btn, selected, answer, explanation, originalChar) {
  if (S._quizAnswered) return;
  S._quizAnswered = true;

  const correct = selected === answer;
  const allBtns = document.querySelectorAll('.quiz-option');
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.textContent.trim() === answer) b.classList.add('correct');
  });

  if (correct) {
    btn.classList.add('correct');
    S._quizScore++;
    addXP(10);
    playSFX('correct');
    document.getElementById('quizFeedback').innerHTML =
      `<span style="color:var(--green)">✅ Benar!</span> &nbsp; ${explanation}`;
    if (S.autoSpeak && originalChar) speak(originalChar);
  } else {
    btn.classList.add('wrong');
    playSFX('wrong');
    document.getElementById('quizFeedback').innerHTML =
      `<span style="color:var(--error)">❌ Salah.</span> &nbsp; Jawaban: <strong>${answer}</strong> &nbsp;·&nbsp; ${explanation}`;
  }

  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn) nextBtn.style.display = 'block';
}

/* ---- Next question ---- */
function nextQuestion() {
  S._quizCurrent++;
  if (S._quizCurrent >= S._quizQuestions.length) {
    showQuizResult();
  } else {
    renderQuizQuestion();
  }
}

/* ---- Result screen ---- */
function showQuizResult() {
  S.quizDone++;
  saveState();

  const total = S._quizQuestions.length;
  const pct   = Math.round(S._quizScore / total * 100);
  const medal = pct >= 90 ? '🥇' : pct >= 70 ? '🥈' : pct >= 50 ? '🥉' : '📚';
  const msg   = pct >= 90
    ? 'Luar biasa! Kamu sangat menguasai materi ini! 🎉'
    : pct >= 70
    ? 'Bagus! Terus berlatih untuk mencapai sempurna. 💪'
    : pct >= 50
    ? 'Lumayan! Masih ada ruang untuk berkembang. 📖'
    : 'Jangan menyerah! Review flashcard dulu yuk. 🔁';

  document.getElementById('quizArea').innerHTML = `
    <div class="quiz-result">
      <div class="result-medal">${medal}</div>
      <div class="result-score">${pct}%</div>
      <div class="result-label">Skor: ${S._quizScore} / ${total} benar</div>
      <p class="result-msg">${msg}</p>
      <div class="result-btns">
        <button class="btn btn--primary" onclick="startQuiz()">🔄 Kuis Lagi</button>
        <button class="btn btn--ghost"   onclick="showPage('flashcard')">🃏 Flashcard</button>
        <button class="btn btn--ghost"   onclick="showPage('home')">🏠 Beranda</button>
      </div>
    </div>
  `;

  updateHomeStats();
}
