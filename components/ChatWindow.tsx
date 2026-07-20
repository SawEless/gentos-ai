"use client";

import { useState, useEffect } from "react";

const COUNTRY_INFO: Record<string, { code: string; flag: string }> = {
  nepal: { code: "KTM", flag: "🇳🇵" },
  india: { code: "DEL", flag: "🇮🇳" },
  pakistan: { code: "ISB", flag: "🇵🇰" },
  bangladesh: { code: "DAC", flag: "🇧🇩" },
  "sri lanka": { code: "CMB", flag: "🇱🇰" },
  china: { code: "PEK", flag: "🇨🇳" },
  vietnam: { code: "HAN", flag: "🇻🇳" },
  philippines: { code: "MNL", flag: "🇵🇭" },
  indonesia: { code: "JKT", flag: "🇮🇩" },
  nigeria: { code: "LOS", flag: "🇳🇬" },
  kenya: { code: "NBO", flag: "🇰🇪" },
  "south korea": { code: "ICN", flag: "🇰🇷" },
  japan: { code: "NRT", flag: "🇯🇵" },
  thailand: { code: "BKK", flag: "🇹🇭" },
  malaysia: { code: "KUL", flag: "🇲🇾" },
  brazil: { code: "GRU", flag: "🇧🇷" },
};

const DEST_INFO: Record<string, { code: string; flag: string }> = {
  australia: { code: "SYD", flag: "🇦🇺" },
  "united kingdom": { code: "LON", flag: "🇬🇧" },
  uk: { code: "LON", flag: "🇬🇧" },
  canada: { code: "TOR", flag: "🇨🇦" },
  "united states": { code: "NYC", flag: "🇺🇸" },
  usa: { code: "NYC", flag: "🇺🇸" },
  "new zealand": { code: "AKL", flag: "🇳🇿" },
};

function getCountryInfo(country: string) {
  const key = country.trim().toLowerCase();
  return COUNTRY_INFO[key] || { code: country.slice(0, 3).toUpperCase(), flag: "🌍" };
}

function getDestInfo(destination: string) {
  const key = destination.trim().toLowerCase();
  return DEST_INFO[key] || { code: destination.slice(0, 3).toUpperCase(), flag: "🌍" };
}

const CALENDLY_URL = "https://calendly.com/shaileshbhattarai789/30min";

export default function ChatWindow(){

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>("");

  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      text: "Hello 👋 I am your AI education consultant. Which country are you hoping to study in — Australia, the UK, Canada, the USA, or New Zealand?"
    }
  ]);

  useEffect(() => {
    let id = localStorage.getItem("agentos_session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("agentos_session_id", id);
    }
    setSessionId(id);
  }, []);

  async function sendMessage(){

    if(!message || loading) return;

    const userMessage = { role: "user", text: message };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {

      const history = updatedMessages.map(m => ({
        role: m.role,
        content: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, history, sessionId })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: data.reply || "Sorry, something went wrong." }
      ]);

      if (data.lead && data.lead.country) {
        setLead(data.lead);
      }

    } catch (err) {

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Network error — could not reach the server." }
      ]);

    } finally {
      setLoading(false);
    }

  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    if(e.key === "Enter"){
      sendMessage();
    }
  }

  function openBooking(){
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }

  const originInfo = lead?.country ? getCountryInfo(lead.country) : null;
  const destInfo = lead?.destination ? getDestInfo(lead.destination) : { code: "···", flag: "🌍" };

  return (

    <div className="bg-[#0B1E3D] rounded-2xl border border-[#C9973E]/30 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">

      <div className="flex items-center justify-between px-6 py-3 border-b border-[#C9973E]/20">
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#C9973E]">Enquiry Desk</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse"></span>
          <p className="font-mono text-[10px] tracking-widest uppercase text-[#F7F1E4]/50">Live</p>
        </div>
      </div>

      {originInfo && (
        <div
          key={lead.country + (lead.destination || "")}
          className="flex items-center justify-between px-6 py-3 border-b border-[#C9973E]/20 bg-[#F7F1E4]/5 animate-[fadeIn_0.4s_ease-out]"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{originInfo.flag}</span>
            <span className="font-mono text-xs text-[#F7F1E4]/70">{originInfo.code}</span>
          </div>

          <div className="relative flex-1 mx-4 h-4">
            <svg viewBox="0 0 200 16" className="w-full h-full overflow-visible">
              <line
                x1="0" y1="8" x2="200" y2="8"
                stroke="#C9973E" strokeOpacity="0.35" strokeWidth="1.5"
                strokeDasharray="5 5"
              />
            </svg>
            <div className="absolute top-1/2 -translate-y-1/2 text-sm animate-flyPlane">✈️</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#F7F1E4]/70">{destInfo.code}</span>
            <span className="text-lg">{destInfo.flag}</span>
          </div>
        </div>
      )}

      {lead?.country && lead?.course && (
        <div className="px-6 py-4 border-b border-[#C9973E]/20 bg-[#C9973E]/5 animate-[fadeIn_0.4s_ease-out]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] tracking-widest uppercase text-[#C9973E] mb-1">Ready to board</p>
              <p className="text-sm text-[#F7F1E4]">You're qualified — book a free consultation to move forward.</p>
            </div>
            <button
              onClick={openBooking}
              className="shrink-0 bg-[#C9973E] text-[#0B1E3D] font-medium text-xs px-4 py-2.5 rounded-lg hover:bg-[#d9a94f] transition-colors whitespace-nowrap"
            >
              Book Consultation →
            </button>
          </div>
        </div>
      )}

      <div className="min-h-[280px] max-h-[420px] overflow-y-auto px-6 py-6 space-y-3">

        {
          messages.map((msg, index) => (
            <div key={index} className={"flex flex-col " + (msg.role === "assistant" ? "items-start" : "items-end")}>
              <p className="font-mono text-[9px] tracking-widest uppercase text-[#F7F1E4]/30 mb-1 px-1">
                {msg.role === "assistant" ? "Desk" : "You"}
              </p>
              <div
                className={
                  "max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed animate-[fadeIn_0.3s_ease-out] " +
                  (msg.role === "assistant"
                    ? "bg-[#F7F1E4]/10 text-[#F7F1E4] border border-[#F7F1E4]/10"
                    : "bg-[#C9973E] text-[#0B1E3D] font-medium")
                }
              >
                {msg.text}
              </div>
            </div>
          ))
        }

        {
          loading && (
            <div className="flex flex-col items-start">
              <p className="font-mono text-[9px] tracking-widest uppercase text-[#F7F1E4]/30 mb-1 px-1">Desk</p>
              <div className="bg-[#F7F1E4]/10 border border-[#F7F1E4]/10 px-4 py-3 rounded-xl flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#C9973E] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-[#C9973E] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-[#C9973E] rounded-full animate-bounce"></span>
              </div>
            </div>
          )
        }

      </div>

      <div className="flex gap-2 px-5 py-4 border-t border-[#C9973E]/20 bg-[#0B1E3D]">

        <input
          className="bg-[#F7F1E4]/5 border border-[#F7F1E4]/15 text-[#F7F1E4] placeholder:text-[#F7F1E4]/30 rounded-lg px-4 py-3 flex-1 text-sm focus:outline-none focus:border-[#C9973E]/50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about studying abroad..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-[#C9973E] text-[#0B1E3D] font-medium px-5 rounded-lg text-sm disabled:opacity-50 hover:bg-[#d9a94f] transition-colors"
        >
          Send
        </button>

      </div>

    </div>

  );

}