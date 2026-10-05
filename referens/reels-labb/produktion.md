# Producera videon (Remotion)

Hämta med project_read från Claude-projektet Heroworks: `reels-mall/README.md` (bygginstruktion, nätverk, ändringslogg – läs hela), `reels-mall/Reel.jsx`, `reels-mall/index.jsx`, `brand/heroworks-logo.svg`, och vid behov `reels-mall/screens.html` + `reels-mall/warp.py`. Bilder ur projektet hämtas med project_read (sparas som fil) och kopieras till `public/`.

Loggan-SVG:n returneras inline av project_read: skriv den till `public/heroworks-logo.svg` med ett skript som läser verktygsresultatet, eller med Write. Rita aldrig en egen logga.

## Bygg
```bash
mkdir -p rm/src rm/public && cd rm && npm init -y
npm i remotion @remotion/cli @remotion/renderer react react-dom @fontsource/fredoka @fontsource/inter
npm pack emoji-datasource-google@15 && tar xzf emoji-datasource-google-*.tgz package/img/google/64/1f522.png && cp package/img/google/64/1f522.png public/emoji-1f522.png
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
npx remotion still src/index.jsx Reel qc.png --frame=0 --browser-executable=$B
npx remotion render src/index.jsx Reel out/reel.mp4 --browser-executable=$B --codec=h264 --crf=16 --muted
ffmpeg -i out/reel.mp4 -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -an -movflags +faststart /mnt/user-data/outputs/<slutfil>.mp4
```
Utgå från `Reel.jsx` och byt bara manuset längst ner (Hook, scener, STEPS, tider, `DUR`). Återanvänd Background, Scene, Words, Pill, PhotoBg, AppStepView (`total`, `first`), EndCard.

**Format v2 (från 2026-10-05, se `koncept.md`):** Hook → Scen → Kvällsknep (en `Scene` med knepet, max 8 ord) → AppStepView med 2 steg + "Ett steg i taget." → EndCard. Ta bort grundarscenen, löftesscenen och Coins ur manuset (komponenterna får ligga kvar i mallen). Total 12–15 s (360–450 bildrutor).

## Omslag och Story (samma körning)
- **Omslag:** rendera `Omslag` med reelens hook (title = första raden, accent = andra raden, samma foto som hooken) som JPG och lägg i GitHub bredvid MP4:an. Skickas som `videoThumbnailUrl` (se `metricool.md` §4).
- **Story:** se `metricool.md` §10 och README "Stillbilder".

## Varumärke
Navy #0f1340 (radiell toning mot #171c52), turkos #84dee3, lavendel #b58aea, magenta #e6b4f3, blush #f9cfd0, plommon #5c465c, guld #f9b12b (bara coins). Rubriker Fredoka, brödtext Inter (@fontsource – Google Fonts är blockerat).

## Layout och rörelse
- Säker zon: ingen text i y < 230 eller y > 1498 (av 1920). Minsta text 60 px, rubriker 96–288 px.
- Nytt visuellt skeende var 1,5–2,5 s (knepet får stå ≈3,5 s så det hinner läsas). Övergångar 250–400 ms, inga blixtar, skakningar eller blinkningar.
- Slutkortet står kvar så att CTA-pillen syns minst 2 s (pillen tonar in 26 bildrutor efter slutkortets start → slutkortet ≥ 93 bildrutor).
- Sista bildrutan ska kunna loopa tillbaka till hooken.

## Kvalitetskontroll (alltid)
Ta ut 12 bildrutor jämnt över slutfilen, lägg dem i ett rutnät med röda linjer vid 12 % och 78 % höjd och titta. Kontrollera: hooken hel på bildruta 0, ingen text klipps/överlappar eller ligger utanför säker zon, knepet läsbart, produkten syns högst ≈3 s före slutkortet, loggan + CTA på slutet, längd 12–15 s. Läs all text mot `regler.md`. Rätta och rendera om högst två gånger.

## Reserv
Fungerar inte Remotion efter två försök: bygg samma reel som självbärande HTML-animation och spela in med Playwright (viewport 540×960, zoom 1,5). Misslyckas också det: leverera HTML-filen och säg att den kan skärminspelas.

## Mallen
Förbättrar du en återanvändbar del: spara `Reel.jsx` till `reels-mall/Reel.jsx` och lägg en rad i README:ns ändringslogg. Spara inte engångsmanus som mall.
