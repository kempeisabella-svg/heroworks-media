# Heroworks reels-mall (Remotion)

Mallen som Reels-labb bygger varje reel från. Första versionen användes för reelen "Myt: Läxan kräver en vuxen bredvid." (7 okt 2026).

## Filer i Claude-projektet
- `reels-mall/Reel.jsx` – kompositionen. Återanvändbara delar: `Background` (loopande ljusfläckar), `Scene` (lugn in/ut-toning 300–400 ms), `Pill`, `Words` (ord glider upp ett i taget), `Tally` (räknestreck som ritas fram), `PhotoBg`, `PhoneFlow` (appskärmar på mobilen i fotot), `AppStepView` (barnvyn byggd från appens kod), `Coins` (kvittot efter läxan), `EndCard` (riktiga loggan + tagline + CTA-pill), `ListItem`.
- `reels-mall/index.jsx` – registrerar `Reel` (1080×1920, 30 fps; längden läses från `DUR` i Reel.jsx) och stillbilderna `Karusell`, `Story` och `Omslag`.
- `reels-mall/Stills.jsx` – stillbilder i samma stil som reelsen, styrda helt med `--props` (se "Stillbilder" nedan). Använder `C`, `FRED`, `INTER`, `Background` och `useFontsReady` som exporteras från Reel.jsx.
- `reels-mall/screens.html` – förälderns appskärmar byggda från `HomeworkUploadModal.tsx` + `PageCollector.tsx`: s1 "Ny läxa" (Ta en bild), s2 telefonens kamera, s3 sidan tillagd ("Dela upp i steg (1 sida)"), s4 analys ("Delar upp i steg..."), s5 toast "Läxa tillagd! Alvas matematik är redo att göras". Kameravyn använder `screens/sheet.jpg` (beskärning av läxbladet i mobil.jpg).
- `reels-mall/warp.py` – lägger s1–s5 i perspektiv på den tomma skärmen i `mobil.jpg` och maskar med skärmens vita pixlar, så att tummen och kameraön ligger ovanpå. Ger `public/mobil_s1.png` … `mobil_s5.png`.
- `brand/heroworks-logo.svg` – riktiga HERO/WORKS-loggan, vektoriserad. Används på slutkortet.

## Bygga från noll (ny körning)
```bash
mkdir -p rm/src rm/public rm/screens && cd rm && npm init -y
npm i remotion @remotion/cli @remotion/renderer react react-dom @fontsource/fredoka @fontsource/inter
# emoji som bilder (färgemoji-typsnitt renderas inte i headless Chromium)
npm pack emoji-datasource-google@15 && tar xzf emoji-datasource-google-*.tgz package/img/google/64/1f522.png package/img/google/64/270f-fe0f.png package/img/google/64/1f9b8.png
cp package/img/google/64/1f522.png public/emoji-1f522.png && cp package/img/google/64/270f-fe0f.png public/emoji-270f.png && cp package/img/google/64/1f9b8.png public/emoji-1f9b8.png
# lägg Reel.jsx och index.jsx i src/, heroworks-logo.svg + foton (klocka.jpg, mobil.jpg, laxblad.jpg) i public/, screens.html i screens/
# appskärmarna: beskär sheet.jpg ur mobil.jpg (40,555,455,1108, rotera -4°), skärmdumpa screens.html?s=s1…s5 med Playwright (360×780, DPR 3) till screens/s1.png…, kör python3 warp.py
B=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
npx remotion still src/index.jsx Reel qc.png --frame=230 --browser-executable=$B
npx remotion render src/index.jsx Reel out/reel.mp4 --browser-executable=$B --codec=h264 --crf=16 --muted
ffmpeg -i out/reel.mp4 -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -an -movflags +faststart <slutfil>.mp4
```
Andra emoji: filnamnet är kodpunkten i gemener, t.ex. `1f4d6.png` för 📖, `270f-fe0f.png` för ✏️.

## Nätverk
Google Fonts, jsdelivr, heroworks.se, Lovable-preview, Runways uppladdnings- och nedladdningsadresser, Notions och Drives filadresser är blockerade från molnet. npm-registret fungerar. Typsnitt kommer via @fontsource, loggan och bilder via Claude-projektet, appens kod via Lovable-kopplingen (read_file).

