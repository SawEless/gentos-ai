"use client";

import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#0B1E3D] flex items-center justify-between px-4 border-b border-[#F7F1E4]/10">
        <div>
          <p className="font-mono text-[9px] tracking-widest uppercase text-[#C9973E]">AgentOS</p>
          <p className="font-display text-sm text-[#F7F1E4] -mt-0.5">Control Tower</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-[#F7F1E4] p-2"
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Backdrop for mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1E3D] text-[#F7F1E4] flex flex-col shrink-0 min-h-screen transition-transform duration-300 ease-in-out " +
          (open ? "translate-x-0" : "-translate-x-full") +
          " md:translate-x-0 md:static md:z-auto"
        }
      >
        <div className="px-6 py-8 border-b border-[#F7F1E4]/10 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#C9973E]">AgentOS</p>
            <p className="font-display text-xl mt-1">Control Tower</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-[#F7F1E4]/60 text-2xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
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
    </>
  );
}