# portfolio repo

housing all my portfolio drafts until i find a good one :3

## structure

| path | what |
| ---- | ---- |
| `/` | the navigation site (plain list of styles + per-style component breakdowns) |
| `/cool/` | style 01 — dark "build break fix" dev-os vibe (three.js hero, terminals, persona demo) |
| `/minimal/` | style 02 — strict black & white minimalism (space grotesk, system theme, verbatim copy) |

## add a new style (one session = one style)

1. create `/your-style/` with its own `index.html` (+ assets, self-contained, relative paths only)
2. style `<head>`: title `portfolio repo / <name>`, favicon from the template in AGENTS.md, meta description
3. link back to the hub: `<a href="../">← all styles</a>` (nav + footer)
4. add a `.style-block` entry in hub `index.html` between the STYLES markers (description + component list)
5. verify locally, commit + push to `main` → deploys automatically via github actions

## local preview

```bash
python3 -m http.server 8000
# hub  → http://localhost:8000/
# cool → http://localhost:8000/cool/
```
