# Metricool – kanaler, publicering och omvärldsbevakning

Gäller Reels-labbet och Emma (growth). Veckans schema står i `veckoplan.md`. Metricool brandId 6883444, tidszon Europe/Stockholm, **gratisplan**. Beslutat 2026-10-05: Bella vill använda allt i gratisplanen och inte posta själv.

## 1. Gratisplanens gränser (styr allt nedan)
- **20 publiceringar per månad. Varje kanal räknas för sig** (en reel till Instagram + TikTok = 2). Schemalagda räknas först när de publiceras.
- **30 dagars statistik.** Hämta aldrig längre tillbaka än idag − 30 dygn. Det som ska sparas långsiktigt sparas i Notion vid varje körning.
- 5 konkurrenter (valda 2026-10-05, går inte att byta i gratisplanen): @hej_albert, @studybuddysverige, @zcooly, @urforaldrar, @biglittlefeelings. Inkorg (bara i Metricools app), bästa posttid.
- **Hashtag-bevakning ingår INTE** – Metricools Hashtag Tracker kostar 25 € per dygn. Används inte.
- Ingen Google Drive, Canva eller länk-i-bio i gratisplanen. Metricool AI-krediter används inte – Claude skriver texterna.

## 2. Månadsbudget (20 publiceringar)
Kopplat 2026-10-05: Instagram, Facebook-sidan, Threads. Ännu inte: TikTok, Pinterest och Instagrams delning av reels till Facebook (Bella gör det senare). Hoppa över kanaler som inte är kopplade (`getBrandSettings`) utan att nämna det varje gång.

Facebook-sidan får reelsen gratis via Instagrams inställning "Dela reels till Facebook" (räknas inte i Metricool). Resten fördelas i den här ordningen tills budgeten är slut:

| Prio | Vad | Ca/mån |
|---|---|---|
| 1 | Instagram-reel (varje reel från labbet) | 8–9 |
| 2 | Instagram-karusell (Emma, max 1/vecka) | 4 |
| 3 | Instagram-Story med frågeruta/omröstning (§10) | 6–7 |
| 4 | TikTok (samma reel-fil) | om det finns plats |
| 5 | Pinterest (karusellens sparbild som pin → heroworks.se) | om det finns plats |
| 6 | Threads (karusellens bild 1 + igenkänningsmeningen) | om det finns plats |

**Budgetkoll före varje schemaläggning:** räkna publicerade inlägg denna kalendermånad (Metricool-statistik per kanal: IG reels + IG posts + TikTok + Pinterest + Threads) plus schemalagda (`getScheduledPosts`, från månadens första dag till månadens sista, × antal kanaler per inlägg). Lägg bara till kanaler så länge summan ≤ 20. Instagram får alltid sin plats först; hellre tappa TikTok än en IG-reel.

## 3. Filvärd: GitHub
Metricool behöver en publik länk till varje video/bild.
- Repo: `kempeisabella-svg/heroworks-media` (publikt, gren `main`). Innehållet är bara sådant som ändå publiceras offentligt.
- I början av körningen: `add_repo(owner "kempeisabella-svg", repo "heroworks-media", access "push")`, klona enligt svaret.
- Lägg filen i `reels/ÅÅÅÅ-MM-DD_<hook-slug>.mp4` respektive `karuseller/ÅÅÅÅ-MM-DD_<slug>/01.jpg … 07.jpg` (JPG 1080×1350). Commit + push.
- Publik länk: `https://raw.githubusercontent.com/kempeisabella-svg/heroworks-media/main/<sökväg>`. Kontrollera med `curl -sI` att den svarar 200 innan den skickas till Metricool.
- Verifierat 2026-10-05: push fungerar och Metricool hämtar bilder från raw-länken (utkast id 388829961). Video är ännu inte testad – första reelen är provet.
- **Om repot saknas eller push misslyckas:** gör som förut – Bella får filen, en kalenderhändelse "📲 Posta …" och postar själv. Skriv i slutmeddelandet att GitHub inte gick.

