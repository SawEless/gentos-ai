export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0B1E3D] text-[#F7F1E4] flex flex-col shrink-0 min-h-screen">
      <div className="px-6 py-8 border-b border-[#F7F1E4]/10">
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#C9973E]">AgentOS</p>
        <p className="font-display text-xl mt-1">Control Tower</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <a href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#F7F1E4]/10 text-[#F7F1E4] text-sm font-medium">
          <span>📋</span> Leads Manifest
        </a>
        <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#F7F1E4]/60 text-sm hover:bg-[#F7F1E4]/5 hover:text-[#F7F1E4] transition-colors">
          <span>💬</span> Enquiry Desk
        </a>
      </nav>

      <div className="px-6 py-6 border-t border-[#F7F1E4]/10">
        <p className="font-mono text-[10px] text-[#F7F1E4]/30 tracking-widest uppercase">v0.1 — Demo Build</p>
      </div>
    </aside>
  );
}