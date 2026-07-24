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
  const [expanded, setExpanded] = useState(null);

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

  const totalSourceSize = shapers.reduce(
    (sum, s) => sum + s.files.reduce((a, f) => a + f.size, 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F1E9D8] text-neutral-900">
      {/* Header */}
      <header className="border-b border-[#e0d4bc]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            HarfBuzz Observatory
          </h1>
          <p className="mt-2 text-neutral-600 max-w-2xl text-[15px] leading-relaxed">
            Every dedicated shaping module in HarfBuzz, organized by writing system.
            Evidence of implementation attention for complex scripts — not a language support claim.
          </p>

          {/* Compact stats row */}
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div>
              <span className="text-neutral-500">Modules</span>{" "}
              <span className="font-medium tabular-nums">{shapers.length}</span>
            </div>
            <div>
              <span className="text-neutral-500">Source files</span>{" "}
              <span className="font-medium tabular-nums">{metadata.shaper_source_file_count}</span>
            </div>
            <div>
              <span className="text-neutral-500">Repo files</span>{" "}
              <span className="font-medium tabular-nums">{metadata.repository_file_count.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-neutral-500">Test files</span>{" "}
              <span className="font-medium tabular-nums">{metadata.test_file_count.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-neutral-500">Source size</span>{" "}
              <span className="font-medium tabular-nums">{formatBytes(totalSourceSize)}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-6 flex items-center gap-4">
          <input
            type="search"
            placeholder="Filter by script, family, or related writing system…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md px-3.5 py-2 text-sm border border-[#d4c6a8] rounded-md bg-[#faf6ed] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent"
          />
          <span className="text-sm text-neutral-500 tabular-nums shrink-0">
            {filtered.length} shown
          </span>
        </div>

        {/* Table-like list */}
        <div className="border border-[#d4c6a8] rounded-lg overflow-hidden bg-[#faf6ed]">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2.5 bg-[#efe6d2] border-b border-[#d4c6a8] text-xs font-medium text-neutral-500 uppercase tracking-wide">
            <div className="col-span-3">Module</div>
            <div className="col-span-2">Family</div>
            <div className="col-span-2">Complexity</div>
            <div className="col-span-2 text-right">Files</div>
            <div className="col-span-2 text-right">Size</div>
            <div className="col-span-1"></div>
          </div>

          {filtered.map((shaper, idx) => {
            const totalSize = shaper.files.reduce((sum, f) => sum + f.size, 0);
            const isOpen = expanded === shaper.name;

            return (
              <div key={shaper.name} className={idx !== 0 ? "border-t border-[#e5d9c4]" : ""}>
                <button
                  onClick={() => setExpanded(isOpen ? null : shaper.name)}
                  className="w-full text-left px-4 py-3.5 hover:bg-[#f3ead8] transition-colors"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center">
                    <div className="sm:col-span-3">
                      <span className="font-medium capitalize">{shaper.name}</span>
                    </div>
                    <div className="sm:col-span-2 text-sm text-neutral-500">
                      {shaper.family}
                    </div>
                    <div className="sm:col-span-2">
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${getComplexityColor(
                          shaper.complexity
                        )}`}
                      >
                        {shaper.complexity}
                      </span>
                    </div>
                    <div className="sm:col-span-2 sm:text-right text-sm tabular-nums text-neutral-600">
                      {shaper.files.length}
                    </div>
                    <div className="sm:col-span-2 sm:text-right text-sm tabular-nums text-neutral-600">
                      {formatBytes(totalSize)}
                    </div>
                    <div className="sm:col-span-1 sm:text-right text-neutral-400 text-sm">
                      {isOpen ? "−" : "+"}
                    </div>
                  </div>

                  <p className="mt-1.5 text-sm text-neutral-500 sm:hidden line-clamp-2">
                    {shaper.description}
                  </p>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 bg-[#f3ead8] border-t border-[#e5d9c4]">
                    <p className="text-sm text-neutral-600 pt-3 pb-3 leading-relaxed">
                      {shaper.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {shaper.related_scripts.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-[#F1E9D8] border border-[#d4c6a8] text-neutral-600 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-1">
                      {shaper.files.map((f) => (
                        <div
                          key={f.path}
                          className="flex items-center justify-between gap-3 text-sm py-1"
                        >
                          <a
                            href={getGithubUrl(f.path)}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[13px] text-blue-700 hover:underline truncate"
                          >
                            {f.path}
                          </a>
                          <span className="text-neutral-500 tabular-nums shrink-0 text-xs">
                            {formatBytes(f.size)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="px-4 py-16 text-center text-sm text-neutral-400">
              No modules match “{filter}”
            </div>
          )}
        </div>

        {/* Note */}
        <p className="mt-6 text-xs text-neutral-500 leading-relaxed max-w-3xl">
          {metadata.methodological_note}
        </p>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-[#e0d4bc] text-xs text-neutral-500">
          Data from{" "}
          <a
            href={metadata.repository_url}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-neutral-700"
          >
            {metadata.repository}
          </a>{" "}
          @ {metadata.commit_sha.slice(0, 7)} · IDLI / SILICON
        </footer>
      </main>
    </div>
  );
}
