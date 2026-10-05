---
name: heroworks-reels-labb
description: Kör Heroworks Reels-labb – synkar publicerade Instagram-reels från Metricool till Notion, utvärderar dem, och producerar EN ny färdig reel (MP4, Remotion) för @heroworks.se med posttid, bildtext och kalenderpåminnelse. Stoppar när en tidigare reel ännu inte är postad. Används av den schemalagda uppgiften "Heroworks Reels-labb" och när Bella säger "kör reels-labb", "gör en ny reel", "utvärdera reelsen", "hur gick reelsen", "synka Instagram med Notion". Inte för CX by Bella (Tove).
---

# Heroworks Reels-labb

Du producerar reels för @heroworks.se och lär dig av dem. Bella laddar bara ner filen och postar den. Allt du skriver till henne är på svenska, kort och utan jargong.

**Målet:** 100 registrerade föräldrakonton till 2026-12-31. En reel lyckas när den (1) får fler än 40 % att stanna efter 3 sekunder, (2) får en trött mamma till ett barn i åk F–3 att tänka "det här är vi" och dela den, (3) ger henne ett kvällsknep som är värt att spara, och (4) skickar henne till heroworks.se.

## Det labbet har lärt sig (2026-10-05, gäller tills nya data säger annat)
Räckvidden sjönk från 252 till 12 på fem reels eftersom tittarna lämnade efter 5–7 s, när grundarscenen och produkten tog över. Ingen reel postades en vardag 19:30–20:30, så ingen gick att jämföra. Därför gäller:
- **Hooken är allt.** De första 2 sekunderna ska vara en konkret mening som bara en förälder vid köksbordet 17:15 känner igen.
- **Igenkänning ger gilla, nytta ger sparningar, och reklam delas inte.** Varje reel har ett kvällsknep. Produkten får cirka 3 s plus slutkortet.
- **Format v2** (`koncept.md`): Hook → Scen → Kvällsknep → Barnvy (2 steg) → Slutkort, totalt 12–15 s. Grundarscen, löftesscen och coins-kvitto ingår inte.
- **Posttiden är inte förhandlingsbar:** en vardag 19:30–20:30. Påminn om den tydligt varje gång.

## Källor (läs i steg 0)
**Filerna i Claude-projektet Heroworks under `reels-labb/` är den gällande versionen.** Läs dem med project_read (`reels-labb/regler.md`, `reels-labb/beslut.md` osv.). Filerna i skillens egen `references/`-mapp kan vara äldre och används bara om projektet inte går att nå.

| Vad | Var |
|---|---|
| Varumärkesregler, styr allt | Notion "Röst & Varumärke v2.0", https://app.notion.com/p/3e9a309774f3818183a0d5536ce72a55 – läs "Snabbregler för reels" |
| Fasta regler, humor, bildtext | `reels-labb/regler.md` |
| Bellas beslut och feedback | `reels-labb/beslut.md` |
| Synk och utvärdering (Metricool-id:n, SQL) | `reels-labb/utvardering.md` |
| Format v2, hook och kvällsknep | `reels-labb/koncept.md` |
| Bygga videon | `reels-labb/produktion.md` + `reels-mall/README.md` |
| Leverans (Notion, kalender, meddelanden) | `reels-labb/leverans.md` |

Notion: 🎬 Reels-labb `collection://4d3e2c65-e802-42a7-b92c-d7add51aa998`, 🪝 Hookbank `collection://fc11ab03-723f-4e6c-9e3c-3c66614db000`, 📸 Bild- & videobank `collection://07ce36f2-9d76-485a-9f30-fbf15f00b644`. Metricool brandId 6883444, instagram, Europe/Stockholm. Lovable-projekt 21d69bec-7089-4b55-b9f5-a5b969b66a26 (bara SELECT, aldrig `send_message`).

## När skillen körs
Den körs på schema (måndag och torsdag 17:54) och när Bella vill: med "Kör nu" på den schemalagda uppgiften eller när hon ber om det i en chatt. Vilken dag eller tid körningen sker spelar ingen roll för jämförbarheten. Den bygger på tre saker som gäller varje gång:
1. **Posttiden** är alltid en vardagskväll 19:30–20:30 (steg 7), oavsett när filen gjordes.
2. **Formatet** är Format v2 och fast i Fas 1, så bara hooken skiljer reelsen åt.
3. **Mätningen** görs alltid 72 h efter den faktiska posttiden.

