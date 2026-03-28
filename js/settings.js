/* ===================================================
   settings.js  —  Settings page
   =================================================== */

function initSettingsPage() {
  const inp = document.getElementById('apiKeySettings');
  if (inp) inp.value = S.apiKey || '';

  const statusEl = document.getElementById('apiStatus');
  if (statusEl) {
    statusEl.innerHTML = S.apiKey
      ? '<span style="color:var(--green)">✅ API Key tersimpan dan aktif</span>'
      : '<span style="color:var(--text-muted)">Belum ada API Key</span>';
  }

  const autoSpeak = document.getElementById('autoSpeakToggle');
  if (autoSpeak) autoSpeak.checked = S.autoSpeak !== false;

  const sfxToggle = document.getElementById('sfxToggle');
  if (sfxToggle) sfxToggle.checked = S.sfx !== false;
}

function saveApiKeyFrom(source) {
  let inputId;
  if (source === 'quiz')     inputId = 'apiKeyQuiz';
  else if (source === 'ai')  inputId = 'apiKeyAI';
  else                       inputId = 'apiKeySettings';

  const val = (document.getElementById(inputId) || {}).value || '';
  const trimmed = val.trim();

  if (!trimmed) {
    showToast('⚠️ Masukkan API Key terlebih dahulu');
    return;
  }
  if (!trimmed.startsWith('sk-')) {
    showToast('⚠️ Format API Key tidak valid (harus dimulai sk-)');
    return;
  }

  S.apiKey = trimmed;
  saveState();
  showToast('✅ API Key disimpan! AI aktif.');

  // Sync all inputs
  ['apiKeyQuiz','apiKeyAI','apiKeySettings'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = trimmed;
  });

  // Hide notices
  ['quizApiNotice','aiApiNotice'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Update settings status
  const statusEl = document.getElementById('apiStatus');
  if (statusEl) statusEl.innerHTML = '<span style="color:var(--green)">✅ API Key tersimpan dan aktif</span>';
}

function toggleAutoSpeak(val) {
  S.autoSpeak = val;
  saveState();
  showToast(val ? '🔊 Pelafalan otomatis aktif' : '🔇 Pelafalan otomatis nonaktif');
}

function toggleSFX(val) {
  S.sfx = val;
  saveState();
  showToast(val ? '🎵 Efek suara aktif' : '🔕 Efek suara nonaktif');
}

function exportProgress() {
  const data = {
    exportDate:   new Date().toISOString(),
    xp:           S.xp,
    wordsLearned: S.wordsLearned,
    quizDone:     S.quizDone,
    streak:       S.streak,
    highScore:    S.highScore,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `hanyu-progress-${new Date().toLocaleDateString('id')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📥 Progres berhasil diekspor!');
}

function confirmReset() {
  openModal(
    '🗑️ Reset Semua Data',
    'Apakah kamu yakin ingin menghapus semua data progres? Tindakan ini tidak dapat dibatalkan.<br><br>' +
    `<strong>Yang akan dihapus:</strong><br>` +
    `• ${S.xp} XP yang sudah dikumpulkan<br>` +
    `• ${S.wordsLearned.length} kata yang sudah dipelajari<br>` +
    `• Riwayat kuis dan skor game`,
    [
      { label: 'Batal', cls: 'btn--ghost', fn: 'closeModal()' },
      { label: '🗑️ Ya, Reset', cls: 'btn--danger', fn: 'doReset()' },
    ]
  );
}

function doReset() {
  closeModal();
  resetState();
  // Re-init UI
  updateHomeStats();
  showToast('🗑️ Semua data telah direset');
  showPage('home');
}
