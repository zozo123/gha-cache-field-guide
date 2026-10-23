# CI Caching Is Not One Cache

A one-page field guide from a June 2026 proof of concept by [Yossi Eliaz](https://zozo123.github.io/): which cache layer speeds up GitHub Actions on fresh, warm, or touched runners. Live page: https://zozo123.github.io/gha-cache-field-guide/

Disclosure: Incredibuild Build Cache and Islo are products of my employer (Incredibuild / islo.dev). The timings on the page come from POC runs, not a controlled benchmark; runner details and logs are not published in this repo.

It compares:

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

## Findings

Native caches are best when the same workspace is already warm. Incredibuild
Build Cache is strongest when GitHub Actions runners are fresh, ephemeral, or
invalidated by timestamp churn, because it restores compiler artifacts across
jobs and runners.

This is not a universal "IB beats every cache" story. It is a practical
comparison: C/C++ and Rust are strong Incredibuild candidates; Go, Docker, and
JavaScript usually want native/tool-specific caches first.

Docker note: BuildKit cache is the right Docker acceleration layer. A cold build
of the full upstream `moby/buildkit` Dockerfile hit a BuildKit stream error, so
the page shows only its warm retry, next to a separate BuildKit control build.

## Links

- GitHub Actions: https://docs.github.com/en/actions
- Blacksmith: https://www.blacksmith.sh/
- Incredibuild CI/CD acceleration: https://www.incredibuild.com/solutions/ci-cd-acceleration
- Islo: https://islo.dev
