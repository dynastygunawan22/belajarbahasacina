/* ===================================================
   state.js  —  Global state & localStorage persistence
   =================================================== */

const STATE_KEY = 'hanyuState_v1';

const defaultState = {
  xp:           0,
  wordsLearned: [],   // array of chars (serializable)
  quizDone:     0,
  streak:       1,
  lastVisit:    null,
  highScore:    0,
  highCorrect:  0,
  apiKey:       '',
  autoSpeak:    true,
  sfx:          true,
  // ephemeral (not persisted)
  _fcCategory:  'Sapaan',
  _fcIndex:     0,
  _fcFlipped:   false,
  _quizMode:    'character',
  _quizDiff:    'easy',
  _quizQuestions:[],
  _quizCurrent: 0,
  _quizScore:   0,
  _quizAnswered:false,
  _gameActive:  false,
  _gameScore:   0,
  _gameCorrect: 0,
  _gameWrong:   0,
  _gameTimer:   null,
  _gameTimeLeft:30,
  _gameWord:    null,
  _chatHistory: [],
};

// Load from localStorage
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
    return Object.assign({}, defaultState, saved, {
      // Always reset ephemeral
      _fcCategory:   defaultState._fcCategory,
      _fcIndex:      0,
      _fcFlipped:    false,
      _quizMode:     defaultState._quizMode,
      _quizDiff:     defaultState._quizDiff,
      _quizQuestions:[],
      _quizCurrent:  0,
      _quizScore:    0,
      _quizAnswered: false,
      _gameActive:   false,
      _gameScore:    0,
      _gameCorrect:  0,
      _gameWrong:    0,
      _gameTimer:    null,
      _gameTimeLeft: 30,
      _gameWord:     null,
      _chatHistory:  [],
    });
  } catch(e) {
    return Object.assign({}, defaultState);
  }
}

function saveState() {
  const persist = {
    xp:          S.xp,
    wordsLearned:S.wordsLearned,
    quizDone:    S.quizDone,
    streak:      S.streak,
    lastVisit:   S.lastVisit,
    highScore:   S.highScore,
    highCorrect: S.highCorrect,
    apiKey:      S.apiKey,
    autoSpeak:   S.autoSpeak,
    sfx:         S.sfx,
  };
  try { localStorage.setItem(STATE_KEY, JSON.stringify(persist)); } catch(e){}
}

function resetState() {
  try { localStorage.removeItem(STATE_KEY); } catch(e){}
  Object.assign(S, defaultState);
}

// Live state object
const S = loadState();

// Check streak on load
(function checkStreak() {
  const today = new Date().toDateString();
  if (S.lastVisit) {
    const last = new Date(S.lastVisit);
    const diff = Math.floor((new Date() - last) / 86400000);
    if (diff === 1) { S.streak += 1; }
    else if (diff > 1) { S.streak = 1; }
  }
  S.lastVisit = today;
  saveState();
})();
