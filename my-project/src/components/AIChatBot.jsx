import React, { useEffect, useMemo, useRef, useState } from "react";

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [minimize, setMinimize] = useState(false);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [search, setSearch] = useState("");
  const [ttsOn, setTtsOn] = useState(false);
  const [dsaMode, setDsaMode] = useState(true);

  const [listening, setListening] = useState(false);
  const [autoSendVoice, setAutoSendVoice] = useState(true);

  const listRef = useRef(null);

  // ✅ Portfolio + DSA Details
  const PROFILE = useMemo(
    () => ({
      name: "Sandeep Goswami",
      role: "Web Developer + DSA Learner",
      skills: [
        "React",
        "Tailwind CSS",
        "JavaScript",
        "HTML",
        "CSS",
        "Git",
        "Responsive Design",
      ],
      projects: [
        { name: "Portfolio Website", info: "Modern dark UI + animations" },
        { name: "Language Translator", info: "React + API based web app" },
        { name: "DSA Practice", info: "LeetCode + problem solving" },
      ],
      contact: {
        email: "yourmail@gmail.com",
        linkedin: "linkedin.com/in/your-link",
        github: "github.com/your-username",
      },
      resumeHint: "Home page pe Resume button se download/view kar sakte ho ✅",
    }),
    []
  );

  // ✅ Helpers
  const nowTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // ✅ Load saved messages
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("sandeep_ai_chat");
    if (saved) return JSON.parse(saved);
    return [
      {
        from: "bot",
        text: `Hi 👋 I’m ${PROFILE.name}'s AI Assistant.\n\n💡 Try: skills | projects | about | contact | resume | DSA roadmap`,
        time: nowTime(),
      },
    ];
  });

  // ✅ Auto save chat
  useEffect(() => {
    localStorage.setItem("sandeep_ai_chat", JSON.stringify(messages));
  }, [messages]);

  // ✅ Auto scroll to bottom
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, minimize]);

  // ✅ Chips
  const chips = [
    "skills",
    "projects",
    "about",
    "contact",
    "resume",
    "DSA roadmap",
    "hashing concept",
    "prefix sum",
    "binary search",
  ];

  // ✅ DSA Knowledge Base
  const DSA_KB = useMemo(
    () => ({
      roadmap: `🧠 DSA ROADMAP (Beginner → Pro) 🔥

✅ Phase 1: Basics (1-2 weeks)
• Time Complexity (Big-O)
• Arrays + Strings
• Basic Recursion

✅ Phase 2: Core Patterns (2-4 weeks)
• Prefix Sum
• Two Pointers
• Sliding Window
• Hashing + Frequency Map

✅ Phase 3: Searching + Sorting
• Binary Search (Normal + on Answer)
• Sorting (Quick/Merge basics)

✅ Phase 4: Data Structures (4-6 weeks)
• Stack / Queue
• Linked List
• Trees (Traversal)
• Heaps (Priority Queue)

✅ Phase 5: Graph + DP (Advance)
• BFS / DFS
• Shortest Path (Dijkstra basic)
• Dynamic Programming (1D/2D)

✅ Best Daily Plan ✅
• 2 Easy + 1 Medium
• 30 min revision
• 1 concept + 1 question

Type: "hashing concept" / "prefix sum explain" / "binary search explain"`,
      hashing: `🧠 HASHING CONCEPT (Real + Simple) ✅

✨ Hashing = fast store + fast search using KEY.

✅ Real Life:
Phone contacts me "Sandeep" dhoondna = direct find ✅

✅ Kab use hota hai?
• Fast search (present/not)
• Frequency count
• Duplicate check
• Two Sum / Subarray Sum

✅ Data structure:
HashMap / Unordered Map (Key → Value)

✅ Complexity:
⚡ Avg O(1)
❗ Worst O(n) (collision rare)

✅ Collision:
2 keys same bucket me chale gaye ❌
Solve:
• Chaining
• Open Addressing

🎯 Trick:
Words like "count", "duplicate", "seen before", "frequency"
➡️ 90% hashing ✅`,
      prefixSum: `🧠 PREFIX SUM (Simple + Powerful) ✅

Prefix Sum = left se cumulative sum store.

nums: [2,3,5]
pref: [2,5,10]

✅ Use:
• Range sum fast
• Subarray sum
• Prefix+HashMap combo questions

🎯 Trigger words:
"subarray sum", "range sum", "sum between i-j"`,
      binarySearch: `🧠 BINARY SEARCH (Fast Searching) ✅

✅ Works on sorted data / monotonic answer
Har step me half cut = O(log n)

✅ Trigger words:
"sorted", "minimum possible", "maximum possible", "kth"`,
      followup: `✅ Next kya samjhau?
• Hashing collision?
• Frequency map?
• Two sum?
Type: "collision explain" / "frequency map explain"`,
    }),
    []
  );

  // ✅ Main Knowledge Base
  const knowledgeBase = useMemo(() => {
    return [
      {
        keywords: ["skills", "skill", "stack", "tech"],
        reply: `✅ Skills:\n• ${PROFILE.skills.join("\n• ")}`,
      },
      {
        keywords: ["projects", "project", "portfolio", "work"],
        reply:
          `✅ Projects:\n` +
          PROFILE.projects.map((p) => `• ${p.name} — ${p.info}`).join("\n"),
      },
      {
        keywords: ["about", "intro", "yourself", "who are you"],
        reply: `✅ About:\n${PROFILE.name} is a ${PROFILE.role} who builds modern UI + practices DSA for placements 🚀`,
      },
      {
        keywords: ["contact", "email", "linkedin", "github", "connect"],
        reply: `✅ Contact:\n• Email: ${PROFILE.contact.email}\n• LinkedIn: ${PROFILE.contact.linkedin}\n• GitHub: ${PROFILE.contact.github}`,
      },
      {
        keywords: ["resume", "cv"],
        reply: `✅ Resume:\n${PROFILE.resumeHint}`,
      },
      {
        keywords: ["hello", "hi", "hey", "hii"],
        reply: `Hey 👋\nTry: skills | projects | about | contact | resume | DSA roadmap ✅`,
      },
    ];
  }, [PROFILE]);

  // ✅ Intent detection
  const detectIntent = (text) => {
    const t = text.toLowerCase().trim();

    if (t.includes("dsa") && (t.includes("roadmap") || t.includes("plan")))
      return "DSA_ROADMAP";

    if (t.includes("hash") || t.includes("hashing")) return "HASHING";
    if (t.includes("prefix") || t.includes("subarray")) return "PREFIX_SUM";
    if (t.includes("binary") || t.includes("bs")) return "BINARY_SEARCH";
    if (t.includes("collision")) return "HASHING";
    if (t.includes("frequency")) return "HASHING";

    return "GENERAL";
  };

  // ✅ Smart reply generator
  const getReply = (text) => {
    const t = text.toLowerCase().trim();
    const intent = detectIntent(text);

    if (dsaMode) {
      if (intent === "DSA_ROADMAP") return DSA_KB.roadmap;
      if (intent === "HASHING") return DSA_KB.hashing + "\n\n" + DSA_KB.followup;
      if (intent === "PREFIX_SUM") return DSA_KB.prefixSum;
      if (intent === "BINARY_SEARCH") return DSA_KB.binarySearch;
    }

    let best = { score: 0, reply: null };
    for (const item of knowledgeBase) {
      let score = 0;
      for (const kw of item.keywords) {
        if (t.includes(kw)) score += kw.length * 2;
      }
      if (score > best.score) best = { score, reply: item.reply };
    }

    if (best.reply) return best.reply;

    return `✨ Samjh nahi aaya 😄\nTry:\n• skills\n• projects\n• about\n• contact\n• resume\n• DSA roadmap\n\nType: "hashing concept" ✅`;
  };

  // ✅ TTS
  const speak = (text) => {
    if (!ttsOn) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text.replaceAll("\n", " "));
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  };

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text, time: nowTime() }]);
  };

  const handleSend = (customText) => {
    const finalText = (customText ?? input).trim();
    if (!finalText) return;

    addMessage("user", finalText);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getReply(finalText);
      addMessage("bot", reply);
      setIsTyping(false);
      speak(reply);
    }, 650);
  };

  const handleChip = (chip) => {
    setOpen(true);
    setMinimize(false);
    handleSend(chip);
  };

  const clearChat = () => {
    const fresh = [
      {
        from: "bot",
        text: `Hi 👋 I’m ${PROFILE.name}'s AI Assistant.\n\n💡 Try: skills | projects | about | contact | resume | DSA roadmap`,
        time: nowTime(),
      },
    ];
    setMessages(fresh);
    localStorage.setItem("sandeep_ai_chat", JSON.stringify(fresh));
  };

  // ✅ Copy message
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      addMessage("bot", "✅ Copied!");
    } catch (e) {
      addMessage("bot", "❌ Copy failed");
    }
  };

  // ✅ Voice Recognition
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      addMessage("bot", "❌ Voice input not supported in this browser.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = false;

    setListening(true);

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);

      if (autoSendVoice) {
        setTimeout(() => handleSend(transcript), 200);
      }
    };

    rec.onerror = () => {
      addMessage("bot", "❌ Voice recognition error. Try again.");
      setListening(false);
    };

    rec.onend = () => setListening(false);

    rec.start();
  };

  // ✅ Search filter
  const filteredMessages = useMemo(() => {
    if (!search.trim()) return messages;
    const s = search.toLowerCase();
    return messages.filter((m) => m.text.toLowerCase().includes(s));
  }, [messages, search]);

  // ✅ highlight search matches (Gold)
  const highlight = (text) => {
    if (!search.trim()) return text;
    const s = search.trim();
    const parts = text.split(new RegExp(`(${s})`, "gi"));
    return parts.map((p, i) =>
      p.toLowerCase() === s.toLowerCase() ? (
        <mark
          key={i}
          className="bg-yellow-400/25 text-yellow-200 px-1 rounded"
        >
          {p}
        </mark>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  };

  return (
    <>
      {/* ✅ Floating Button (Gold Theme) */}
      <button
        onClick={() => {
          setOpen(!open);
          setMinimize(false);
        }}
        className="
          fixed bottom-6 right-6 z-[9999]
          flex items-center justify-center w-14 h-14 rounded-full
          bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a]
          shadow-[0_0_25px_rgba(255,176,0,0.45)]
          hover:shadow-[0_0_45px_rgba(255,176,0,0.85)]
          hover:scale-105 transition
        "
        title="Open AI Assistant"
      >
        🤖
      </button>

      {/* ✅ Chat Box */}
      {open && (
        <div
          className="
            fixed bottom-24 right-6 z-[9999] w-80
            bg-black/80 backdrop-blur-xl
            border border-yellow-400/20
            rounded-2xl shadow-xl overflow-hidden
          "
        >
          {/* ✅ Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-400/15">
            <div>
              <h3 className="text-white font-semibold">AI Assistant</h3>
              <p className="text-[11px] text-white/50">
                {PROFILE.name} • {PROFILE.role}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDsaMode(!dsaMode)}
                className={`text-xs px-2 py-1 rounded-lg border transition ${
                  dsaMode
                    ? "border-yellow-400/50 text-yellow-200 bg-yellow-400/10"
                    : "border-white/10 text-white/60"
                }`}
                title="DSA Mode"
              >
                {dsaMode ? "🧠 DSA ON" : "💤 DSA OFF"}
              </button>

              <button
                onClick={() => setMinimize(!minimize)}
                className="text-white/70 hover:text-white"
                title="Minimize"
              >
                {minimize ? "⬆" : "⬇"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white"
                title="Close"
              >
                ✖
              </button>
            </div>
          </div>

          {/* ✅ Minimized */}
          {minimize ? (
            <div className="p-3">
              <p className="text-white/70 text-sm">
                Chat minimized ✅ Click ⬆ to open.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {chips.slice(0, 6).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleChip(c)}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* ✅ Search + Actions */}
              <div className="p-3 border-b border-yellow-400/15 space-y-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search in chat..."
                  className="w-full px-3 py-2 rounded-xl bg-white/10 text-white outline-none text-sm border border-yellow-400/10 focus:border-yellow-400/30"
                />

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={clearChat}
                    className="text-xs px-3 py-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20"
                  >
                    🧹 Clear
                  </button>

                  <button
                    onClick={() => setAutoSendVoice(!autoSendVoice)}
                    className={`text-xs px-3 py-2 rounded-xl border transition ${
                      autoSendVoice
                        ? "border-yellow-400/40 text-yellow-200 bg-yellow-400/10"
                        : "border-white/10 text-white/60"
                    }`}
                    title="Auto send voice"
                  >
                    {autoSendVoice ? "🎙️ AutoSend ON" : "🎙️ AutoSend OFF"}
                  </button>

                  <button
                    onClick={() => setTtsOn(!ttsOn)}
                    className={`text-xs px-3 py-2 rounded-xl border transition ${
                      ttsOn
                        ? "border-yellow-400/40 text-yellow-200 bg-yellow-400/10"
                        : "border-white/10 text-white/60"
                    }`}
                    title="Text-to-Speech"
                  >
                    🔊
                  </button>
                </div>
              </div>

              {/* ✅ Chips */}
              <div className="px-3 py-2 flex flex-wrap gap-2 border-b border-yellow-400/15">
                {chips.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleChip(c)}
                    className="
                      text-xs px-3 py-1 rounded-full
                      bg-gradient-to-r from-yellow-400/10 to-orange-400/10
                      border border-yellow-400/15
                      text-white/85 hover:scale-[1.02] transition
                    "
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* ✅ Messages */}
              <div ref={listRef} className="h-64 overflow-y-auto p-3 space-y-2">
                {filteredMessages.map((m, i) => (
                  <div key={i} className="space-y-1">
                    <div
                      className={`group relative max-w-[88%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                        m.from === "user"
                          ? "ml-auto bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a] text-black"
                          : "mr-auto bg-white/10 text-white"
                      }`}
                    >
                      {highlight(m.text)}

                      {m.from === "bot" && (
                        <button
                          onClick={() => copyText(m.text)}
                          className="absolute -right-9 top-2 opacity-0 group-hover:opacity-100 transition text-white/60 hover:text-white text-xs"
                          title="Copy"
                        >
                          📋
                        </button>
                      )}
                    </div>

                    <p
                      className={`text-[10px] ${
                        m.from === "user"
                          ? "text-right text-white/40"
                          : "text-left text-white/40"
                      }`}
                    >
                      {m.time}
                    </p>
                  </div>
                ))}

                {/* ✅ Typing indicator */}
                {isTyping && (
                  <div className="mr-auto bg-white/10 text-white max-w-[70%] px-3 py-2 rounded-xl text-sm">
                    <span className="inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-300/70 animate-bounce"></span>
                      <span className="w-2 h-2 rounded-full bg-yellow-300/70 animate-bounce [animation-delay:120ms]"></span>
                      <span className="w-2 h-2 rounded-full bg-yellow-300/70 animate-bounce [animation-delay:240ms]"></span>
                      <span className="text-white/70">AI is typing...</span>
                    </span>
                  </div>
                )}
              </div>

              {/* ✅ Input */}
              <div className="p-3 border-t border-yellow-400/15 flex gap-2 items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type here..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white/10 text-white outline-none text-sm border border-yellow-400/10 focus:border-yellow-400/30"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                {/* ✅ Mic */}
                <button
                  onClick={startVoice}
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${
                    listening
                      ? "bg-yellow-400/15 border-yellow-400/60 text-yellow-200 animate-pulse shadow-[0_0_25px_rgba(255,176,0,0.35)]"
                      : "bg-white/10 border-white/10 text-white/80 hover:bg-white/20"
                  }`}
                  title={listening ? "Listening..." : "Voice Input"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
                    <path d="M19 11a7 7 0 0 1-14 0" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                    <line x1="8" x2="16" y1="22" y2="22" />
                  </svg>
                </button>

                {/* ✅ Send */}
                <button
                  onClick={() => handleSend()}
                  className="
                    px-4 py-2 rounded-xl text-black font-semibold
                    bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a]
                    shadow-[0_0_18px_rgba(255,176,0,0.35)]
                    hover:shadow-[0_0_30px_rgba(255,176,0,0.7)]
                    transition
                  "
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
