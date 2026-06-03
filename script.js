const language = document.querySelector("#language");
const runnerState = document.querySelector("#runnerState");
const verdictTitle = document.querySelector("#verdictTitle");
const verdictText = document.querySelector("#verdictText");

const matrix = {
  cpp: {
    fresh: ["IB Build Cache", "Heavy C/C++ compiler graphs produced the largest measured wins: RocksDB 263s to 14s, DuckDB 293s to 16s."],
    warm: ["native object cache + IB", "If the workspace is truly warm, native object caches can help. For fresh CI, keep IB as the cross-run compiler artifact layer."],
    dirty: ["IB Build Cache", "Dirty timestamps are exactly where content-addressed compiler artifacts are useful."],
  },
  rust: {
    fresh: ["IB Build Cache + Cargo registry", "Tokio moved 46s to 13s on a fresh restored runner. Keep dependency caches too."],
    warm: ["Cargo target cache", "If the same target directory is warm and unchanged, Cargo can be effectively instant."],
    dirty: ["IB Build Cache", "Tokio after touch: Cargo warm took 38s, IB restored took 13s."],
  },
  java: {
    fresh: ["Maven/Gradle cache first", "IB is selective. It looked positive only when Maven forked real javac on a large compile surface."],
    warm: ["Maven .m2 / Gradle cache", "Most JVM CI wins come from dependency and Gradle/Maven build caches before compiler artifact caching."],
    dirty: ["candidate: forked javac + IB", "Worth testing for large Maven builds that fork external javac. Avoid broad claims until measured."],
  },
  go: {
    fresh: ["GOCACHE + GOMODCACHE", "Go showed no target IB payload growth. Native Go cache is the correct acceleration layer."],
    warm: ["GOCACHE", "The Go cache is designed for this; in our act run, native warm was effectively 0s."],
    dirty: ["GOCACHE", "Go's content-aware native cache remains the first answer."],
  },
  js: {
    fresh: ["package + build-tool cache", "Use npm/pnpm/yarn cache, node_modules, tsbuildinfo, and bundler caches. IB attribution was weak."],
    warm: ["tsbuildinfo / bundler cache", "JavaScript and TypeScript wins come from tool-native incremental state."],
    dirty: ["tool-native incremental cache", "Measure tsc and bundler cache behavior directly. Do not lead with IB here."],
  },
  docker: {
    fresh: ["BuildKit cache", "Docker acceleration is about image layers and cache mounts, not IB compiler artifacts."],
    warm: ["BuildKit local/registry cache", "Use cache-from/cache-to with local or registry-backed cache."],
    dirty: ["BuildKit cache", "Layer cache invalidation rules decide the result. Keep IB out of the Docker claim."],
  },
};

function updateVerdict() {
  const [title, text] = matrix[language.value][runnerState.value];
  verdictTitle.textContent = title;
  verdictText.textContent = text;
}

language.addEventListener("change", updateVerdict);
runnerState.addEventListener("change", updateVerdict);
updateVerdict();
