// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "motion/react";
import { Link } from "react-router-dom";


// Supported languages (code -> label)
const LANGS = [
  { code: "en", label: "English", sr: "en-IN" },
  { code: "hi", label: "हिन्दी", sr: "hi-IN" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)", sr: "kn-IN" },
  { code: "ml", label: "മലയാളം (Malayalam)", sr: "ml-IN" },
  { code: "mr", label: "मराठी (Marathi)", sr: "mr-IN" },
  { code: "ta", label: "தமிழ் (Tamil)", sr: "ta-IN" },
  { code: "te", label: "తెలుగు (Telugu)", sr: "te-IN" },
  { code: "bn", label: "বাংলা (Bengali)", sr: "bn-IN" },
];

// Simple demo translations for UI and canned replies
const T = {
  title: {
    en: "🤖 AI Kisan Mitra",
    hi: "🤖 एआई किसान मित्र",
    kn: "🤖 AI ಕೃಷಿ ಮಿತ್ರ",
    ml: "🤖 എഐ കിസാൻ മിത്ര",
    mr: "🤖 एआय किसान मित्र",
    ta: "🤖 ஏஐ கிசான் மித்திரா",
    te: "🤖 ఏఐ కిసాన్ మిత్ర",
    bn: "🤖 এআই কিষাণ মিত্র",
  },
  needExpert: {
    en: "🤝 Need Human Expert Help?",
    hi: "🤝 मानव विशेषज्ञ की सहायता चाहिए?",
    kn: "🤝 ಮಾನವ ತಜ್ಞರ ಸಹಾಯ ಬೇಕೆ?",
    ml: "🤝 മനുഷ്യ വിദഗ്ധന്റെ സഹായം വേണോ?",
    mr: "🤝 मानवी तज्ज्ञाची मदत हवी?",
    ta: "🤝 நிபுணரின் உதவி வேண்டுமா?",
    te: "🤝 మానవ నిపుణుడి సహాయం కావాలా?",
    bn: "🤝 মানব বিশেষজ্ঞের সাহায্য চাই?",
  },
  placeholder: {
    en: "Type here...",
    hi: "यहाँ लिखें...",
    kn: "ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
    ml: "ഇവിടെ എഴുതൂ...",
    mr: "इथे लिहा...",
    ta: "இங்கே எழுதவும்...",
    te: "ఇక్కడ టైప్ చేయండి...",
    bn: "এখানে লিখুন...",
  },
  send: {
    en: "Send",
    hi: "भेजें",
    kn: "ಕಳುಹಿಸಿ",
    ml: "അയയ്ക്കുക",
    mr: "पाठवा",
    ta: "அனுப்பு",
    te: "పంపండి",
    bn: "পাঠান",
  },
  start: {
    en: "Start",
    hi: "शुरू",
    kn: "ಆರಂಭಿಸು",
    ml: "തുടങ്ങുക",
    mr: "सुरू",
    ta: "தொடங்கு",
    te: "ప్రారంభించండి",
    bn: "শুরু",
  },
  stop: {
    en: "Stop",
    hi: "रोकें",
    kn: "ನಿಲ್ಲಿಸಿ",
    ml: "നിർത്തുക",
    mr: "थांबवा",
    ta: "நிறுத்து",
    te: "ఆపు",
    bn: "থামান",
  },
  clear: {
    en: "Clear Chat",
    hi: "चैट साफ़ करें",
    kn: "ಚಾಟ್ ಅಳಿಸಿ",
    ml: "ചാറ്റ് മായ്ക്കുക",
    mr: "चॅट साफ करा",
    ta: "அரட்டையை அழி",
    te: "చాట్ క్లియర్ చేయండి",
    bn: "চ্যাট মুছুন",
  },
  upload: {
    en: "Upload",
    hi: "अपलोड",
    kn: "ಅಪ್‌ಲೋಡ್",
    ml: "അപ്‌ലോഡ്",
    mr: "अपलोड",
    ta: "பதிவேற்று",
    te: "అప్‌లోడ్",
    bn: "আপলোড",
  },
  greeting: {
    en: "👋 Namaste Farmer! I am your AI Kisan Mitra. Ask me anything.",
    hi: "👋 नमस्ते किसान! मैं आपका एआई किसान मित्र हूँ। जो भी पूछना है पूछें।",
    kn: "👋 ನಮಸ್ಕಾರ ರೈತರೆ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಮಿತ್ರ. ಏನಾದರೂ ಕೇಳಿ.",
    ml: "👋 നമസ്കാരം കർഷകരേ! ഞാൻ നിങ്ങളുടെ എഐ കിസാൻ മിത്ര. എന്തും ചോദിക്കാം.",
    mr: "👋 नमस्कार शेतकऱ्यांनो! मी तुमचा एआय किसान मित्र. काहीही विचारा.",
    ta: "👋 வணக்கம் விவசாயிகளே! நான் உங்கள் ஏஐ கிசான் மித்திரா. எதை வேண்டுமானாலும் கேளுங்கள்.",
    te: "👋 నమస్తే రైతులారా! నేను మీ ఏఐ కిసాన్ మిత్ర. ఏదైనా అడగండి.",
    bn: "👋 নমস্কার কৃষকবন্ধুরা! আমি আপনার এআই কিষাণ মিত্র। যা খুশি জিজ্ঞেস করুন।",
  },
  aiReplyGeneric: {
    en: "🌱 Here’s a helpful tip based on your query.",
    hi: "🌱 आपके सवाल के अनुसार यह एक उपयोगी सुझाव है।",
    kn: "🌱 ನಿಮ್ಮ ಪ್ರಶ್ನೆಯ ಆಧಾರದ ಮೇಲೆ ಉಪಯುಕ್ತ ಸಲಹೆ ಇಲ್ಲಿದೆ.",
    ml: "🌱 നിങ്ങളുടെ ചോദ്യത്തിന്റെ അടിസ്ഥാനത്തിൽ ഒരു ഉപകാരപ്രദമായ ടിപ്പ്.",
    mr: "🌱 तुमच्या प्रश्नावर आधारित हा उपयुक्त सल्ला आहे.",
    ta: "🌱 உங்கள் கேள்வியை அடிப்படையாகக் கொண்ட ஒரு பயனுள்ள குறிப்பை இங்கே கொடுத்துள்ளோம்.",
    te: "🌱 మీ ప్రశ్న ఆధారంగా ఇది ఒక ఉపయోగకరమైన చిట్కా.",
    bn: "🌱 আপনার প্রশ্ন অনুযায়ী এটি একটি সহায়ক পরামর্শ।",
  },
  aiReplyWithImage: {
    en: "🖼️ I analyzed the image. The leaves show mild stress; consider balanced NPK.",
    hi: "🖼️ मैंने छवि देखी। पत्तों में हल्का तनाव दिख रहा है; संतुलित NPK दें।",
    kn: "🖼️ ಚಿತ್ರ ನೋಡಿದೆ. ಎಲೆಗಳಲ್ಲಿ ಸ್ವಲ್ಪ ಒತ್ತಡ ಕಂಡುಬರುತ್ತದೆ; ಸಮತೋಲಿತ NPK ನೀಡಿ.",
    ml: "🖼️ ഞാൻ ചിത്രം പരിശോധിച്ചു. ഇലകൾക്ക് ചെറിയ സമ്മർദ്ദം; ബാലൻസ്ഡ് NPK നൽകുക.",
    mr: "🖼️ मी प्रतिमा पाहिली. पानांमध्ये सौम्य ताण दिसतो; समतोल NPK द्या.",
    ta: "🖼️ படத்தை பரிசோதித்தேன். இலைகளில் சிறு அழுத்தம் தெரிகிறது; சமநிலை NPK கொடுங்கள்.",
    te: "🖼️ చిత్రాన్ని చూశాను. ఆకు‌ల్లో స్వల్ప ఒత్తిడి ఉంది; సమతుల్య NPK ఇవ్వండి.",
    bn: "🖼️ ছবি দেখেছি। পাতায় হালকা স্ট্রেস দেখা যাচ্ছে; সুষম NPK দিন।",
  },
  // Demo: seeded tomato Q and AI suggestion (fully localized)
  userTomatoQ: {
    en: "What is this tomato leaf problem?",
    hi: "यह टमाटर के पत्ते की समस्या क्या है?",
    kn: "ಇದು ಟೊಮ್ಯಾಟೊ ಎಲೆಯ ಸಮಸ್ಯೆಯೇನು?",
    ml: "ഇത് തക്കാളി ഇലയുടെ പ്രശ്നം എന്താണ്?",
    mr: "हा टोमॅटो पानांचा आजार कोणता?",
    ta: "இது தக்காளி இலைப் பிரச்சனை என்ன?",
    te: "ఇది టమోటా ఆకు సమస్య ఏంటి?",
    bn: "এটি টমেটো পাতার সমস্যা কী?",
  },
  aiTomatoGeneric: {
    en: "Looks like a common leaf spot. Remove affected leaves, keep foliage dry, and apply a copper-based protectant. Monitor new growth.",
    hi: "यह सामान्य पत्ती धब्बा लगता है। प्रभावित पत्ते हटाएँ, पत्तियों को सूखा रखें और कॉपर-आधारित प्रोटेक्टेंट लगाएँ। नई बढ़त पर निगरानी रखें।",
    kn: "ಇದು ಸಾಮಾನ್ಯ ಎಲೆ ಕಲೆ ಎಂದು ಕಾಣುತ್ತದೆ. ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ, ಎಲೆಗಳನ್ನು ಒಣವಾಗಿಡಿ, ಕಾಪರ್ ಆಧಾರಿತ ರಕ್ಷಕವನ್ನು ಬಳಸಿ. ಹೊಸ ಬೆಳವಣಿಗೆಯನ್ನು ಗಮನಿಸಿ.",
    ml: "ഇത് സാധാരണ ഇല്പ랫് പോലെ തോന്നുന്നു. ബാധിത ഇലകൾ നീക്കംചെയ്യുക, ഇലകൾ വരണ്ടതായി സൂക്ഷിക്കുക, കാപ്പർ അധിഷ്‌ഠിത സംരക്ഷകം പ്രയോഗിക്കുക. പുതിയ വളർച്ച നിരീക്ഷിക്കുക.",
    mr: "हे सामान्य पानांवरील डाग वाटतात. बाधित पाने काढून टाका, पर्णसंभार कोरडे ठेवा आणि कॉपर-आधारित संरक्षक फवारणी करा. नवीन वाढीवर लक्ष ठेवा.",
    ta: "இது பொதுவான இலைக் கறை போல் தெரிகிறது. பாதிக்கப்பட்ட இலைகளை அகற்றவும், இலைகளை உலர வைத்துக் கொள்ளவும், தாமிர அடிப்படையிலான பாதுகாப்பு மருந்தை பயன்படுத்தவும். புதிய வளர்ச்சியை கவனிக்கவும்.",
    te: "ఇది సాధారణ ఆకు మచ్చలా కనిపిస్తుంది. ప్రభావిత ఆకులను తీసేయండి, ఆకులు ఎండగా ఉండేలా చూసుకోండి, కాపర్-ఆధారిత రక్షకాన్ని వాడండి. కొత్త పెరుగుదలను గమనించండి.",
    bn: "এটি সাধারণ পাতায় দাগের মতো দেখাচ্ছে। আক্রান্ত পাতা তুলে ফেলুন, পাতাগুলো শুকনো রাখুন এবং কপার-ভিত্তিক প্রটেকট্যান্ট ব্যবহার করুন। নতুন পাতার বৃদ্ধির দিকে নজর রাখুন।",
  },
};

