import React, { useEffect, useRef, useState } from "react";

const API_ENDPOINT = "http://localhost/api/chat.php";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Load previous chat from localStorage if available
    const saved = localStorage.getItem("siber_chat_history");
    return saved ? JSON.parse(saved) : [{ role: "system", text: "You are Siber Techs Institute assistant." }];
  });
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);
  const messagesRef = useRef(null);

  // 🧠 Save to localStorage whenever messages update
  useEffect(() => {
    localStorage.setItem("siber_chat_history", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + text : text));
    };
    recog.onend = () => setListening(false);
    recog.onerror = () => setListening(false);

    recognitionRef.current = recog;
  }, []);

  // Text-to-Speech
  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // 📨 Send message to backend
  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          message: trimmed,
          history: messages.filter((x) => x.role !== "system"),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      if (data.reply) {
        const botMsg = { role: "assistant", text: data.reply };
        setMessages((m) => [...m, botMsg]);
        speak(data.reply);
      } else {
        throw new Error("No reply from server");
      }
    } catch (err) {
      console.error(err);
      const errMsg = { role: "assistant", text: "Sorry — something went wrong. Please try again later." };
      setMessages((m) => [...m, errMsg]);
      speak(errMsg.text);
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Optional: clear chat memory
  const clearChat = () => {
    localStorage.removeItem("siber_chat_history");
    setMessages([{ role: "system", text: "You are Siber Techs Institute assistant." }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {!open ? (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-[#172554] text-white shadow-xl flex items-center justify-center hover:bg-[#0f2444] transition"
        >
          💬
        </button>
      ) : (
        <div className="w-[360px] md:w-[420px] h-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#172554] text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center font-bold">S</div>
              <div className="text-sm font-semibold">Siber Techs Assistant</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearChat} title="Clear chat" className="text-white/70 hover:text-white text-sm">
                🗑
              </button>
              <button onClick={() => setOpen(false)} title="Close" className="text-white hover:opacity-90">
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="flex-1 overflow-auto px-4 py-3 space-y-3 bg-gradient-to-b from-white to-gray-100"
            style={{ scrollbarGutter: "stable" }}
          >
            {messages
              .filter((m) => m.role !== "system")
              .map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <div
                    className={`inline-block max-w-[85%] px-4 py-2 rounded-lg ${
                      m.role === "user" ? "bg-[#172554] text-white" : "bg-white shadow"
                    }`}
                  >
                    <div className="text-sm">{m.text}</div>
                  </div>
                </div>
              ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="px-4 py-3 bg-white/90">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                title={listening ? "Stop recording" : "Record message"}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  listening ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                🎤
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about admissions, courses..."
                className="flex-1 px-4 py-2 rounded-full border focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="ml-2 bg-[#172554] text-white px-4 py-2 rounded-full disabled:opacity-60"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
