/* ===================================================
   data.js  —  Semua data kosakata & konten statis
   =================================================== */

const VOCAB_DATA = {
  'Sapaan': [
    {char:'你好',    pinyin:'nǐ hǎo',       meaning:'Halo / Apa kabar',   tone:3, example:{cn:'你好！我叫小明。',id:'Halo! Nama saya Xiao Ming.'}},
    {char:'再见',    pinyin:'zài jiàn',      meaning:'Selamat tinggal',    tone:4, example:{cn:'再见！明天见。',id:'Sampai jumpa! Sampai besok.'}},
    {char:'谢谢',    pinyin:'xiè xiè',       meaning:'Terima kasih',       tone:4, example:{cn:'谢谢你的帮助！',id:'Terima kasih atas bantuanmu!'}},
    {char:'对不起',  pinyin:'duì bu qǐ',     meaning:'Maaf',               tone:4, example:{cn:'对不起，我迟到了。',id:'Maaf, saya terlambat.'}},
    {char:'没关系',  pinyin:'méi guān xi',   meaning:'Tidak apa-apa',      tone:2, example:{cn:'没关系，不用担心。',id:'Tidak apa-apa, jangan khawatir.'}},
    {char:'请',      pinyin:'qǐng',          meaning:'Silakan / Tolong',   tone:3, example:{cn:'请坐！',id:'Silakan duduk!'}},
    {char:'早上好',  pinyin:'zǎo shang hǎo', meaning:'Selamat pagi',       tone:3, example:{cn:'早上好！今天天气很好。',id:'Selamat pagi! Cuaca hari ini bagus.'}},
    {char:'晚安',    pinyin:'wǎn ān',        meaning:'Selamat malam',      tone:3, example:{cn:'晚安，好梦！',id:'Selamat malam, mimpi indah!'}},
    {char:'你好吗',  pinyin:'nǐ hǎo ma',     meaning:'Apa kabar?',         tone:3, example:{cn:'你好吗？我很好，谢谢。',id:'Apa kabar? Saya baik-baik saja, terima kasih.'}},
    {char:'不客气',  pinyin:'bú kè qi',      meaning:'Sama-sama',          tone:4, example:{cn:'谢谢！不客气。',id:'Terima kasih! Sama-sama.'}},
  ],
  'Keluarga': [
    {char:'爸爸',    pinyin:'bà ba',         meaning:'Ayah',               tone:4, example:{cn:'我爸爸是医生。',id:'Ayahku adalah dokter.'}},
    {char:'妈妈',    pinyin:'mā ma',         meaning:'Ibu',                tone:1, example:{cn:'我妈妈很漂亮。',id:'Ibuku sangat cantik.'}},
    {char:'哥哥',    pinyin:'gē ge',         meaning:'Kakak laki-laki',    tone:1, example:{cn:'我哥哥在上海工作。',id:'Kakak laki-lakiku bekerja di Shanghai.'}},
    {char:'姐姐',    pinyin:'jiě jiě',       meaning:'Kakak perempuan',    tone:3, example:{cn:'姐姐喜欢唱歌。',id:'Kakak perempuanku suka bernyanyi.'}},
    {char:'弟弟',    pinyin:'dì di',         meaning:'Adik laki-laki',     tone:4, example:{cn:'弟弟今年十岁。',id:'Adik laki-lakiku tahun ini sepuluh tahun.'}},
    {char:'妹妹',    pinyin:'mèi mei',       meaning:'Adik perempuan',     tone:4, example:{cn:'妹妹很可爱。',id:'Adik perempuanku sangat lucu.'}},
    {char:'爷爷',    pinyin:'yé ye',         meaning:'Kakek (ayah)',       tone:2, example:{cn:'爷爷喜欢下棋。',id:'Kakek suka bermain catur.'}},
    {char:'奶奶',    pinyin:'nǎi nai',       meaning:'Nenek (ayah)',       tone:3, example:{cn:'奶奶会做很多菜。',id:'Nenek bisa memasak banyak masakan.'}},
  ],
  'Makanan': [
    {char:'米饭',    pinyin:'mǐ fàn',        meaning:'Nasi',               tone:3, example:{cn:'我每天吃米饭。',id:'Saya makan nasi setiap hari.'}},
    {char:'面条',    pinyin:'miàn tiáo',     meaning:'Mie',                tone:4, example:{cn:'这碗面条很好吃。',id:'Semangkuk mie ini sangat enak.'}},
    {char:'饺子',    pinyin:'jiǎo zi',       meaning:'Pangsit / Dumpling', tone:3, example:{cn:'我喜欢吃饺子。',id:'Saya suka makan pangsit.'}},
    {char:'水果',    pinyin:'shuǐ guǒ',      meaning:'Buah-buahan',        tone:3, example:{cn:'多吃水果对身体好。',id:'Banyak makan buah baik untuk tubuh.'}},
    {char:'茶',      pinyin:'chá',           meaning:'Teh',                tone:2, example:{cn:'中国人喜欢喝茶。',id:'Orang China suka minum teh.'}},
    {char:'咖啡',    pinyin:'kā fēi',        meaning:'Kopi',               tone:1, example:{cn:'我早上喝咖啡。',id:'Saya minum kopi di pagi hari.'}},
    {char:'好吃',    pinyin:'hǎo chī',       meaning:'Enak / Lezat',       tone:3, example:{cn:'这个菜很好吃！',id:'Masakan ini sangat enak!'}},
    {char:'饿',      pinyin:'è',             meaning:'Lapar',              tone:4, example:{cn:'我很饿，我们去吃饭吧。',id:'Saya sangat lapar, ayo kita makan.'}},
    {char:'渴',      pinyin:'kě',            meaning:'Haus',               tone:3, example:{cn:'我渴了，要喝水。',id:'Saya haus, ingin minum air.'}},
    {char:'好喝',    pinyin:'hǎo hē',        meaning:'Enak (minuman)',     tone:3, example:{cn:'这杯茶很好喝。',id:'Secangkir teh ini sangat enak.'}},
  ],
  'Warna': [
    {char:'红色',    pinyin:'hóng sè',       meaning:'Merah',              tone:2, example:{cn:'我喜欢红色。',id:'Saya suka warna merah.'}},
    {char:'蓝色',    pinyin:'lán sè',        meaning:'Biru',               tone:2, example:{cn:'天空是蓝色的。',id:'Langit berwarna biru.'}},
    {char:'黄色',    pinyin:'huáng sè',      meaning:'Kuning',             tone:2, example:{cn:'太阳是黄色的。',id:'Matahari berwarna kuning.'}},
    {char:'绿色',    pinyin:'lǜ sè',         meaning:'Hijau',              tone:4, example:{cn:'草地是绿色的。',id:'Rumput berwarna hijau.'}},
    {char:'黑色',    pinyin:'hēi sè',        meaning:'Hitam',              tone:1, example:{cn:'我喜欢穿黑色衣服。',id:'Saya suka memakai baju hitam.'}},
    {char:'白色',    pinyin:'bái sè',        meaning:'Putih',              tone:2, example:{cn:'雪是白色的。',id:'Salju berwarna putih.'}},
    {char:'粉红色',  pinyin:'fěn hóng sè',   meaning:'Merah muda / Pink',  tone:3, example:{cn:'她喜欢粉红色的裙子。',id:'Dia suka rok berwarna pink.'}},
    {char:'橙色',    pinyin:'chéng sè',      meaning:'Oranye',             tone:2, example:{cn:'橙子是橙色的。',id:'Jeruk berwarna oranye.'}},
  ],
  'Angka': [
    {char:'一',      pinyin:'yī',            meaning:'Satu (1)',           tone:1, example:{cn:'我有一个苹果。',id:'Saya punya satu apel.'}},
    {char:'二',      pinyin:'èr',            meaning:'Dua (2)',            tone:4, example:{cn:'桌子上有两本书。',id:'Di meja ada dua buku.'}},
    {char:'三',      pinyin:'sān',           meaning:'Tiga (3)',           tone:1, example:{cn:'我有三个朋友。',id:'Saya punya tiga teman.'}},
    {char:'四',      pinyin:'sì',            meaning:'Empat (4)',          tone:4, example:{cn:'今天是四月。',id:'Hari ini bulan April.'}},
    {char:'五',      pinyin:'wǔ',            meaning:'Lima (5)',           tone:3, example:{cn:'我家有五口人。',id:'Di rumahku ada lima orang.'}},
    {char:'六',      pinyin:'liù',           meaning:'Enam (6)',           tone:4, example:{cn:'今天是六号。',id:'Hari ini tanggal enam.'}},
    {char:'七',      pinyin:'qī',            meaning:'Tujuh (7)',          tone:1, example:{cn:'一个星期有七天。',id:'Satu minggu ada tujuh hari.'}},
    {char:'八',      pinyin:'bā',            meaning:'Delapan (8)',        tone:1, example:{cn:'八月是夏天。',id:'Agustus adalah musim panas.'}},
    {char:'九',      pinyin:'jiǔ',           meaning:'Sembilan (9)',       tone:3, example:{cn:'九月开学了。',id:'September mulai sekolah.'}},
    {char:'十',      pinyin:'shí',           meaning:'Sepuluh (10)',       tone:2, example:{cn:'我今年十八岁。',id:'Saya tahun ini delapan belas tahun.'}},
    {char:'百',      pinyin:'bǎi',           meaning:'Seratus (100)',      tone:3, example:{cn:'这件衣服一百元。',id:'Baju ini seratus yuan.'}},
    {char:'千',      pinyin:'qiān',          meaning:'Seribu (1000)',      tone:1, example:{cn:'这本书一千元。',id:'Buku ini seribu yuan.'}},
  ],
  'Kehidupan': [
    {char:'工作',    pinyin:'gōng zuò',      meaning:'Bekerja / Pekerjaan',tone:1, example:{cn:'我每天工作八小时。',id:'Saya bekerja delapan jam setiap hari.'}},
    {char:'学习',    pinyin:'xué xí',        meaning:'Belajar',            tone:2, example:{cn:'我在学习中文。',id:'Saya sedang belajar bahasa Mandarin.'}},
    {char:'朋友',    pinyin:'péng yǒu',      meaning:'Teman',              tone:2, example:{cn:'他是我最好的朋友。',id:'Dia adalah temanku yang paling baik.'}},
    {char:'手机',    pinyin:'shǒu jī',       meaning:'Handphone',          tone:3, example:{cn:'我的手机没电了。',id:'Handphoneku kehabisan baterai.'}},
    {char:'喜欢',    pinyin:'xǐ huān',       meaning:'Suka / Menyukai',    tone:3, example:{cn:'我喜欢学中文。',id:'Saya suka belajar Mandarin.'}},
    {char:'快乐',    pinyin:'kuài lè',       meaning:'Bahagia / Senang',   tone:4, example:{cn:'我今天很快乐。',id:'Saya hari ini sangat bahagia.'}},
    {char:'漂亮',    pinyin:'piào liàng',    meaning:'Cantik / Indah',     tone:4, example:{cn:'这朵花很漂亮。',id:'Bunga ini sangat indah.'}},
    {char:'帅',      pinyin:'shuài',         meaning:'Tampan / Keren',     tone:4, example:{cn:'你今天很帅！',id:'Kamu hari ini sangat tampan!'}},
    {char:'累',      pinyin:'lèi',           meaning:'Lelah / Capek',      tone:4, example:{cn:'我今天很累。',id:'Saya hari ini sangat lelah.'}},
    {char:'高兴',    pinyin:'gāo xìng',      meaning:'Gembira',            tone:1, example:{cn:'见到你很高兴！',id:'Senang bertemu denganmu!'}},
  ],
  'Kata Kerja': [
    {char:'吃',      pinyin:'chī',           meaning:'Makan',              tone:1, example:{cn:'我想吃中国菜。',id:'Saya ingin makan masakan China.'}},
    {char:'喝',      pinyin:'hē',            meaning:'Minum',              tone:1, example:{cn:'我每天喝两杯咖啡。',id:'Setiap hari saya minum dua cangkir kopi.'}},
    {char:'说',      pinyin:'shuō',          meaning:'Berbicara / Berkata', tone:1, example:{cn:'他会说中文。',id:'Dia bisa berbicara Mandarin.'}},
    {char:'听',      pinyin:'tīng',          meaning:'Mendengar',          tone:1, example:{cn:'我喜欢听音乐。',id:'Saya suka mendengarkan musik.'}},
    {char:'看',      pinyin:'kàn',           meaning:'Melihat / Menonton', tone:4, example:{cn:'我在看电视。',id:'Saya sedang menonton TV.'}},
    {char:'写',      pinyin:'xiě',           meaning:'Menulis',            tone:3, example:{cn:'她在写作业。',id:'Dia sedang mengerjakan PR.'}},
    {char:'买',      pinyin:'mǎi',           meaning:'Membeli',            tone:3, example:{cn:'我要去买菜。',id:'Saya akan pergi membeli sayuran.'}},
    {char:'去',      pinyin:'qù',            meaning:'Pergi',              tone:4, example:{cn:'我们去吃饭吧！',id:'Ayo kita pergi makan!'}},
    {char:'来',      pinyin:'lái',           meaning:'Datang',             tone:2, example:{cn:'请进来！',id:'Silakan masuk!'}},
    {char:'想',      pinyin:'xiǎng',         meaning:'Ingin / Memikirkan', tone:3, example:{cn:'我想回家了。',id:'Saya ingin pulang ke rumah.'}},
  ],
  'Waktu': [
    {char:'今天',    pinyin:'jīn tiān',      meaning:'Hari ini',           tone:1, example:{cn:'今天天气很好。',id:'Cuaca hari ini sangat bagus.'}},
    {char:'明天',    pinyin:'míng tiān',     meaning:'Besok',              tone:2, example:{cn:'明天我有考试。',id:'Besok saya ada ujian.'}},
    {char:'昨天',    pinyin:'zuó tiān',      meaning:'Kemarin',            tone:2, example:{cn:'昨天我去看电影了。',id:'Kemarin saya pergi menonton film.'}},
    {char:'现在',    pinyin:'xiàn zài',      meaning:'Sekarang',           tone:4, example:{cn:'现在几点了？',id:'Sekarang jam berapa?'}},
    {char:'早上',    pinyin:'zǎo shang',     meaning:'Pagi hari',          tone:3, example:{cn:'我早上六点起床。',id:'Saya bangun jam enam pagi.'}},
    {char:'晚上',    pinyin:'wǎn shang',     meaning:'Malam hari',         tone:3, example:{cn:'晚上我喜欢看书。',id:'Malam hari saya suka membaca buku.'}},
    {char:'星期',    pinyin:'xīng qī',       meaning:'Minggu / Hari',      tone:1, example:{cn:'这个星期很忙。',id:'Minggu ini sangat sibuk.'}},
    {char:'月',      pinyin:'yuè',           meaning:'Bulan',              tone:4, example:{cn:'下个月我去中国。',id:'Bulan depan saya pergi ke China.'}},
  ],
};

