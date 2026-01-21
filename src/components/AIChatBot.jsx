import React, { useState } from "react";

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m Sandeep’s AI Assistant. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");

  const quickReplies = {
    "skills": "✅ Skills: React, Tailwind CSS, JavaScript, HTML, CSS, Git, Responsive Design.",
    "projects": "✅ Projects: Portfolio Website, Web Apps, UI Components. (Add your project names here)",
    "contact": "✅ Contact: You can reach me via LinkedIn / GitHub / Email from the icons below.",
    "resume": "✅ Resume: Click the Resume button on the home page to download/view it.",
    "about": "✅ I am a Web Developer who builds modern, responsive, and high-performance web applications.",
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const lower = input.toLowerCase();
    let reply =
      "✨ Nice question! You can ask: skills, projects, about, contact, resume ✅";

    Object.keys(quickReplies).forEach((key) => {
      if (lower.includes(key)) reply = quickReplies[key];
    });

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 600);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:scale-105 transition"
      >
        🤖
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[9999] w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                  m.from === "user"
                    ? "ml-auto bg-cyan-500 text-black"
                    : "mr-auto bg-white/10 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              className="flex-1 px-3 py-2 rounded-xl bg-white/10 text-white outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