## 4. Schemalägga en reel
`createScheduledPost`, blogId "6883444", date = posttiden (vardag 19:30–20:30, se SKILL.md steg 7). `info`:
- `providers`: `instagram` + de budgetkanaler som får plats (oftast `tiktok`).
- `text`: bildtexten enligt `regler.md`, med 3–5 hashtags sist. `firstCommentText`: "Starta gratis på heroworks.se (länk i bio)".
- `media`: [GitHub-länken till MP4]. `videoThumbnailUrl`: GitHub-länken till omslaget (`Omslag` i mallen, se `produktion.md`). Saknas omslaget: `videoCoverMilliseconds`: 0.
- `instagramData`: `{"type":"REEL","showReelOnFeed":true,"isAiGenerated":<true om reelen använder ai_-bilder>,"audioConfiguration":{"audioId":"<sökord>","audioVolume":30,"videoVolume":100}}`. Sökord: ett lugnt instrumentalt ljud (Fas 1 samma stil varje gång, t.ex. "lofi piano"). Får du en kandidatlista: välj det lugnaste och skicka om med det numeriska id:t. Misslyckas ljudet två gånger: schemalägg utan `audioConfiguration` och skriv det i Lärdom ("utan ljud").
- `tiktokData`: `{"privacyOption":"PUBLIC_TO_EVERYONE","isAigc":<samma som ovan>,"title":"<hooken>"}`.
- `autoPublish`: true.
- **Testreels (Fas 2):** när två hooks ska jämföras kan den ena gå som `"type":"TRIAL_REEL"` (visas bara för icke-följare). Använd inte i Fas 1 – formatet ska hållas fast.

Spara `plannerUrl` i Notion-raden (fältet Lärdom, första raden "Metricool: <url>") och sätt Status "Levererad" (= schemalagd).

## 5. Schemalägga en karusell (Emma)
Bilderna renderas med `Karusell` i Remotion-mallen (README "Stillbilder"), inte i Canva. Samma GitHub-flöde, 7 bilder i `media`, `instagramData.type` "POST". Pinterest (om budget): sparbilden (bild 6), `pinterestData`: `{"boardId":"Läxor utan tjat","pinTitle":"<rubrik>","pinLink":"https://heroworks.se/?utm_source=pinterest&utm_medium=pin&utm_campaign=karusell"}`. Threads (om budget): bild 1 + igenkänningsmeningen + "heroworks.se".

## 6. Kontroll att publiceringen gick
Vid nästa körning: finns en rad med Status "Levererad" vars posttid passerat med mer än 2 h men som inte syns i Metricool-statistiken eller fortfarande ligger i `getScheduledPosts` → publiceringen misslyckades. Skapa en kalenderhändelse samma dag 19:30 "⚠️ Reelen gick inte ut – öppna Metricool" med plannerUrl, och nämn det först i slutmeddelandet. Producera ingen ny reel förrän den är ute eller satt till "Hoppades över".

## 7. Omvärld: konkurrenter (måndagskörningen)
Bara på måndagar, efter steg 3 i SKILL.md:
- `getAnalyticsDataByMetrics`, network instagram, connector "competitor reels" (och "competitors" för följare/engagemang), senaste 7 dygnen.
- Ingen hashtag-data (betaltjänst, se §1).
- Plocka ut högst 3 saker: konkurrent-reels med ovanligt hög interaktion och vad deras hook gör (typ: klockslag, replik, vändning, myt). @biglittlefeelings och @urforaldrar är hook-förebilder, inte siffror att jämföra mot; @hej_albert, @studybuddysverige och @zcooly är direkta konkurrenter om samma föräldrar. Gör om till högst 2 nya rader i Hookbank (Status "Idé", Anteckning "Från omvärld <datum>: <konto/hashtag>"). Kopiera aldrig ordagrant och följ `regler.md` (NPF-ord aldrig i hook eller hashtag).
- En rad om det i slutmeddelandet. 