// Flatten all words into one array
const ALL_WORDS = Object.values(VOCAB_DATA).flat();

// Daily tips rotation
const DAILY_TIPS = [
  { tip: '声调很重要！"māo"(猫) artinya kucing, tapi "mào"(冒) artinya berani/muncul. Perhatikan nada saat berbicara!', label: '🎵 Tips Nada' },
  { tip: '汉字 ditulis dengan urutan goresan tertentu. Belajar urutan goresan membantu menghafal karakter lebih cepat.', label: '✍️ Tips Menulis' },
  { tip: 'Kata 的 (de) digunakan untuk menghubungkan kata sifat ke kata benda, seperti "cantik-nya bunga" = 漂亮的花 (piàoliang de huā).', label: '📝 Tips Grammar' },
  { tip: 'Belajar minimal 5 kata baru per hari. Dalam setahun kamu sudah hafal 1825 kata — cukup untuk percakapan sehari-hari!', label: '💪 Tips Belajar' },
  { tip: '你好 (nǐ hǎo) adalah sapaan universal. Tapi untuk teman dekat, orang China sering bilang 吃了吗?(Sudah makan?) sebagai sapaan!', label: '🇨🇳 Tips Budaya' },
  { tip: 'Angka 8 (八, bā) dianggap sangat beruntung dalam budaya China karena bunyinya mirip 发 (fā = kemakmuran).', label: '🎲 Tips Budaya' },
  { tip: 'Gunakan Pinyin sebagai jembatan. Tapi segera biasakan membaca karakter Hanzi langsung agar lebih cepat berkembang!', label: '🌉 Tips Pinyin' },
  { tip: 'Coba tonton drama atau film China dengan subtitle. Mendengar bahasa aslinya sangat membantu melatih telinga dan pelafalan!', label: '🎬 Tips Media' },
];

// Quick prompts for AI sidebar
const QUICK_PROMPTS = [
  'Apa bedanya 的、地、得?',
  'Cara pakai 把 dalam kalimat?',
  'Ajarkan sapaan formal dalam Mandarin',
  'Apa itu nada dalam Bahasa Mandarin?',
  'Contoh kalimat dengan 因为...所以',
  'Perbedaan 在 dan 有?',
  'Ajarkan angka 1-100 dalam Mandarin',
  'Cara memesan makanan di restoran',
];

const PRACTICE_PROMPTS = [
  'Buatkan latihan dialog perkenalan diri dalam Mandarin',
  'Koreksi kalimat saya: 我 很 喜欢 吃 中国 的 食物',
  'Beri saya 5 kata baru level menengah beserta contoh kalimat',
  'Jelaskan struktur kalimat dasar Mandarin (S-V-O)',
];