function tr(key, lang) {
  const entry = T[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}

// Fallback "translation" for arbitrary user text (demo-only)
function translateFreeText(text, lang) {
  if (!text) return "";
  // For demo, simply prefix to simulate translation for unknown phrases.
  return `[${lang.toUpperCase()}] ${text}`;
}

// Use a local tomato image if you add /public/tomato.jpg; otherwise fallback to a Wikimedia image
// Attribution: Wikimedia Commons (Tomato leaves) — image is used via hotlink for demo only.
const TOMATO_IMG = "/tomato.png";
const TOMATO_FALLBACK =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tomato_leaf_with_Septoria_leaf_spot.jpg/320px-Tomato_leaf_with_Septoria_leaf_spot.jpg";

// (Removed) disease suggestion dataset to simplify demo UI

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);
  const listRef = useRef(null);

  // Messages store canonical content; we translate at render time
  const makeInitialMessages = () => [
    {
      id: 1,
      sender: "ai",
      // Keep canonical base in English so dictionary detection works
      textBase: tr("greeting", "en"),
      type: "text",
      createdAt: Date.now(),
    },
  ];

  const [messages, setMessages] = useState(() => {
    const base = makeInitialMessages();
    // Seed one tomato example
    const seeded = [
      ...base,
      {
        id: 2,
        sender: "farmer",
        textKey: "userTomatoQ",
        textBase: T.userTomatoQ.en,
        imageUrl: TOMATO_IMG,
        type: "image-text",
        createdAt: Date.now() - 1000 * 60 * 5,
      },
      {
        id: 3,
        sender: "ai",
        textKey: "aiTomatoGeneric",
        textBase: T.aiTomatoGeneric.en,
        type: "text",
        createdAt: Date.now() - 1000 * 60 * 5 + 2000,
      },
    ];
    return seeded;
  });

  useEffect(() => {
    // Auto-scroll to bottom when messages update
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported in this browser");
    const recog = new SpeechRecognition();
    const langMeta = LANGS.find((l) => l.code === language);
    recog.lang = langMeta?.sr || "en-IN";
    recog.onresult = (e) => {
      const transcript = e.results?.[0]?.[0]?.transcript || "";
      setInput((prev) => (prev ? prev + " " : "") + transcript);
    };
    recog.onend = () => setRecording(false);
    recog.start();
    recognitionRef.current = recog;
    setRecording(true);
  };

  const stopVoice = () => {
    recognitionRef.current?.stop();
    setRecording(false);
  };

  const onPickImage = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImage(f);
  };

  // (Removed) addDiseaseDemo as the suggestion section is removed

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    const now = Date.now();
    const newUserMsg = {
      id: now,
      sender: "farmer",
      textBase: input.trim(),
      type: image ? "image-text" : "text",
      file: image || undefined,
      createdAt: now,
    };
    setMessages((prev) => [...prev, newUserMsg]);

    // Demo AI reply after 1s
    setTimeout(() => {
      const useKey = image ? "aiReplyWithImage" : "aiReplyGeneric";
      const aiMsg = {
        id: now + 1,
        sender: "ai",
        textKey: useKey,
        textBase: T[useKey].en,
        type: "text",
        createdAt: now + 1000,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);

    setInput("");
    setImage(null);
  };

  const renderText = (textBase, textKey) => {
    // Use dictionary when possible; otherwise simulate translation
    if (textKey && T[textKey]) return tr(textKey, language);
    const dictKeys = [
      "greeting",
      "aiReplyGeneric",
      "aiReplyWithImage",
      "userTomatoQ",
      "aiTomatoGeneric",
    ];
    const matchingKey = dictKeys.find((k) => T[k].en === textBase);
    if (matchingKey) return tr(matchingKey, language);
    return translateFreeText(textBase, language);
  };

  const clearChat = () => {
    const ok = window.confirm("Clear all chat messages?");
    if (!ok) return;
    setMessages(makeInitialMessages());
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 bg-gray-800 flex flex-wrap gap-3 justify-between items-center border-b border-gray-700">
        <h1 className="text-green-400 font-bold">AI Kisan Mitra</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-2 py-1 text-sm"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={clearChat}
            className="ml-2 px-3 py-1.5 text-sm rounded-md border border-red-500 text-red-400 hover:bg-red-500/10"
            title="Clear all messages"
          >
            🧹 {tr("clear", language)}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <Motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[80%] p-3 rounded-xl border ${
              msg.sender === "farmer"
                ? "ml-auto bg-green-600 text-gray-900 border-green-400"
                : "mr-auto bg-gray-800 text-gray-200 overflow-hidden border-gray-700"
            }`}
          >
            {msg.type !== "text" &&
              (msg.file || msg.imageUrl || msg.imageDemo) && (
                <img
                  src={
                    msg.file
                      ? URL.createObjectURL(msg.file)
                      : msg.imageUrl ||
                        msg.imageDemo ||
                        TOMATO_FALLBACK || TOMATO_IMG
                  }
                  alt="uploaded"
                  className="w-16 h-16 object-cover overflow-hidden rounded-xl mb-2 border border-gray-700"
                />
              )}
            <div>{renderText(msg.textBase, msg.textKey)}</div>
            <div className="text-xs opacity-70 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </Motion.div>
        ))}
      </div>

      {/* (Removed) disease suggestion gallery */}

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 bg-gray-800 flex flex-wrap gap-2 items-center border-t border-gray-700"
      >
        <label className="px-3 py-2 bg-gray-700 text-gray-200 rounded cursor-pointer hover:bg-gray-600">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPickImage}
          />
          📸 {tr("upload", language)}
        </label>
        {image && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>{image.name}</span>
            <button
              type="button"
              className="text-red-400"
              onClick={() => setImage(null)}
            >
              ✕
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={recording ? stopVoice : startVoice}
          className={`px-3 py-2 rounded-md shadow ${
            recording
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
          }`}
        >
          {recording
            ? `⏹ ${tr("stop", language)}`
            : `🎙 ${tr("start", language)}`}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={tr("placeholder", language)}
          className="flex-1 min-w-[200px] bg-gray-900 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
        />

        <Motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-gray-900 rounded-lg"
        >
          {tr("send", language)}
        </Motion.button>
      </form>

      {/* Expert Help Shortcut */}
      <div className="p-3 text-center">
        <Link
          to="/expert"
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          {tr("needExpert", language)}
        </Link>
      </div>
    </div>
  );
}
