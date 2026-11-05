# Reels-mall v3 (Vägrar-serien, design systemet)

Byggd 5/11 2026 efter Heroworks – design system (README + komponenten Reel/StepCard): papper och bläck, text på vita kort, hårda klipp, StepCard på `background`, slutkort med riktig logga. Inga ljusfläckar, ingen glöd, inga mörka toningar, inga AI-barn.

Tidslinje (30 fps): hook 60 · scen 75 · kvällsknep 80 · barnvy 100 · (spelruta 50) · slutkort 95 → 13,7 s (15,3 s med spelruta). Hooken står komplett på bildruta 0; fotot gör en push-in 1,00→1,04 per skott. CTA-pillen syns ≥ 2 s. All text inom y 250–1480.

Props per reel: `props/*.json` (hook1/hook2, hookShots, scen1/scen2, scenShots, knep, knepShots, step1/step2 {n, emoji, task, instr}, spel).

Bygg: `npm i remotion@4 @remotion/cli@4 @remotion/renderer@4 react@18 react-dom@18 @fontsource/fredoka @fontsource/inter`, kopiera woff2 (fredoka 500/600, inter 400/500/600) och foton + `heroworks-logo.svg` till `public/`, emoji-PNG från emoji-datasource-google (1f522, 270f-fe0f, 1f4d6) som `e-rakna/e-skriva/e-lasa.png`. Rendera med `render.sh` (Chromium: `/opt/pw-browsers/chromium-*/chrome-linux64/chrome`). Omslag = bildruta 0 som JPG.
