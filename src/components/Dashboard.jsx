import { useState, useMemo } from "react";
import {
  metadata,
  shapers,
  getGithubUrl,
  formatBytes,
  getComplexityColor,
} from "../data/shaperData";

export default function Dashboard() {
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState({});

  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return shapers;
    return shapers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.family.toLowerCase().includes(q) ||
        s.related_scripts.some((r) => r.toLowerCase().includes(q)) ||
        s.description.toLowerCase().includes(q)
    );
  }, [filter]);

  const toggle = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const totalSourceSize = shapers.reduce(
    (sum, s) => sum + s.files.reduce((a, f) => a + f.size, 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                HarfBuzz Observatory
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Script-based implementation modules of the HarfBuzz text shaping engine
              </p>
            </div>
            <a
              href={metadata.repository_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-slate-600 underline shrink-0 mt-1"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8 space-y-8">
        {/* Metrics */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Metric label="Repo Files" value={metadata.repository_file_count.toLocaleString()} />
          <Metric label="Shaper Modules" value={shapers.length} />
          <Metric label="Test Files" value={metadata.test_file_count.toLocaleString()} />
          <Metric label="Source Size" value={formatBytes(totalSourceSize)} />
        </section>

        {/* Why this matters */}
        <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-slate-900">Why this matters for digital language inclusion</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            HarfBuzz is the open-source engine that correctly shapes complex writing systems on most of the world’s devices (Chrome, Firefox, Android, LibreOffice, etc.). 
            Scripts that only have a generic “default” path receive far less specialized handling than those with dedicated complex shapers (Arabic, Indic, USE, Khmer, Myanmar…). 
            This observatory surfaces the actual implementation modules so we can see which writing systems receive dedicated engineering attention.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 leading-relaxed">
            <strong>Note:</strong> {metadata.methodological_note}
          </div>
        </section>

        {/* Filter */}
        <section className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="text"
            placeholder="Filter by script, family, or related writing system…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-sm text-slate-500 shrink-0">
            {filtered.length} of {shapers.length} modules
          </span>
        </section>

        {/* Cards */}
        <section className="space-y-3">
          {filtered.map((shaper) => {
            const totalSize = shaper.files.reduce((sum, f) => sum + f.size, 0);
            const isOpen = expanded[shaper.name];

            return (
              <article
                key={shaper.name}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(shaper.name)}
                  className="w-full text-left px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900 capitalize text-lg">
                          {shaper.name}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${getComplexityColor(
                            shaper.complexity
                          )}`}
                        >
                          {shaper.complexity}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{shaper.family}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 shrink-0">
                      <span>{shaper.files.length} files</span>
                      <span>{formatBytes(totalSize)}</span>
                      <span className="text-slate-400">{isOpen ? "▲" : "▼"}</span>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-slate-600 leading-snug">
                    {shaper.description}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {shaper.related_scripts.map((s) => (
                      <span
                        key={s}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
                    <ul className="space-y-1.5">
                      {shaper.files.map((f) => (
                        <li
                          key={f.path}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <a
                            href={getGithubUrl(f.path)}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-blue-600 hover:underline truncate"
                          >
                            {f.path}
                          </a>
                          <span className="text-slate-500 shrink-0">
                            {formatBytes(f.size)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No modules match “{filter}”
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-4 pb-8 text-center text-xs text-slate-400">
          Data from{" "}
          <a
            href={metadata.repository_url}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-slate-600"
          >
            {metadata.repository}
          </a>{" "}
          @ {metadata.commit_sha.slice(0, 7)} · IDLI / SILICON Week 4
        </footer>
      </main>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-4 shadow-sm">
      <div className="text-xs text-slate-500 font-medium">{label}</div>
      <div className="mt-1 text-xl font-bold text-slate-900 tabular-nums">{value}</div>
    </div>
  );
}
