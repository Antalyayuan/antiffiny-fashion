import React, { useState, useRef, useEffect } from "react";
import OpenAI from "openai";

interface Message {
  from: "user" | "bot";
  text: string;
}

interface ChatWindowProps {
  onClose: () => void;
}

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // 允许在浏览器端调用（仅测试/学习用）
});

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: `Welcome to Antiffany & Co.’s Digital Concierge 💎\n\nI'm your personal assistant. How may I help you today?`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 发送消息
  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userMsg = { from: "user", text: inputValue.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      // 调用 OpenAI 接口
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // 小型高效模型
        messages: [
          {
            role: "system",
            content:
              "You are a polite, elegant digital concierge for Antiffany & Co. Respond concisely in the tone of a luxury brand assistant.",
          },
          ...messages.map((m) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          })),
          { role: "user", content: userMsg.text },
        ],
      });

      const reply = response.choices[0].message.content;
      setMessages((prev) => [...prev, { from: "bot", text: reply || "" }]);
    } catch (error) {
      console.error("OpenAI error:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I'm having trouble responding right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-[#81D8D0] text-white flex justify-between items-center px-4 py-2">
        <h3 className="font-semibold">Message us</h3>
        <button onClick={onClose} className="text-white text-xl font-bold">
          ×
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2">
        <p className="text-center font-serif text-lg text-gray-700 mb-2">
          ANTIFFANY & CO.
        </p>

        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${
              m.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[75%] text-sm whitespace-pre-line ${
                m.from === "user"
                  ? "bg-[#81D8D0] text-white"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 text-sm italic">Typing...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 flex items-center p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="text-[#81D8D0] font-bold px-3 text-lg"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
