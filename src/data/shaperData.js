export const metadata = {
  dataset_title: "HarfBuzz public repository inventory for IDLI",
  repository: "harfbuzz/harfbuzz",
  repository_url: "https://github.com/harfbuzz/harfbuzz",
  commit_sha: "907579859f604633ad511f2f49fa0299d799d9b8",
  commit_date: "2026-07-10T07:59:59Z",
  repository_file_count: 3729,
  test_file_count: 2984,
  data_candidate_file_count: 2280,
  shaper_source_file_count: 30,
  methodological_note:
    "Detected shapers are inferred from repository source filenames. They are evidence about HarfBuzz implementation modules, not a language-level support claim. Actual shaping depends on script, font tables, input text, direction, language tag, features, and build.",
};

export const shapers = [
  {
    name: "arabic",
    family: "Arabic",
    description: "Dedicated complex shaper for Arabic script and related writing systems (including fallback, joining, PUA, and legacy encodings).",
    related_scripts: ["Arabic", "N'Ko", "Syriac", "Mongolian"],
    complexity: "High",
    files: [
      { path: "src/hb-ot-shaper-arabic.cc", size: 25541 },
      { path: "src/hb-ot-shaper-arabic.hh", size: 1648 },
      { path: "src/hb-ot-shaper-arabic-fallback.hh", size: 13157 },
      { path: "src/hb-ot-shaper-arabic-joining-list.hh", size: 1076 },
      { path: "src/hb-ot-shaper-arabic-pua.hh", size: 7541 },
      { path: "src/hb-ot-shaper-arabic-table.hh", size: 21859 },
      { path: "src/hb-ot-shaper-arabic-win1256.hh", size: 9674 },
    ],
  },
  {
    name: "indic",
    family: "Indic",
    description: "Complex shaper covering major Indic scripts with dedicated state machines and tables.",
    related_scripts: ["Devanagari", "Bengali", "Gujarati", "Gurmukhi", "Kannada", "Malayalam", "Oriya", "Tamil", "Telugu"],
    complexity: "Very High",
    files: [
      { path: "src/hb-ot-shaper-indic.cc", size: 51073 },
      { path: "src/hb-ot-shaper-indic.hh", size: 1717 },
      { path: "src/hb-ot-shaper-indic-machine.hh", size: 43893 },
      { path: "src/hb-ot-shaper-indic-machine.rl", size: 4399 },
      { path: "src/hb-ot-shaper-indic-table.cc", size: 11637 },
    ],
  },
  {
    name: "use",
    family: "Universal Shaping Engine",
    description: "Generalized complex script shaper (USE) that covers many scripts without a dedicated model.",
    related_scripts: ["Many complex scripts not covered by dedicated shapers"],
    complexity: "Very High",
    files: [
      { path: "src/hb-ot-shaper-use.cc", size: 14493 },
      { path: "src/hb-ot-shaper-use-machine.hh", size: 37116 },
      { path: "src/hb-ot-shaper-use-machine.rl", size: 9115 },
      { path: "src/hb-ot-shaper-use-table.hh", size: 55727 },
    ],
  },
  {
    name: "khmer",
    family: "Khmer",
    description: "Dedicated shaper for Khmer script with state machine support.",
    related_scripts: ["Khmer"],
    complexity: "High",
    files: [
      { path: "src/hb-ot-shaper-khmer.cc", size: 10865 },
      { path: "src/hb-ot-shaper-khmer-machine.hh", size: 12157 },
      { path: "src/hb-ot-shaper-khmer-machine.rl", size: 3505 },
    ],
  },
  {
    name: "myanmar",
    family: "Myanmar",
    description: "Dedicated shaper for Myanmar (Burmese) script.",
    related_scripts: ["Myanmar"],
    complexity: "High",
    files: [
      { path: "src/hb-ot-shaper-myanmar.cc", size: 10808 },
      { path: "src/hb-ot-shaper-myanmar-machine.hh", size: 21456 },
      { path: "src/hb-ot-shaper-myanmar-machine.rl", size: 4363 },
    ],
  },
  {
    name: "thai",
    family: "Thai",
    description: "Shaper for Thai and related Southeast Asian scripts.",
    related_scripts: ["Thai", "Lao"],
    complexity: "Medium",
    files: [{ path: "src/hb-ot-shaper-thai.cc", size: 12157 }],
  },
  {
    name: "hangul",
    family: "Hangul",
    description: "Shaper for Korean Hangul syllable composition.",
    related_scripts: ["Hangul"],
    complexity: "Medium",
    files: [{ path: "src/hb-ot-shaper-hangul.cc", size: 13725 }],
  },
  {
    name: "hebrew",
    family: "Hebrew",
    description: "Shaper for Hebrew script.",
    related_scripts: ["Hebrew"],
    complexity: "Medium",
    files: [{ path: "src/hb-ot-shaper-hebrew.cc", size: 5816 }],
  },
  {
    name: "syllabic",
    family: "Syllabic",
    description: "Support for syllabic writing systems.",
    related_scripts: ["Various syllabic scripts"],
    complexity: "Medium",
    files: [
      { path: "src/hb-ot-shaper-syllabic.cc", size: 3533 },
      { path: "src/hb-ot-shaper-syllabic.hh", size: 1611 },
    ],
  },
  {
    name: "vowel-constraints",
    family: "Vowel Constraints",
    description: "Shared logic for vowel constraint handling across multiple shapers.",
    related_scripts: ["Shared across complex scripts"],
    complexity: "Medium",
    files: [
      { path: "src/hb-ot-shaper-vowel-constraints.cc", size: 11269 },
      { path: "src/hb-ot-shaper-vowel-constraints.hh", size: 1465 },
    ],
  },
  {
    name: "default",
    family: "Default",
    description: "Fallback shaper for simple scripts that do not require complex processing.",
    related_scripts: ["Latin", "Cyrillic", "Greek", "and other simple scripts"],
    complexity: "Low",
    files: [{ path: "src/hb-ot-shaper-default.cc", size: 2343 }],
  },
];

export function getGithubUrl(path) {
  return `https://github.com/harfbuzz/harfbuzz/blob/${metadata.commit_sha}/${path}`;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function getComplexityColor(level) {
  switch (level) {
    case "Very High":
      return "bg-red-100 text-red-800";
    case "High":
      return "bg-orange-100 text-orange-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-green-100 text-green-800";
  }
}