## Riktiga flödet (verifierat i koden 29 sept 2026)
1. Föräldern: /foralder → "Fota kvällens läxa" → modalen "Ny läxa / Fota läxbladet. Vi delar upp det i steg." öppnar direkt i bildläge → "Ta en bild" (telefonens egen kamera) → "Dela upp i steg (1 sida)" → "Delar upp i steg..." → toast "Läxa tillagd! {barns} matematik är redo att göras". Läxtyp väljs inte (valfritt under "Fler sätt").
2. Barnet: egen vy, "Steg X av Y" (prickar bara vid ≤ 8 steg), ett steg per kort, rund turkos bock, "Jag fastnade." under. Svaren skrivs på pappret.
3. Coins: 2 per steg + 15 i bonus när läxan är klar.

## Barnvyn (AppStepView)
Byggd från Lovable-projektets `MissionStepCard.tsx`, `StepProgressBar.tsx`, `src/index.css` (tokens) och `QuestDetail.tsx`. Visas som 320 px bred mobil, skala 3,2. Minsta text är höjd till 19 app-px. `total` sätter "Steg X av total" (realistiskt: ett helt läxblad ger 10–15 steg). `first` sätter vilket stegnummer första kortet har (t.ex. 4 för att börja mitt i läxan). Under bocken står "Klar." (Bellas val 30 sept, inte "Jag fastnade."). Utelämnat med flit: coin-saldot i toppraden, Pausa och ljud. Stegtexterna byts per reel, max 6 ord, verb först.

## Stillbilder (karusell, Story, omslag)
Samma bygge som reelsen; lägg också `Stills.jsx` i `src/`. Inga exempeltexter finns i mallen – skicka alltid alla fält med `--props`, annars blir bilden tom. Exportera JPG för Instagram:
```bash
r(){ npx remotion still src/index.jsx "$1" "$2" --props="$3" --image-format=jpeg --jpeg-quality=90 --browser-executable=$B; }
# Karusell 1080×1350 – kind: hook | text | spara | cta. n/of = bildnummer uppe till höger.
r Karusell out/01.jpg '{"kind":"hook","title":"Läxan tar 40 minuter.","accent":"Den borde ta 15.","photo":"kok.jpg","n":1,"of":7}'
r Karusell out/03.jpg '{"kind":"text","label":"Steg 1","title":"Gör första steget så litet att det tar en minut.","body":"Inte hela läxan. Bara uppgift 1.","n":3,"of":7}'
r Karusell out/06.jpg '{"kind":"spara","title":"När läxan känns för stor","items":["…","…"],"n":6,"of":7}'
r Karusell out/07.jpg '{"kind":"cta","n":7,"of":7}'
# Story 1080×1920 – type: fraga | omrostning. Texten ligger i y 300–1150, y 1250–1700 är tomt för klistermärket.
r Story out/story.jpg '{"type":"fraga","line":"Vad säger ditt barn när läxan känns för stor?","sub":"Skriv i rutan. Vi läser allt."}'
# Omslag 1080×1920 – reelens hook, text inom y 420–1500 så att den syns i profilrutnätet.
r Omslag out/omslag.jpg '{"title":"Tyst vid köksbordet.","accent":"Misstänkt tyst.","photo":"klocka.jpg","origin":"58% 22%"}'
```
`photo` är ett filnamn i `public/` (valfritt, får en mörk toning). Max 5 rader i `spara`, max ≈ 12 ord per rad. Kontroll: lägg bilderna i ett rutnät och titta innan publicering, precis som reelsen.

## Kvalitetskontroll
Ta ut 10–12 bildrutor jämnt över klippet och titta i ett rutnät. Ingen text i översta 12 % (y < 230) eller nedersta 22 % (y > 1498). Hooken ska synas på bildruta 0. Slutkortet ska stå minst 2 s, och CTA-pillen tonar in 26 bildrutor efter slutkortets start – räkna så att pillen själv syns minst 2 s (slutkortet ≥ 93 bildrutor). Inga AI-genererade barnansikten.