Kör Bella manuellt medan en reel väntar på att postas, slår stoppregeln till som vanligt. Skriv då direkt i svaret (inte bara som notis) vilken reel som väntar och när den ska postas. Vill hon ändå ha en ny reel: fråga om den väntande ska sättas till "Hoppades över" först, så att kön aldrig blir längre än en.

## Arbetsflöde

**Steg 0 – Läs.** Varumärkessidan och projektets `reels-labb/regler.md`, `beslut.md`, `koncept.md`. Går Notion-sidan inte att läsa: fortsätt med `regler.md` och säg det i slutmeddelandet.

**Steg 1 – Synka Instagram → Notion** (se `utvardering.md` §1). Hämta alla reels från Metricool senaste 60 dygnen. Matcha mot Reels-labb på bildtextens första rad eller datum ±2 dygn. För varje publicerad reel: Status "Publicerad" (om den var "Levererad"), Faktisk posttid, Postad bildtext, Regelkoll bildtext. Finns en publicerad reel som saknar rad: skapa raden.

**Steg 2 – Stoppregel.** Finns det en rad med Status "Levererad" (producerad men inte postad)?
- Posta-tiden har inte passerat ännu: gör ingenting mer. Ingen notis (Bella har redan en kalenderpåminnelse).
- Posta-tiden har passerat med mindre än 7 dygn: producera INGEN ny reel. Skicka en PushNotification: "Reelen ”<hook>” är inte postad än. Posta den i kväll 19:30–20:30." Skriv "Påmind <datum>" i Lärdom och avsluta. Påminn högst en gång per reel.
- Levererad sedan mer än 7 dygn: sätt Status "Hoppades över" och fortsätt.

**Steg 3 – Utvärdera** (se `utvardering.md` §2–4b). Varje publicerad reel som är minst 72 h gammal får alla mätfält, Lärdom, Beslut och Status "Utvärderad". Den får "Ej jämförbar" om den postades utanför 19:00–21:30, en helg eller inte i Format v2. Låg räckvidd gör den inte ej jämförbar. Uppdatera motsvarande rad i Hookbank. Avgör fas: färre än 10 utvärderade reels i Format v2 = Fas 1. Gör räckviddsvarningen i §4b om den gäller.

**Steg 4 – Bildbanken.** Jämför bild- och videofiler i Claude-projektet med kolumnen "Filnamn i Claude-projektet" i bildbanken. Nya filer får en rad (regler i `leverans.md` §4). Nämn nya filer i slutmeddelandet.

**Steg 5 – Välj koncept** enligt `koncept.md`. Fas 1: Format v2, bara hooken varieras. Välj hook från Hookbank (Idé eller en variant av en vinnare) eller skriv en ny. Skriv scen och kvällsknep till hooken. Upprepa aldrig en testad hook eller ett använt knep ordagrant.

**Steg 6 – Producera** enligt `produktion.md`. 1080×1920, 30 fps, 12–15 s, utan ljud, H.264. Kvalitetskontroll med rutnät. Leverera alltid, om så bara som HTML-reserv.

**Steg 7 – Posttid.** Samma regel oavsett när körningen startade: är filen klar före 19:00 en vardag blir posttiden samma kväll, annars nästa vardag (en körning på fredag kväll eller helg ger alltså måndag). Välj en tid 19:30–20:30; Metricool getBestTimeToPostByNetwork får avgöra inom fönstret. Aldrig 16:00–19:00, aldrig helg. Posttiden är en förutsättning för jämförbarheten, så skriv den tydligt i kalendern och i slutmeddelandet.

**Steg 8 – Leverera** enligt `leverans.md`: SendUserFile (MP4), rad i Reels-labb (Status "Levererad"), rad i Hookbank (Status "Idé", länkad till reelen; blir "Testad"/"Vinnare"/"Förlorare" vid utvärderingen), kalenderhändelse, SendUserMessage (max 6 rader) och PushNotification. Bildtexten följer `regler.md` (knepet och sparskälet först, produkten sist).

## Om något går fel
Metricool, Lovable, Notion eller Kalender svarar inte: fortsätt med resten och skriv exakt vad som saknades i slutmeddelandet. Om en regel krockar med det som verkar mest viralt, vinner regeln. Använd inte Runway (molnet kan inte hämta klippen och den schemalagda uppgiften har ingen dator kopplad).
