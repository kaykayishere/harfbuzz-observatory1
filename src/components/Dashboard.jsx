import { useState } from "react";
import { metadata, shapers, getGithubUrl, formatBytes } from "../data/shaperData";

export default function Dashboard() {
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState({});

  const filtered = shapers.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.family.toLowerCase().includes(filter.toLowerCase())
  );

  const toggle = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            HarfBuzz Observatory
          </h1>
          <p className="mt-2 text-slate-600">
            Script coverage and implementation modules from the HarfBuzz text shaping engine
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Total Files" value={metadata.repository_file_count.toLocaleString()} />
          <MetricCard label="Shaper Modules" value={shapers.length} />
          <MetricCard label="Test Files" value={metadata.test_file_count.toLocaleString()} />
          <MetricCard label="Data Candidates" value={metadata.data_candidate_file_count.toLocaleString()} />
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
          <strong>Important:</strong> {metadata.methodological_note}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Filter by script or family..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-500">{filtered.length} shown</span>
        </div>

        {/* Shaper cards */}
        <div className="space-y-4">
          {filtered.map((shaper) => {
            const totalSize = shaper.files.reduce((sum, f) => sum + f.size, 0);
            const isOpen = expanded[shaper.name];

            return (
              <div
                key={shaper.name}
                className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(shaper.name)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition"
                >
                  <div>
                    <div className="font-semibold text-lg capitalize">{shaper.name}</div>
                    <div className="text-sm text-slate-500">{shaper.family}</div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-slate-600">{shaper.files.length} files</span>
                    <span className="text-slate-600">{formatBytes(totalSize)}</span>
                    <span className="text-slate-400">{isOpen ? "▲" : "▼"}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-5 py-3 bg-slate-50">
                    <ul className="space-y-1">
                      {shaper.files.map((f) => (
                        <li key={f.path} className="flex items-center justify-between text-sm">
                          <a
                            href={getGithubUrl(f.path)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline font-mono"
                          >
                            {f.path}
                          </a>
                          <span className="text-slate-500">{formatBytes(f.size)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center text-sm text-slate-400">
          Data from{" "}
          <a
            href={metadata.repository_url}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {metadata.repository}
          </a>{" "}
          @ {metadata.commit_sha.slice(0, 7)} · IDLI / SILICON
        </footer>
      </main>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}
