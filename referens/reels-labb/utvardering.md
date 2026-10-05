# Synk och utvärdering

## 1. Synk Instagram → Notion (varje körning)
Metricool `getAnalyticsDataByMetrics`, brandId 6883444, from = idag − 30 dygn (gratisplanen sparar bara 30 dagar – be aldrig om mer), to = nu, metrics:

| Id | Betydelse | Notion-fält |
|---|---|---|
| IGRE02 | Datum och tid (YYYYMMDDhhmmss, brandens tidszon Europe/Stockholm) | Faktisk posttid |
| IGRE03 | Bildtext | Postad bildtext |
| IGRE06 | Reel-URL | (Lärdom, första gången) |
| IGRE23 | Visningar | Visningar |
| IGRE11 | Räckvidd | Räckvidd |
| IGRE28 | Andel visningar > 3 s (%) | Såg >3 s % |
| IGRE24 | Snitt tittad tid (s) | Snitt tittad tid (s) |
| IGRE10 | Likes | (Lärdom) |
| IGRE21 | Delningar | Delningar |
| IGRE12 | Sparade | Sparade |
| IGRE07 | Kommentarer | Kommentarer |

Matcha rad på bildtextens första rad eller Posta-datum ±2 dygn. Publicerad reel utan rad: skapa en (Reel = första raden i bildtexten, Status "Publicerad").
Eftersom Metricool glömmer allt äldre än 30 dagar är Notion arkivet: fyll alltid i mätfälten direkt när de finns, även före 72 h, och skriv över dem vid 72 h-mätningen.

Konto: `IGEV01` (följare, använd senaste värdet före publicering), `IGEV43` (nya följare per dag, summera 72 h efter publicering).

Regelkoll bildtext: jämför Postad bildtext med `regler.md` → "OK" eller "Avvikelse".

Facebook och TikTok: se `metricool.md` §8 (en rad i Lärdom, påverkar inte Beslut).

## 2. Mätning 72 h efter publicering
Uppdatera alla mätfält från §1. Därtill, via Lovable `query_database` (projekt 21d69bec-7089-4b55-b9f5-a5b969b66a26, bara SELECT). Byt `:start` mot faktisk posttid i UTC:

```sql
WITH ig AS (
  SELECT DISTINCT visitor_id FROM visitor_events
  WHERE event_type = 'page_view'
    AND (event_data->>'utm_source' ILIKE 'instagram%' OR event_data->>'utm_source' = 'ig' OR referrer ILIKE '%instagram%')
    AND created_at BETWEEN :start AND :start + interval '72 hours')
SELECT
  (SELECT count(*) FROM ig) AS ig_besokare,
  (SELECT count(DISTINCT v.visitor_id) FROM visitor_events v JOIN ig USING (visitor_id)
     WHERE v.event_type IN ('inline_signup_submitted','signup_account_created','signup_complete')
       AND v.created_at BETWEEN :start AND :start + interval '72 hours') AS ig_signups,
  (SELECT count(*) FROM auth.users WHERE created_at BETWEEN :start AND :start + interval '72 hours') AS nya_konton;
```
`ig_besokare` → IG-besökare 72h. `nya_konton` → Nya konton 72h (skriv i Lärdom hur många av dem som kom via Instagram = `ig_signups`).

## 3. Jämförbar eller inte
Status "Ej jämförbar" om reelen postats utanför 19:00–21:30, på en lördag eller söndag, eller inte följer Format v2 (`koncept.md`). Fyll ändå i alla fält och skriv varför i Lärdom. Annars Status "Utvärderad".
Låg räckvidd gör inte längre en reel ej jämförbar, eftersom alla reels just nu ligger lågt. Är räckvidden under 50: skriv "låg räckvidd" i Lärdom och läs siffrorna med försiktighet.
En reel som publicerats som testreel (TRIAL_REEL) jämförs bara med andra testreels.
Hittar du inte reelen i Metricool 5 dygn efter Posta-tiden: Status "Hoppades över".

## 4. Rangordning och beslut
Bara reels med Status "Utvärderad" i Format v2 jämförs. Baslinjen från Format v1 (16 aug–4 okt, ingen jämförbar): Såg >3 s 7–31 %, snitt tittad tid 4,8–7,4 s, räckvidd 252 → 12.
1. **Såg >3 s %** (huvudmått i Fas 1 – hooken). Mål: över 40.
2. **Snitt tittad tid / Längd** (håller scenen och knepet?). Mål: över 50 %.
3. **Sparade + Delningar** (fungerar knepet och igenkänningen?). Räkna antal så länge räckvidden är under 500, och per 1 000 räckvidd när den är 500 eller mer.
4. **Räckvidd jämfört med föregående reel.** Om den stiger har Instagram börjat sprida igen.
5. IG-besökare 72h och Nya konton 72h.

Beslut: "Gör mer" om Såg >3 s % ligger minst 5 procentenheter över medianen av jämförbara reels; "Skrota" om minst 5 under; annars "Justera". Med färre än 3 jämförbara reels: "Justera" och skriv "för lite data".

Lärdom (1–3 meningar): vad som troligen drev utfallet, jämfört med närmaste föregångare. Nämn bara det du ser i siffrorna. Säg om tittarna lämnade före eller efter knepet (snitt tittad tid jämfört med knepets starttid ≈ 4,5 s).

Hookbank: uppdatera hookens rad (Såg >3 s %, Snitt tittad tid, Räckvidd, Posttid OK). Status "Vinnare" vid "Gör mer", "Förlorare" vid "Skrota", annars "Testad".

## 4b. Räckviddsvarning
Har de tre senaste publicerade reelsen alla räckvidd under 50, säg det i slutmeddelandet med en mening: "Instagram visar reelsen för färre än 50 personer. Det enda som vänder det är att fler stannar de första 3 sekunderna och att reelen går ut en vardag 19:30–20:30." Lägg då extra kraft på hooken. Ändra inget annat i formatet.

## 5. Faser
- **Fas 1** (färre än 10 reels i Format v2 med Status "Utvärderad"): fast format, bara hooken varieras. Mål: Såg >3 s % över 40.
- **Fas 2** (10 eller fler): behåll vinnande hooktyp och testa en variabel i taget: pelare (inklusive Founder), längd, slut, mer/mindre produkt, foto/grafisk, Trend-format (ungefär var tredje reel). Hook-jämförelser kan göras med testreels (`metricool.md` §4).
