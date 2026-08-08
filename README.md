# fastdemo portfolio

Small React/Vite portfolio scaffold inspired by the supplied references.

## Run locally

```bash
npm install
npm run dev
```

## Add a project

Edit the `projects` array at the top of `src/main.jsx`. Each project supports:

- `name`
- `type`
- `description`
- `tone` (`orange`, `blue`, `pink`, or `green`)
- `href`

The music control currently opens a Spotify search for “Salad Days” by Mac DeMarco. A licensed direct audio URL can be added as a `<source>` inside `MusicPlayer` later if you want native in-page playback.
