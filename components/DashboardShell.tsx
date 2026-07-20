"use client";

import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/Sidebar";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  country: string;
  destination: string;
  education: string;
  course: string;
  intake: string;
  contact: string;
  notes: string;
}

const FLAGS: Record<string, string> = {
  nepal: "🇳🇵", india: "🇮🇳", pakistan: "🇵🇰", bangladesh: "🇧🇩",
  "sri lanka": "🇱🇰", china: "🇨🇳", vietnam: "🇻🇳", philippines: "🇵🇭",
  indonesia: "🇮🇩", nigeria: "🇳🇬", kenya: "🇰🇪", "south korea": "🇰🇷",
  japan: "🇯🇵", thailand: "🇹🇭", malaysia: "🇲🇾", brazil: "🇧🇷",
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

function flagFor(country: string) {
  if (!country) return "🌍";
  return FLAGS[country.trim().toLowerCase()] || "🌍";
}

function destFor(destination: string) {
  if (!destination) return { code: "—", flag: "🌍" };
  const key = destination.trim().toLowerCase();
  return DEST_INFO[key] || { code: destination.slice(0, 3).toUpperCase(), flag: "🌍" };
}

function initials(name: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 800;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

function BoardingPassPanel({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const flag = flagFor(lead.country);
  const dest = destFor(lead.destination);
  const qualified = Boolean(lead.country && lead.course);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-[#0B1E3D]/60 animate-[fadeIn_0.2s_ease-out]" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-[#F7F1E4] h-full overflow-y-auto animate-[fadeIn_0.3s_ease-out] shadow-2xl">

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#0B1E3D]/10">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[#C9973E]">Student File</p>
          <button onClick={onClose} className="text-[#0B1E3D]/50 hover:text-[#0B1E3D] text-xl leading-none">✕</button>
        </div>

        <div className="px-6 py-8">

          <div className="relative bg-white rounded-2xl border border-[#0B1E3D]/10 shadow-lg overflow-hidden">

            <div className="flex items-center justify-between px-7 pt-7 pb-5">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Origin</p>
                <p className="font-display text-3xl text-[#0B1E3D]">{flag}</p>
                <p className="font-mono text-xs text-[#0B1E3D]/60 mt-1">{lead.country || "Unknown"}</p>
              </div>

              <div className="relative flex-1 mx-4 h-4">
                <svg viewBox="0 0 200 16" className="w-full h-full overflow-visible">
                  <line x1="0" y1="8" x2="200" y2="8" stroke="#0B1E3D" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="5 5" />
                </svg>
                <div className="absolute top-1/2 -translate-y-1/2 text-sm animate-flyPlane">✈️</div>
              </div>

              <div className="text-right">
                <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Destination</p>
                <p className="font-display text-3xl text-[#0B1E3D]">{dest.flag}</p>
                <p className="font-mono text-xs text-[#0B1E3D]/60 mt-1">{lead.destination || "Not chosen yet"}</p>
              </div>
            </div>

            <div className="border-t border-dashed border-[#0B1E3D]/15 mx-6"></div>

            <div className="px-7 py-6 space-y-5">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Student</p>
                <p className="font-display text-2xl text-[#0B1E3D] mt-1">{lead.name || "Not provided yet"}</p>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Education</p>
                  <p className="mt-1 text-[#0B1E3D]">{lead.education || "—"}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Course</p>
                  <p className="mt-1 text-[#0B1E3D]">{lead.course || "—"}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Intake</p>
                  <p className="mt-1 text-[#0B1E3D]">{lead.intake || "—"}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Contact</p>
                  <p className="mt-1 text-[#0B1E3D]">{lead.contact || "—"}</p>
                </div>
              </div>

              {lead.notes && (
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#0B1E3D]/40 uppercase">Notes</p>
                  <p className="mt-1 text-[#0B1E3D]/80 text-sm leading-relaxed">{lead.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className={
                  "inline-block px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider " +
                  (qualified ? "bg-[#1F8A5F]/10 text-[#1F8A5F]" : "bg-[#C9973E]/10 text-[#C9973E]")
                }>
                  {qualified ? "Qualified" : "New Enquiry"}
                </span>
                <p className="font-mono text-[10px] text-[#0B1E3D]/40">{timeAgo(lead.created_at)}</p>
              </div>
            </div>

            <div className="absolute -right-2 top-16">
              <div className="animate-stampIn border-[3px] border-[#C9973E] text-[#C9973E] rounded-full w-20 h-20 flex items-center justify-center text-center font-mono text-[10px] font-medium tracking-wider uppercase leading-tight">
                {qualified ? "Qualified" : "Received"}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function DashboardShell({ leads, error }: { leads: Lead[]; error?: string }) {

  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "qualified" | "new">("all");

  const filtered = useMemo(() => {
    let result = leads;

    if (statusFilter === "qualified") {
      result = result.filter(l => l.country && l.course);
    } else if (statusFilter === "new") {
      result = result.filter(l => !(l.country && l.course));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        (l.name || "").toLowerCase().includes(q) ||
        (l.country || "").toLowerCase().includes(q) ||
        (l.course || "").toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, leads, statusFilter]);

  const totalLeads = leads.length;

  const thisWeek = leads.filter(l => {
    const created = new Date(l.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created >= weekAgo;
  }).length;

  const countryCounts: Record<string, number> = {};
  leads.forEach(l => {
    if (l.country) countryCounts[l.country] = (countryCounts[l.country] || 0) + 1;
  });
  const topCountry = Object.entries(countryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const qualifiedCount = leads.filter(l => l.country && l.course).length;

  function exportToCSV() {
    const headers = ["Name", "Country", "Destination", "Education", "Course", "Intake", "Contact", "Notes", "Created At"];

    const rows = filtered.map(l => [
      l.name, l.country, l.destination, l.education, l.course, l.intake, l.contact, l.notes, l.created_at
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${(field || "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen bg-[#F7F1E4]">

      <Sidebar />

      <main className="flex-1 px-10 py-10">

        <div className="flex items-center justify-between mb-10 animate-fadeUp">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#C9973E] mb-2">Leads Manifest</p>
            <h1 className="font-display text-4xl text-[#0B1E3D]">Every enquiry, ready to board</h1>
          </div>
        </div>

        {error && (
          <p className="text-[#E15B3F] mb-6 font-mono text-sm">Error loading leads: {error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
          {[
            { label: "Total Enquiries", value: totalLeads },
            { label: "This Week", value: thisWeek },
            { label: "Qualified", value: qualifiedCount },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-[#0B1E3D]/10 px-6 py-6 animate-fadeUp"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#0B1E3D]/40 mb-2">{stat.label}</p>
              <p className="font-display text-4xl text-[#0B1E3D]">
                <CountUp value={stat.value} />
              </p>
            </div>
          ))}

          <div
            className="bg-[#0B1E3D] rounded-2xl px-6 py-6 animate-fadeUp"
            style={{ animationDelay: "0.24s" }}
          >
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#F7F1E4]/40 mb-2">Top Origin</p>
            <p className="font-display text-2xl text-[#C9973E] flex items-center gap-2">
              {flagFor(topCountry)} {topCountry}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 animate-fadeUp flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, country or course..."
            className="w-full max-w-md bg-white border border-[#0B1E3D]/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9973E]/50"
          />

          <div className="flex gap-2 items-center">
            {[
              { key: "all", label: "All" },
              { key: "qualified", label: "Qualified" },
              { key: "new", label: "New" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key as any)}
                className={
                  "px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors " +
                  (statusFilter === tab.key
                    ? "bg-[#0B1E3D] text-[#F7F1E4]"
                    : "bg-white text-[#0B1E3D]/50 border border-[#0B1E3D]/10 hover:text-[#0B1E3D]")
                }
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider bg-[#C9973E] text-[#0B1E3D] hover:bg-[#d9a94f] transition-colors ml-2"
            >
              ⬇ Export CSV
            </button>
          </div>

        </div>

        <div className="bg-white rounded-2xl border border-[#0B1E3D]/10 overflow-hidden animate-fadeUp" style={{ animationDelay: "0.36s" }}>

          <div className="grid grid-cols-[0.6fr_1.4fr_1.3fr_1.2fr_1fr_0.9fr_0.9fr] gap-4 px-6 py-4 bg-[#0B1E3D] text-[#F7F1E4]/60 font-mono text-[10px] tracking-widest uppercase">
            <span>Student</span>
            <span>Route</span>
            <span>Course</span>
            <span>Intake</span>
            <span>Status</span>
            <span>Queued</span>
            <span></span>
          </div>

          {filtered.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-display text-xl text-[#0B1E3D]/50 mb-2">No enquiries yet</p>
              <p className="text-sm text-[#0B1E3D]/40">New conversations from the desk will appear here automatically.</p>
            </div>
          )}

          {filtered.map((lead, i) => {
            const qualified = Boolean(lead.country && lead.course);
            const dest = destFor(lead.destination);
            return (
              <button
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="w-full grid grid-cols-[0.6fr_1.4fr_1.3fr_1.2fr_1fr_0.9fr_0.9fr] gap-4 px-6 py-4 border-t border-dashed border-[#0B1E3D]/10 hover:bg-[#F7F1E4]/60 transition-colors text-sm text-[#0B1E3D] text-left animate-fadeUp"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.6)}s` }}
              >
                <span className="w-8 h-8 rounded-full bg-[#0B1E3D] text-[#C9973E] flex items-center justify-center font-mono text-[10px] font-medium">
                  {initials(lead.name)}
                </span>

                <span className="flex items-center gap-2 text-[#0B1E3D]/80">
                  <span>{flagFor(lead.country)}</span>
                  <span className="font-mono text-xs text-[#0B1E3D]/40">{lead.country ? lead.country.slice(0, 3).toUpperCase() : "—"}</span>
                  <span className="text-[#0B1E3D]/20">···✈···</span>
                  <span className="font-mono text-xs text-[#0B1E3D]/40">{dest.code}</span>
                  <span>{dest.flag}</span>
                </span>

                <span className="text-[#0B1E3D]/70 truncate">{lead.course || "—"}</span>
                <span className="text-[#0B1E3D]/70">{lead.intake || "—"}</span>

                <span>
                  <span className={
                    "inline-block px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider " +
                    (qualified ? "bg-[#1F8A5F]/10 text-[#1F8A5F]" : "bg-[#C9973E]/10 text-[#C9973E]")
                  }>
                    {qualified ? "Qualified" : "New"}
                  </span>
                </span>

                <span className="font-mono text-xs text-[#0B1E3D]/40">{timeAgo(lead.created_at)}</span>

                <span className="text-[#0B1E3D]/30 text-right">→</span>
              </button>
            );
          })}

        </div>

      </main>

      {selectedLead && (
        <BoardingPassPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}

    </div>
  );
}