# CI Caching Is Not One Cache

Concise MVP POC microsite comparing what to use when accelerating GitHub Actions:

- native dependency/build caches for already-warm state,
- Incredibuild's proprietary Build Cache / CI-CD acceleration for fresh or dirty compiler work,
- BuildKit cache for Docker,
- disposable Islo runners as the clean-runner substrate.

The site is intentionally static so it can be published with GitHub Pages without
a build step.

## Run Locally

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Publish

Push this repo to GitHub and enable Pages from the repository root, or serve the
folder from any static host.

## Message

Native caches are best when the same workspace is already warm. Incredibuild
Build Cache is strongest when GitHub Actions runners are fresh, ephemeral, or
invalidated by timestamp churn, because it restores compiler artifacts across
jobs and runners.

This is not a universal "IB beats every cache" story. It is a practical
comparison: C/C++ and Rust are strong Incredibuild candidates; Go, Docker, and
JavaScript usually want native/tool-specific caches first.

Docker note: BuildKit cache is the right Docker acceleration layer. Alpine TLS
no longer reproduces in the Islo sandbox; the full upstream `moby/buildkit` cold
Dockerfile still hits a BuildKit stream issue, so the demo should use a
controlled app Dockerfile.

## Links

- GitHub Actions: https://docs.github.com/en/actions
- Blacksmith: https://www.blacksmith.sh/
- Incredibuild CI/CD acceleration: https://www.incredibuild.com/solutions/ci-cd-acceleration
- Islo: https://islo.dev
