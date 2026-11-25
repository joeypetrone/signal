# Signal

A short top-down exploration game. Dot, a small repair rover, drives across a Martian crater to find Scout, a survey robot that went quiet three days ago.

Built with Phaser 4 and Vite. Native resolution is 320×180, scaled by whole numbers.

## Run

```sh
npm install
npm run dev
```

`npm run build` outputs to `dist/signal/`. `npm run deploy` builds and ships to Firebase Hosting, where the game is served at `play.joeydev.net/signal/` and the site root redirects there.

## Layout

```
src/
  main.js          game config
  constants.js     resolution, scene keys, palette
  scenes/          Boot, Title, Crater, Ending
  display/         integer scaling
  ui/              shared UI pieces
  debug/           dev-only helpers (stripped from production builds)
```

Design notes live in [SIGNAL_DESIGN.md](SIGNAL_DESIGN.md). Outside assets and their licenses are listed in [CREDITS.md](CREDITS.md).

## License

The code is released under the [MIT License](LICENSE). The original art, sound, and music are © Joey Petrone, all rights reserved. Outside assets keep their own licenses, listed in CREDITS.md.