## Ändringslogg
- 2026-09-28: Delarna parametriserade; `PhotoBg` och `Viewfinder` tillagda.
- 2026-09-29: Reel "Så går det till på riktigt" (19,3 s). `Viewfinder` ersatt av `PhoneFlow`: förälderns riktiga skärmar (Ny läxa → kamera → Dela upp i steg → analys → Läxa tillagd) i perspektiv på mobilen i mobil.jpg, med tryckring och slutarblixt. Mobilfotot zoomas 1,42–1,5 så skärmen går att läsa. Ny scen "Alva öppnar sin vy." före barnvyn. `AppStepView` fick `total` och "Jag fastnade." Slutkortet visar hela loggan inklusive WORKS. Runway användes inte: foton kan inte laddas upp dit och klipp inte hämtas därifrån från molnet.
- 2026-09-29 (Reels-labb, Trend-reel "En gång om dagen", 18 s): `Pill` finns nu i koden (etikett med valfri bock som ritas fram). Ny del `ListItem` för listformat (etikett-pill + stor rad), t.ex. trenden dag/vecka/månad. Ny toning `shade="heavy"` i `PhotoBg` för text över hela fotot. `index.jsx` bör läsa `DUR` från Reel.jsx. Runway: testbild kan skapas men nedladdning via curl ger 403.
- 2026-09-30 (Reels-labb, Igenkänning "”Jag ska bara hämta vatten.” Igen.", 16,7 s): ny del `Tally` – räknestreck som ritas fram ett i taget; första strecket syns på bildruta 0, så hooken är komplett direkt men har rörelse i första sekunden. `index.jsx` läser nu `DUR` från Reel.jsx. Läxbladsfotot: hare och sköldpadda suddade med papperston (PIL, boxar 575,495,720,665 och 570,825,760,945 i 941×1672). Runway: curl ger fortfarande 403, men en bild från generate_image sparas som fil i tool-results när get_task visar den – stillbilder kan alltså gå att använda; video är otestat.
- 2026-09-30 (Bellas feedback): räknestrecken (`Tally`) togs bort ur hooken – Bella gillade dem inte, använd dem inte i hooks. Barnvyn visar "Klar." under bocken i stället för "Jag fastnade.".
- 2026-09-30: Stegtexterna i barnvyn ska se ut som appens riktiga steg (kollat i tabellen quests): en uppgift per steg, rubriken är själva uppgiften ("9 + 4 =", "Läs sida 6.") och instruktionen är kort ("Räkna ut. Skriv svaret."). Hitta inte på uppdelningar som "Läs uppgift 1." eller förklaringar som "I huvudet eller på fingrarna.". I appen är bocken en ikon utan text med "Jag fastnade." under; i reels visas "Klar." på Bellas begäran.
- 2026-09-30: Appen ändrad (Lovable, commit c9c1bf1): stegknappen i barnvyn är nu en turkos pill med texten "Klar" (h-14 px-6, text-base semibold), "Jag fastnade." ligger kvar som liten knapp under. AppStepView visar Klar-pillen; "Jag fastnade." utelämnas i reels på Bellas begäran.
- 2026-09-30: Drive-mappen "Heroworks Reels" (id 1Vub5bRXio29kxHnFlqdoheVvmwLv0kJ6) skapad. Molnet kan inte ladda upp MP4 dit (för stor för Drive-verktyget). Bella lägger filen där; därefter kan Reels-labb hitta den med Drive-sök och schemalägga i Metricool (kräver att Drive är kopplat i Metricool).
- 2026-09-30 (Reels-labb, Trend "Klappa om du är emot:", 19,3 s, posta 12 okt): `ListItem` har nu `check` (false = ingen bock) och `pillColor`, så etikett-pillen kan bära en emoji och annan färg. Runway: stillbild från generate_image sparas via get_task, men curl mot CloudFront-länken ger 000 – video går inte att hämta.
- 2026-09-30 (Reels-labb, Ögonblicket "Tyst vid köksbordet. Misstänkt tyst.", 17,5 s, posta 14 okt): `AppStepView` har nu `first` (stegnumret på första kortet), så barnvyn kan börja mitt i läxan ("Steg 4 av 12"). Förloppsmätaren startar på rätt nivå. Runway-verktygen fanns inte i sessionen.
- 2026-10-05: Stillbilder tillagda (`Stills.jsx`: `Karusell` 1080×1350 med hook/text/spara/cta, `Story` 1080×1920 med tom zon för klistermärket, `Omslag` 1080×1920 för reelens omslag). Reel.jsx exporterar nu `C`, `FRED`, `INTER`, `Background`, `useFontsReady`. Testat: alla tre formaten, JPG-export och att `Reel` fortfarande renderar. Ersätter Canva för karuseller och Stories.
