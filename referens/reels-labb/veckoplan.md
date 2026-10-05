# Veckoplan – en körning per vecka (från 2026-10-12)

Bella beslutade 2026-10-05: den schemalagda uppgiften "Heroworks veckoinnehåll (Reels-labb)" körs **en gång i veckan, måndag 18:00**, och planerar och schemalägger hela veckans innehåll på en gång. Hennes dator måste vara på just då, så allt ska bli klart i den körningen.

## Veckans innehåll
| Dag | Tid | Vad | Gjord med |
|---|---|---|---|
| Tisdag | 19:45 | Reel 1 (Format v2) | `Reel` + `Omslag` |
| Onsdag | 19:45 | Karusell, 7 bilder | `Karusell` (growth-skillens avsnitt E) |
| Onsdag | 20:30 | Story – frågeruta | `Story` type "fraga" |
| Torsdag | 19:45 | Reel 2 (Format v2, en annan hook än reel 1) | `Reel` + `Omslag` |
| Söndag | 19:30 | Story – omröstning | `Story` type "omrostning" |

Tiderna ligger fast så att reelsen blir jämförbara (vardag 19:30–20:30). getBestTimeToPostByNetwork får flytta en reel högst ±15 min inom fönstret.

## Ordning i körningen (viktigast först – tar tiden slut ska det viktigaste vara klart)
1. Läs, koppla GitHub, synka Metricool → Notion (30 dygn).
2. **Kontroll av förra veckan:** gick allt ut? Det som inte syns i Metricool trots passerad posttid → Status "Hoppades över" + en rad i slutmeddelandet (ingen ompublicering i efterhand – den förstör jämförbarheten).
3. **Utvärdera** varje reel som är minst 72 h gammal. Tisdagens reel är då ~6 dygn och torsdagens ~4 dygn: skriv reelens ålder i timmar i Lärdom. Räckvidd växer mest de första 72 h, så siffrorna går att jämföra, men jämför helst tisdag med tisdag och torsdag med torsdag när det finns data nog.
4. **Omvärld:** de fem konkurrenterna, högst 2 nya hooks i Hookbank.
5. **Budgetkoll** för resten av månaden (`metricool.md` §2). Räcker inte budgeten: stryk i ordningen söndagens Story → karusellen → aldrig en reel.
6. **Reel 1** → schemalägg tisdag 19:45.
7. **Story frågeruta** → onsdag 20:30.
8. **Reel 2** → schemalägg torsdag 19:45. Fas 1: samma format, en ny hook (inte en variant av reel 1:s hook samma vecka).
9. **Karusell** (följ growth-skillen heroworks-growth-lead avsnitt E; anropa skillen om den finns, annars reglerna i denna fil + `regler.md`) → onsdag 19:45. Ämnet ska inte upprepa veckans kvällsknep ordagrant.
10. **Story omröstning** → söndag 19:30.
11. Kalender + slutmeddelande.

## Kalender (Bella vill ha påminnelser i Google Kalender, inte push-notiser)
- Informativa händelser utan påminnelse: "🎬 Reel går ut: <hook>" (tis, tor), "🖼️ Karusell går ut: <ämne>" (ons).
- Händelser där Bella gör något, med popup 0 min: "📱 Story: lägg på frågeruta" (ons 20:30) och "📱 Story: lägg på omröstning" (sön 19:30), med klistermärkets text i beskrivningen.
- En samlad händelse måndag 18:00–18:15 "📅 Veckans innehåll klart" med allt som schemalagts + plannerUrl:er.

## Slutmeddelande (SendUserMessage, max 6 rader)
1. Veckan: tis reel "<hook>", ons karusell "<ämne>", tor reel "<hook>" – allt schemalagt.
2. Stories: ons frågeruta + sön omröstning (du lägger på klistermärket, 1 min).
3. Förra veckan: Såg >3 s % för båda reelsen, eller "för lite data".
4. Vad som testas den här veckan och varför (en mening).
5. Budget: X av 20 publiceringar använda denna månad.
6. Vad som inte gick, om något.

## Om körningen startas manuellt mitt i veckan
Gör bara det som saknas för resten av veckan (kolla `getScheduledPosts` först). Skapa aldrig dubbletter.
