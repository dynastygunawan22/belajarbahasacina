/* ===================================================
   ai.js  —  AI Tutor chat page
   =================================================== */

const AI_SYSTEM_PROMPT = `Kamu adalah tutor Bahasa Mandarin modern yang ramah, sabar, dan berpengalaman. Tugasmu membantu pelajar Indonesia belajar Bahasa Mandarin (Putonghua/普通话) modern.

Panduan respons:
- Selalu sertakan karakter Hanzi, pinyin, dan terjemahan Bahasa Indonesia
- Tulis dalam format: 汉字 (pīnyīn) = arti dalam Bahasa Indonesia
- Jelaskan dengan singkat, jelas, dan mudah dipahami
- Berikan contoh kalimat yang relevan dan modern
- Gunakan emoji secukupnya untuk membuat penjelasan lebih menarik
- Format contoh kalimat: Mandarin (pinyin) / Terjemahan Indonesia
- Sesekali beri semangat kepada pelajar
- Jawab dalam Bahasa Indonesia kecuali diminta bahasa lain
- Jika ada pertanyaan grammar, beri penjelasan dengan analogi yang mudah
- Maksimal 400 kata per respons agar tidak membingungkan`;

function initAIPage() {
  // API notice
  const notice = document.getElementById('aiApiNotice');
  if (notice) {
    notice.style.display = S.apiKey ? 'none' : 'flex';
    const inp = document.getElementById('apiKeyAI');
    if (inp && S.apiKey) inp.value = S.apiKey;
  }

  // Render sidebar prompts
  const promptList = document.getElementById('promptList');
  if (promptList) {
    promptList.innerHTML = QUICK_PROMPTS.map(p =>
      `<button class="prompt-chip" onclick="sendPrompt(${JSON.stringify(p)})">${p}</button>`
    ).join('');
  }

  const practiceList = document.getElementById('promptListPractice');
  if (practiceList) {
    practiceList.innerHTML = PRACTICE_PROMPTS.map(p =>
      `<button class="prompt-chip" onclick="sendPrompt(${JSON.stringify(p)})">${p}</button>`
    ).join('');
  }

  // Show welcome if chat is empty
  const msgs = document.getElementById('chatMessages');
  if (msgs && msgs.children.length === 0) {
    appendMsg(
      `👋 <strong>你好！ Selamat datang!</strong><br><br>` +
      `Saya tutor AI Bahasa Mandarin Anda. Saya bisa membantu:<br>` +
      `• Menjelaskan grammar dan tata bahasa<br>` +
      `• Kosakata dan idiom modern<br>` +
      `• Latihan percakapan & dialog<br>` +
      `• Budaya dan konteks penggunaan<br><br>` +
      `<span style="color:rgba(255,255,255,0.45);font-size:13px">` +
      `💡 Masukkan API Key Anthropic di atas untuk AI penuh, atau langsung tanya saja!</span>`,
      'ai'
    );
  }
}

function sendPrompt(text) {
  const input = document.getElementById('chatInput');
  if (input) {
    input.value = text;
    sendChat();
  }
}

async function sendChat() {
  const input = document.getElementById('chatInput');
  const msg   = input ? input.value.trim() : '';
  if (!msg) return;

  input.value = '';
  input.style.height = 'auto';

  appendMsg(esc(msg), 'user');
  S._chatHistory.push({ role: 'user', content: msg });

  // Show typing
  const typing = document.getElementById('typingIndicator');
  const sendBtn= document.getElementById('sendBtn');
  if (typing) typing.classList.add('visible');
  if (sendBtn) sendBtn.disabled = true;

  const reply = S.apiKey
    ? await callAI(msg)
    : getFallbackReply(msg);

  if (typing) typing.classList.remove('visible');
  if (sendBtn) sendBtn.disabled = false;

  appendMsg(reply, 'ai');
  S._chatHistory.push({ role: 'assistant', content: reply });

  // Keep history manageable
  if (S._chatHistory.length > 20) S._chatHistory = S._chatHistory.slice(-20);
}

async function callAI(userMsg) {
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
        max_tokens: 1000,
        system: AI_SYSTEM_PROMPT,
        messages: S._chatHistory.slice(-12),
      }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.content.map(c => c.text || '').join('');
  } catch (e) {
    return `❌ Maaf, terjadi kesalahan koneksi ke AI: <em>${e.message}</em><br>Periksa API Key dan koneksi internet Anda.`;
  }
}

function getFallbackReply(msg) {
  const lower = msg.toLowerCase();

  if (/halo|hai|hi|你好|nǐ hǎo/.test(lower))
    return `你好！(nǐ hǎo) 😊<br><br>Senang bertemu kamu! Untuk percakapan lengkap dengan AI, masukkan API Key Anthropic di atas.<br><br>Sementara itu, kamu bisa coba fitur <strong>Flashcard</strong> dan <strong>Kuis</strong> untuk belajar kosakata!`;

  if (/nada|tone|声调/.test(lower))
    return `🎵 <strong>4 Nada Bahasa Mandarin:</strong><br><br>
1️⃣ Nada 1 (ā) — Datar tinggi: <strong>妈</strong> māo = Ibu<br>
2️⃣ Nada 2 (á) — Naik: <strong>麻</strong> má = Rami<br>
3️⃣ Nada 3 (ǎ) — Turun lalu naik: <strong>马</strong> mǎ = Kuda<br>
4️⃣ Nada 4 (à) — Turun tajam: <strong>骂</strong> mà = Memaki<br>
🔘 Nada netral — Pendek & ringan<br><br>
Nada sangat penting! Kata yang sama bisa berarti berbeda tergantung nadanya.`;

  if (/terima kasih|makasih|谢谢/.test(lower))
    return `不客气！(bú kè qi) = Sama-sama! 😊<br><br>
<strong>Ungkapan terima kasih:</strong><br>
• 谢谢 (xiè xiè) = Terima kasih<br>
• 非常感谢 (fēicháng gǎnxiè) = Terima kasih banyak<br>
• 多谢 (duō xiè) = Banyak terima kasih (informal)`;

  if (/pinyin/.test(lower))
    return `📖 <strong>Pinyin</strong> adalah sistem romanisasi Bahasa Mandarin.<br><br>
Pinyin menggunakan huruf Latin + tanda nada untuk menunjukkan pengucapan karakter Hanzi.<br><br>
Contoh: 你好 = nǐ hǎo<br>
• ǐ = huruf i dengan nada ke-3<br>
• ǎ = huruf a dengan nada ke-3<br><br>
Belajar Pinyin adalah langkah pertama yang penting!`;

  return `🤖 Untuk jawaban lengkap dan interaktif dari AI Claude, silakan masukkan <strong>API Key Anthropic</strong> di bagian atas halaman ini.<br><br>
Sementara itu, coba fitur:<br>
• 🃏 <strong>Flashcard</strong> — Hafal kosakata dengan kartu bolak-balik<br>
• 📝 <strong>Kuis</strong> — Uji kemampuanmu<br>
• 🎮 <strong>Mini Game</strong> — Belajar sambil bermain`;
}

function appendMsg(html, role) {
  const area = document.getElementById('chatMessages');
  if (!area) return;

  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.innerHTML = html.replace(/\n/g, '<br>');
  area.appendChild(div);

  // Smooth scroll to bottom
  setTimeout(() => area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' }), 50);
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChat();
  }
  // Auto-resize textarea
  const ta = e.target;
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
}