## 8. Övriga kanaler i utvärderingen
Huvudmåttet är fortfarande Instagram (`utvardering.md`). Läs dessutom, samma 72 h: Facebook-reelens visningar och räckvidd (connector "reels", FBRE10, FBRE11) och TikTok-videons visningar (network tiktok, connector "posts"). Skriv dem i Lärdom som en rad: "FB: x visn / TikTok: y visn". De påverkar inte Beslut i Fas 1.

## 9. Bella sköter (5 min/vecka)
Inkorgen i Metricool-appen: svara på kommentarer och skicka DM till nya följare enligt Emmas mallar (growth-skillen, F). Metricool-kopplingen kan inte läsa inkorgen eller skicka DM.

## 10. Stories med frågeruta (Reels-labbet, 2 per vecka)
Syfte: samtal, inte räckvidd. Svaren blir hooks och karusellämnen, och den som svarar blir en följare som går att skriva till.
- **När:** onsdag 20:30 (frågeruta) och söndag 19:30 (omröstning). Båda görs i måndagskörningen, se `veckoplan.md`. Helg är okej för Stories – jämförbarhetsregeln gäller bara reels.
- **Bild:** JPG 1080×1920, varumärkets färger och typsnitt (Notion "Röst & Varumärke v2.0"), en mening i övre halvan, **nedre tredjedelen tom** för klistermärket. Inga ansikten, inga NPF-ord, ingen produkt. Renderas med `Story` i Remotion-mallen (README "Stillbilder").
- **Typ:** onsdag = **frågeruta** ("Vad säger ditt barn när läxan känns för stor?"), söndag = **omröstning** med två svar ("Läxorna den här veckan: 🙂 lugnt / 😮‍💨 jobbigt"). Samma igenkänningston som hookarna, ingen säljton.
- **Publicering:** GitHub-länk → `createScheduledPost`, provider instagram, `instagramData.type` "STORY", ingen `text`, **`autoPublish: false`** (klistermärken går inte att lägga på via kopplingen – Metricool-appen skickar en notis och Bella lägger på rutan och trycker publicera, ca 1 min).
- **Kalender:** händelse på posttiden, 5 min, titel "📱 Story: lägg på frågeruta" (eller "omröstning"), popup 0 min, beskrivning = exakt text till klistermärket så att hon kan kopiera den.
- **Svar:** Bella klistrar in svar till Claude när hon vill (aldrig ett krav). Varje svar som säger något konkret blir en rad i Hookbank (Status "Idé", Anteckning "Story-svar <datum>"). Följare som svarat är bra mottagare av DM-mallarna (Emma, F).
- Mät inget beslut på Stories i Fas 1. Skriv bara antal svar i slutmeddelandet när Bella har klistrat in dem.

## 11. Collab-inlägg (Emma, högst 1 per månad)
Ett Collab-inlägg visas i både @heroworks.se:s och förälderns flöde – den mest trovärdiga spridningen som finns gratis.
- **Vem:** en av de aktiva föräldrarna (ambassadörerna, growth-skillen C) som har berättat ett eget ögonblick och har ett publikt Instagram-konto.
- **Samtycke först:** Bella frågar i DM (Emmas mall). Ett skriftligt ja i DM räcker. Barn syns aldrig med ansikte eller namn. Spara samtycket i Bildbanken (Samtycke "Finns (sparat)").
- **Format:** en karusell (oftast) eller en reel byggd på förälderns ögonblick, med hennes ord som citat i bild 2.
- **Publicering:** som vanlig karusell/reel, plus `instagramData.collaborators: [{"username":"<förälderns konto>","deleted":false}]`. Föräldern får en inbjudan i Instagram som hon måste godkänna – Bella skickar en rad i DM: "Nu ligger inlägget ute, godkänn gärna inbjudan så syns det hos dig också."
- Räknas som en vanlig publicering i budgeten. Mät som karusell/reel; skriv "Collab: <konto>" i Lärdom.
