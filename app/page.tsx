"use client";

import ChatWindow from "@/components/ChatWindow";

function MobileScrollButton() {
  function scrollToChat() {
    const el = document.getElementById("chat");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToChat}
      className="md:hidden inline-block mt-6 bg-[#0B1E3D] text-[#F7F1E4] font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full animate-fadeUp [animation-delay:0.4s]"
    >
      Start Enquiry ↓
    </button>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F1E4] text-[#0B1E3D] font-body">

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-14 pb-16 md:px-6 md:pt-28 md:pb-32">
        <div className="max-w-5xl mx-auto text-center">

          <p className="font-mono text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#C9973E] mb-4 md:mb-6 animate-fadeUp">
            Student Enquiry Desk · Est. Response 24s
          </p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-7xl leading-[1.15] md:leading-[1.05] font-medium mb-4 md:mb-6 animate-fadeUp [animation-delay:0.1s]">
            Your students' next chapter,
            <br />
            <span className="italic text-[#E15B3F]">qualified before check-in.</span>
          </h1>

          <p className="max-w-[280px] sm:max-w-md md:max-w-xl mx-auto text-sm md:text-lg text-[#0B1E3D]/70 mb-8 md:mb-14 animate-fadeUp [animation-delay:0.2s]">
            An AI desk that greets every enquiry, asks the right questions,
            and hands your team a ready student file — not a cold lead.
          </p>

          {/* BOARDING PASS CARD */}
          <div className="relative max-w-2xl mx-auto animate-fadeUp [animation-delay:0.3s]">
            <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(11,30,61,0.35)] border border-[#0B1E3D]/10 overflow-hidden">

              <div className="flex items-center justify-between px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 gap-2">
                <div className="text-left">
                  <p className="font-mono text-[8px] md:text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Origin</p>
                  <p className="font-display text-xl md:text-3xl">NPL</p>
                </div>

                <div className="relative flex-1 mx-3 md:mx-6 h-5 md:h-6">
                  <svg viewBox="0 0 200 24" className="w-full h-full overflow-visible">
                    <line
                      x1="0" y1="12" x2="200" y2="12"
                      stroke="#0B1E3D" strokeOpacity="0.25" strokeWidth="1.5"
                      strokeDasharray="6 6"
                    />
                  </svg>
                  <div className="absolute top-1/2 -translate-y-1/2 text-base md:text-lg animate-flyPlane">✈️</div>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[8px] md:text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Destination</p>
                  <p className="font-display text-xl md:text-3xl">SYD</p>
                </div>
              </div>

              <div className="border-t border-dashed border-[#0B1E3D]/15 mx-4 md:mx-6"></div>

              <div className="grid grid-cols-3 gap-2 md:gap-4 px-4 md:px-8 py-5 md:py-6 text-left">
                <div>
                  <p className="font-mono text-[8px] md:text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Program</p>
                  <p className="font-medium text-xs md:text-base mt-1">Master of IT</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] md:text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Intake</p>
                  <p className="font-medium text-xs md:text-base mt-1">July 2027</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] md:text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Status</p>
                  <p className="font-medium text-xs md:text-base mt-1 text-[#1F8A5F]">Qualified</p>
                </div>
              </div>

              {/* stamp — repositioned to avoid overlap on small screens */}
              <div className="flex justify-end px-4 pb-4 md:hidden">
                <div className="animate-stampIn border-[3px] border-[#C9973E] text-[#C9973E] rounded-full w-16 h-16 flex items-center justify-center text-center font-mono text-[8px] font-medium tracking-wider uppercase leading-tight">
                  Enquiry<br/>Received
                </div>
              </div>

              <div className="hidden md:block absolute right-8 top-20">
                <div className="animate-stampIn border-[3px] border-[#C9973E] text-[#C9973E] rounded-full w-24 h-24 flex items-center justify-center text-center font-mono text-xs font-medium tracking-wider uppercase leading-tight">
                  Enquiry<br/>Received
                </div>
              </div>

            </div>
          </div>

          {/* Mobile CTA to jump to chat */}
          <MobileScrollButton />

        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-[#0B1E3D] text-[#F7F1E4] px-4 md:px-6 py-8 md:py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-3 md:gap-10 text-center">
          <div>
            <p className="font-display text-xl sm:text-2xl md:text-4xl text-[#C9973E]">24/7</p>
            <p className="font-mono text-[8px] md:text-xs tracking-widest uppercase mt-1 md:mt-2 text-[#F7F1E4]/60">Desk coverage</p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl md:text-4xl text-[#C9973E]">5</p>
            <p className="font-mono text-[8px] md:text-xs tracking-widest uppercase mt-1 md:mt-2 text-[#F7F1E4]/60">Qualifying questions</p>
          </div>
          <div>
            <p className="font-display text-xl sm:text-2xl md:text-4xl text-[#C9973E]">0</p>
            <p className="font-mono text-[8px] md:text-xs tracking-widest uppercase mt-1 md:mt-2 text-[#F7F1E4]/60">Enquiries missed</p>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="px-4 md:px-6 py-14 md:py-24 max-w-5xl mx-auto">
        <p className="font-mono text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#C9973E] text-center mb-3 md:mb-4">
          Boarding Sequence
        </p>
        <h2 className="font-display text-2xl md:text-4xl text-center mb-10 md:mb-16 px-4">
          From first message to booked consultation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 relative">
          {[
            { gate: "01", label: "Enquire", desc: "Student opens chat, describes their goal in their own words." },
            { gate: "02", label: "Qualify", desc: "AI asks country, education, course and intake — no form fatigue." },
            { gate: "03", label: "Consult", desc: "Lead is saved and routed to your team, ready to review." },
            { gate: "04", label: "Depart", desc: "Agency follows up with a warm, informed conversation." },
          ].map((step) => (
            <div key={step.gate} className="text-left">
              <p className="font-mono text-xs md:text-sm text-[#C9973E] mb-2 md:mb-3">Gate {step.gate}</p>
              <p className="font-display text-lg md:text-xl mb-2">{step.label}</p>
              <p className="text-sm text-[#0B1E3D]/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CHAT */}
      <section id="chat" className="bg-[#0B1E3D] px-4 md:px-6 py-14 md:py-24 scroll-mt-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#C9973E] text-center mb-3 md:mb-4">
            Try The Desk
          </p>
          <h2 className="font-display text-2xl md:text-4xl text-center text-[#F7F1E4] mb-8 md:mb-12 px-2">
            Say hello, see it qualify a student live
          </h2>

          <ChatWindow />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 md:px-6 py-8 md:py-10 text-center">
        <p className="font-mono text-[9px] md:text-xs text-[#0B1E3D]/40 tracking-widest uppercase">
          AgentOS — Built for migration & education agencies
        </p>
      </footer>

    </main>
  );
}