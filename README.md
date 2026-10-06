# portfolio repo

housing all my portfolio drafts until i find a good one :3

## structure

| path | what |
| ---- | ---- |
| `/` | redirect stub → `/nav/` |
| `/nav/` | the navigation site (plain list of styles + per-style component breakdowns) |
| `/cool/` | style 01 — dark "build break fix" dev-os vibe (three.js hero, terminals, persona demo) |

## add a new style

1. create `/your-style/` with its own `index.html` (+ assets, self-contained, relative paths only)
2. link back to the hub: `<a href="../nav/">← all styles</a>`
3. add a `.style-block` entry in `nav/index.html` with a `<ul class="feat-grid">` component list
4. commit + push to `main` → deploys automatically via github actions

## local preview

```bash
python3 -m http.server 8000
# hub  → http://localhost:8000/nav/
# cool → http://localhost:8000/cool/
```
