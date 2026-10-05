# Leverans

**Sedan 2026-10-05 publicerar labbet reelen själv via Metricool** (se `reels-labb/metricool.md`). Bella postar inte. Fungerar inte GitHub eller Metricool gäller reservvägen i §5b.

## 0. Ljud
Videon renderas utan ljud. Ljudet läggs på i Metricool via `audioConfiguration` (`metricool.md` §4): ett lugnt instrumentalt ljud, volym 30 %, samma stil varje gång i Fas 1 så att ljudet inte blir en extra variabel. Trend-reels (Fas 2) använder det trendande ljudet vid namn. Ljudet ska vara lugnt: ingen hype, inga rop, ingen sångtext som säger något mot reglerna (skuld, tjat, tårar, diagnoser).

## 1. Filen
Spara `/mnt/user-data/outputs/Heroworks_reel_ÅÅÅÅ-MM-DD_<hook-slug>.mp4` (datum = postdagen), lägg den i GitHub-repot och schemalägg enligt `metricool.md` §3–4. Skicka den också med SendUserFile, så att Bella ser den.

## 2. Rad i 🎬 Reels-labb
Reel = hooken, Status "Levererad" (= schemalagd i Metricool), Posta = vald tid (datetime, +02:00/+01:00), Pelare, Hook, Testad variabel (vad som ändrats mot närmaste föregångare), Bildtext, Längd (s), Ljud att lägga på (vilket ljud som valdes, eller "utan ljud"), Bilder (relation till bildbanken), Trendformat (bara Trend-reels). Lärdom börjar med "Metricool: <plannerUrl>" och vilka kanaler den går till. Sätt använda bilders Status till "Använd".

## 3. Rad i 🪝 Hookbank
Hook, Typ, Rörelse bildruta 0, Bakgrund, Status "Idé", Reel (relation till nya raden). Mätfälten fylls vid utvärderingen.

## 4. Bildbanken (nya filer)
Databasen heter 📸 Bildbank (DAM); regler på Notion-sidan "Bildbank – struktur och regler". Varje ny rad får också: Kategori (Foto/Video/Mockup), Plats "Claude-projektet", Rättigheter ("AI-genererad (egen användning)" för ai_/Canva, annars "Egen (Heroworks)"), Samtycke ("Ej aktuellt (inga personer)", eller "Saknas" om en riktig person syns – använd inte bilden förrän Bella satt "Finns (sparat)"), Godkännande "Utkast" och Taggar. Använd i reels bara rader med Godkännande "Godkänd" eller "Utkast" + Regelkoll OK, aldrig "Utgången" eller "Granska mot v2".
Om en uppladdad Canva-bild redan har en rad (Plats "Canva", samma motiv): uppdatera den raden med Filnamn i Claude-projektet och Plats "Claude-projektet" i stället för att skapa en ny.
Namn, Filnamn i Claude-projektet (exakt), Typ, Källa ("AI-genererad (ChatGPT)" om filnamnet börjar med `ai_`, "Skärmdump från appen" om `app_`, "AI-genererad (Canva)" om bilden kommer från Canva-mappen "Heroworks bildbank (AI)" – de har Canvas egna filnamn; jämför motivet med tabellen i `reels-labb/canva-bildbank.md` i Claude-projektet och ta Motiv, Passar pelare och ev. "Kolla"-anmärkning därifrån – annars "Egen bild"), Motiv, Passar pelare, Format, Anteckning, Regelkoll ("OK" bara utan ansikten, namn, skolloggor, andras varumärken, läsbar personlig information; "Behöver beskäras eller suddas" + hur; annars "Använd inte"), Status ("Redo" eller "Arkiverad"). Rader som börjar med "ÖNSKAS:" fylls i när en ny fil motsvarar önskan (ta bort "ÖNSKAS: ").

## 5. Kalender
Google Kalender "primary", på posttiden, 15 min, titel "🎬 Reel går ut: <hook>", ingen påminnelse (Bella behöver inte göra något). Beskrivning: kanalerna, plannerUrl, bildtexten och raden "Kolla gärna att länken i bion är heroworks.se/?utm_source=instagram&utm_medium=bio&utm_campaign=reels".

## 5b. Reservväg (om GitHub eller Metricool inte gick)
Som förut: kalenderhändelse "📲 Posta reel + ljud: <hook>" med popup 10 min innan, och i beskrivningen en checklista: (1) "🔊 Lägg på ljud: i Instagram, tryck Ljud → välj ett med pil ↗ i lugn stil, gärna instrumentalt, volym cirka 30 %", (2) bildtexten med 3–5 hashtags, (3) platstagg "Kungsängen", (4) länken i bion, (5) "Filen ligger i dagens körning av Heroworks Reels-labb i Claude-appen."

## 6. Slutmeddelande (SendUserMessage, max 6 rader)
1. Posttid + hook + kanaler ("går ut automatiskt"), eller "Posta själv" om reservvägen användes.
2. Vad som testas och varför (en mening).
3. Vad senaste utvärderingen visade (Såg >3 s %, eller "för lite data än"), plus FB/TikTok-visningar på en rad.
4. Avvikelser: misslyckad publicering, saknat ljud eller budget som tagit slut (vilka kanaler som hoppades över).
5. Omvärld (måndagar) eller nya filer i bildbanken.
6. Vad som inte gick (verktyg som inte svarade), om något.

## 7. PushNotification
`<routine_summary>` med posttid, hook och "går ut automatiskt" i första meningen, därefter 1–2 meningar om testet och senaste lärdomen. Skicka också notis om publiceringen misslyckades eller körningen inte kunde leverera.
