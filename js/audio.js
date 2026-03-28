/* ===================================================
   audio.js  —  Text-to-Speech (TTS) helpers
   =================================================== */

let _zhVoice = null;

/** Pre-load Chinese voices */
function initVoices() {
  if (!('speechSynthesis' in window)) return;
  function pick() {
    const voices = window.speechSynthesis.getVoices();
    // Prefer zh-CN, then zh-TW, then any zh
    _zhVoice = voices.find(v => v.lang === 'zh-CN')
            || voices.find(v => v.lang.startsWith('zh'))
            || null;
  }
  pick();
  window.speechSynthesis.onvoiceschanged = pick;
}

/** Speak Chinese text */
function speak(text, rate = 0.85) {
  if (!text) return;
  if (!('speechSynthesis' in window)) {
    showToast('⚠️ Browser tidak mendukung TTS');
    return;
  }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'zh-CN';
  utt.rate = rate;
  utt.pitch = 1;
  if (_zhVoice) utt.voice = _zhVoice;
  window.speechSynthesis.speak(utt);
}

/** Speak current flashcard */
function speakCurrentCard() {
  const words = VOCAB_DATA[S._fcCategory];
  if (words && words[S._fcIndex]) {
    speak(words[S._fcIndex].char);
    showToast('🔊 Memutar pelafalan...');
  }
}

/** Demo speak on home page */
function demoSpeak() {
  speak('你好，欢迎来到汉语学堂！学中文很有趣。');
  showToast('🔊 你好！Selamat datang di HanYu Academy!');
}
