import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing, delayRender, continueRender, Img, staticFile} from 'remotion';

export const C = {
  navy: '#0f1340', navy2: '#171c52', turk: '#84dee3', lav: '#b58aea', mag: '#e6b4f3',
  blush: '#f9cfd0', plum: '#5c465c', gold: '#f9b12b', white: '#ffffff',
};
export const FRED = 'Fredoka, sans-serif';
export const INTER = 'Inter, sans-serif';
const SIDE = 84;
const TOP = 240;
const BOTTOM = 1490;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};
const ease = Easing.bezier(0.25, 0.1, 0.25, 1);

const useSpring = (from, cfg = {damping: 200}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - from, fps, config: cfg});
};

export const Background = () => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = (f / durationInFrames) * Math.PI * 2;
  const blob = (x, y, r, color, o) => (
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 65%)`, opacity: o, filter: 'blur(40px)'}} />
  );
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 40%, ${C.navy2} 0%, ${C.navy} 72%)`, overflow: 'hidden'}}>
      {blob(260 + Math.sin(t) * 90, 520 + Math.cos(t) * 70, 520, C.turk, 0.16)}
      {blob(820 + Math.cos(t) * 80, 1200 + Math.sin(t) * 90, 580, C.lav, 0.18)}
      {blob(620 + Math.sin(t + 2) * 70, 1650 + Math.cos(t + 1) * 60, 420, C.mag, 0.08)}
    </AbsoluteFill>
  );
};

const Scene = ({start, end, children, instant = false, last = false, justify = 'center', padTop = 0}) => {
  const f = useCurrentFrame();
  if (f < start - 1 || (!last && f > end + 12)) return null;
  const inO = instant ? 1 : interpolate(f, [start, start + 11], [0, 1], {...clamp, easing: ease});
  const outO = last ? 1 : interpolate(f, [end, end + 9], [1, 0], {...clamp, easing: ease});
  const y = instant ? 0 : interpolate(f, [start, start + 12], [36, 0], {...clamp, easing: ease});
  const yOut = last ? 0 : interpolate(f, [end, end + 9], [0, -24], {...clamp, easing: ease});
  return (
    <div style={{position: 'absolute', left: SIDE, right: SIDE, top: TOP, height: BOTTOM - TOP,
      display: 'flex', flexDirection: 'column', justifyContent: justify, paddingTop: padTop,
      opacity: Math.min(inO, outO), transform: `translateY(${y + yOut}px)`}}>
      {children}
    </div>
  );
};

const Words = ({text, from, stagger = 3, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', columnGap: '0.26em', ...style}}>
      {text.split(' ').map((w, i) => {
        const s = spring({frame: f - from - i * stagger, fps, config: {damping: 200}});
        return <span key={i} style={{display: 'inline-block', opacity: s, transform: `translateY(${(1 - s) * 40}px)`}}>{w}</span>;
      })}
    </div>
  );
};

// Pill: liten etikett (t.ex. rubriken i ett listformat). check=true ritar en bock i rutan framför texten.
const Pill = ({children, from = 0, check = false, color = C.turk, fg = C.navy, instant = false}) => {
  const f = useCurrentFrame();
  const draw = instant ? 1 : interpolate(f, [from + 4, from + 14], [0, 1], {...clamp, easing: ease});
  return (
    <div style={{alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 22, background: color, color: fg,
      fontFamily: INTER, fontWeight: 700, fontSize: 60, padding: '22px 40px 22px 26px', borderRadius: 999, whiteSpace: 'nowrap'}}>
      {check && (
        <div style={{width: 64, height: 64, borderRadius: 16, background: 'rgba(15,19,64,.12)', border: `4px solid ${fg}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw} />
          </svg>
        </div>
      )}
      {children}
    </div>
  );
};

// Tally: räknestreck som ritas fram ett i taget. OBS: Bella vill inte ha dem i hooks (30 sept).
const Tally = ({from = 0, count = 4, every = 8, height = 120, color = C.turk}) => {
  const f = useCurrentFrame();
  const w = 26 + count * 34;
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} style={{overflow: 'visible'}}>
      {Array.from({length: count}).map((_, i) => {
        const p = i === 0 ? 1 : interpolate(f, [from + i * every, from + i * every + 6], [0, 1], {...clamp, easing: ease});
        const x = 18 + i * 34;
        return <line key={i} x1={x} y1={height - 8} x2={x + 6} y2={8} stroke={color} strokeWidth="11" strokeLinecap="round"
          pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} />;
      })}
    </svg>
  );
};

const T = {
  fg: '#0f1340', muted: 'hsl(305 15% 32%)', mutedBg: 'hsl(359 66% 89%)', turk: 'hsl(183 64% 70%)',
  lav: 'hsl(270 65% 73%)', line: 'hsl(270 33% 91%)', card: '#ffffff',
  gradHero: 'linear-gradient(135deg, hsl(183 64% 70%), hsl(270 65% 73%))',
  bgChild: 'linear-gradient(135deg, hsl(350 40% 96%) 0%, hsl(288 40% 95%) 25%, hsl(183 35% 94%) 50%, hsl(270 30% 95%) 75%, hsl(40 50% 96%) 100%)',
};
const S = 3.2;

const PhotoBg = ({src, start, end, instant = false, last = false, zoom = [1.0, 1.06], origin = '50% 40%', shade = 'bottom', children}) => {
  const f = useCurrentFrame();
  if (f < start - 1 || (!last && f > end + 12)) return null;
  const inO = instant ? 1 : interpolate(f, [start, start + 11], [0, 1], {...clamp, easing: ease});
  const outO = last ? 1 : interpolate(f, [end, end + 9], [1, 0], {...clamp, easing: ease});
  const z = interpolate(f, [start, end + 12], zoom, clamp);
  const grad = {
    bottom: 'linear-gradient(180deg, rgba(15,19,64,0) 30%, rgba(15,19,64,.55) 55%, rgba(15,19,64,.92) 80%, rgba(15,19,64,.96) 100%)',
    low: 'linear-gradient(180deg, rgba(15,19,64,0) 58%, rgba(15,19,64,.7) 72%, rgba(15,19,64,.95) 86%, rgba(15,19,64,.97) 100%)',
    full: 'rgba(15,19,64,.6)',
    heavy: 'linear-gradient(180deg, rgba(15,19,64,.55) 0%, rgba(15,19,64,.72) 45%, rgba(15,19,64,.8) 100%)',
  }[shade];
  return (
    <AbsoluteFill style={{opacity: Math.min(inO, outO), overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: origin}}>
        <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        {children}
      </AbsoluteFill>
      <AbsoluteFill style={{background: grad}} />
    </AbsoluteFill>
  );
};

// ---------- Mobilskärmen i mobil.jpg: appens riktiga flöde (Ny läxa → kamera → Dela upp i steg → analys → Läxa tillagd) ----------
// Skärmarna är byggda från HomeworkUploadModal.tsx / PageCollector.tsx och perspektivlagda på den tomma skärmen (se warp.py).
const PhoneFlow = ({seq}) => {
  const f = useCurrentFrame();
  let cur = seq[0];
  seq.forEach((s) => { if (f >= s.from) cur = s; });
  const taps = seq.filter((s) => s.tap);
  const flash = seq.find((s) => s.flash && f >= s.flash && f < s.flash + 8);
  return (
    <AbsoluteFill>
      {seq.map((s) => (
        <Img key={s.src} src={staticFile(s.src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: s === cur ? 1 : 0}} />
      ))}
      {taps.map((s, i) => {
        const p = interpolate(f, [s.tap.at, s.tap.at + 14], [0, 1], clamp);
        if (p <= 0 || p >= 1) return null;
        return <div key={i} style={{position: 'absolute', left: s.tap.x - 40, top: s.tap.y - 40, width: 80, height: 80, borderRadius: 999,
          background: 'rgba(132,222,227,.35)', border: `3px solid ${C.turk}`, transform: `scale(${0.6 + p * 0.7})`, opacity: 1 - p}} />;
      })}
      {flash && <AbsoluteFill style={{background: '#fff', opacity: interpolate(f - flash.flash, [0, 2, 8], [0, 0.85, 0], clamp)}} />}
    </AbsoluteFill>
  );
};

// ---------- Barnvyn, byggd från MissionStepCard.tsx + StepProgressBar.tsx ----------
// `first` = stegnumret som första kortet visar (t.ex. 4 för att börja mitt i läxan, "Steg 4 av 12").
const AppStepView = ({start, end, subject = 'Matematik', subjectEmoji = 'emoji-1f522.png', steps, total, first = 1}) => {
  const f = useCurrentFrame();
  const s = useSpring(start + 2, {damping: 22, mass: 0.9});
  const n = steps.length;
  const tot = total || n + first - 1;
  const span = (end - start - 8) / n;
  const timed = steps.map((st, i) => ({...st, enter: Math.round(start + 10 + i * span), press: Math.round(start + 10 + i * span + span * 0.72)}));
  let idx = 0;
  timed.forEach((x, i) => { if (f >= x.enter) idx = i; });
  const st = timed[idx];
  const slide = interpolate(f, [st.enter, st.enter + 6], [0, 1], {...clamp, easing: Easing.out(Easing.quad)});
  const cardX = idx === 0 ? 0 : (1 - slide) * 40;
  const cardO = idx === 0 ? 1 : slide;
  let fill = first;
  for (let i = 1; i < n; i++) fill += interpolate(f, [timed[i].enter, timed[i].enter + 12], [0, 1], clamp);
  const fillPct = (fill / tot) * 100;
  const pressing = timed.find((x) => f >= x.press && f < x.press + 24);
  const press = pressing ? interpolate(f - pressing.press, [0, 3, 8], [1, 0.92, 1], clamp) : 1;
  const ringP = pressing ? interpolate(f - pressing.press, [0, 24], [0, 1], clamp) : 0;
  const stepNo = idx + first;
  const isLast = stepNo === tot;

  return (
    <Scene start={start} end={end} justify="flex-start">
      <div style={{perspective: 2400, alignSelf: 'center'}}>
        <div style={{width: 1000, height: 1240, borderRadius: 84, overflow: 'hidden', position: 'relative',
          background: T.bgChild, border: '14px solid #2a2f66',
          transform: `rotateY(${(1 - s) * -14}deg) rotateX(${(1 - s) * 5}deg) translateY(${(1 - s) * 80}px)`,
          boxShadow: '0 60px 140px rgba(0,0,0,.35), 0 0 0 2px rgba(132,222,227,.15)'}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 1000 / S - 9, height: 1240 / S - 9, transform: `scale(${S})`,
            transformOrigin: 'top left', fontFamily: INTER, color: T.fg, padding: '14px 12px 0'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 4}}>
              <div style={{width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,.6)', border: '1px solid rgba(255,255,255,.2)',
                boxShadow: '0 0 30px hsl(183 64% 70% / .35)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Img src={staticFile(subjectEmoji)} style={{width: 20, height: 20}} /></div>
              <div style={{fontFamily: FRED, fontWeight: 700, fontSize: 19}}>{subject}</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '4px 4px'}}>
              <div style={{flex: 1, height: 10, borderRadius: 5, background: T.mutedBg, overflow: 'hidden'}}>
                <div style={{width: `${fillPct}%`, height: '100%', borderRadius: 5, background: `linear-gradient(90deg, ${T.turk}, ${T.lav})`}} />
              </div>
              <div style={{fontSize: 19, fontWeight: 600, fontVariantNumeric: 'tabular-nums'}}>Steg {stepNo} av {tot}</div>
            </div>
            <div style={{marginTop: 14, position: 'relative', borderRadius: 28, background: T.card, border: `1px solid ${T.line}`,
              boxShadow: '0 12px 30px -18px hsl(270 65% 73% / .35)', overflow: 'hidden', padding: '20px 16px 18px', textAlign: 'center',
              opacity: cardO, transform: `translateX(${cardX}px)`}}>
              <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 5, background: T.gradHero}} />
              {isLast && (
                <div style={{display: 'inline-flex', padding: '4px 14px', borderRadius: 999, background: 'rgba(34,197,94,.1)', color: '#16a34a',
                  border: '1px solid rgba(34,197,94,.2)', fontSize: 19, fontWeight: 500, marginBottom: 6}}>Sista steget.</div>
              )}
              <div style={{marginBottom: 4, height: 36}}><Img src={staticFile(st.emoji || subjectEmoji)} style={{width: 34, height: 34}} /></div>
              <div style={{fontFamily: FRED, fontWeight: 700, fontSize: 26, lineHeight: 1.2, marginBottom: 8}}>{st.title}</div>
              <div style={{fontSize: 19, lineHeight: 1.5, color: T.muted}}>{st.text}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 14, position: 'relative'}}>
              {ringP > 0 && ringP < 1 && (
                <div style={{position: 'absolute', left: '50%', top: 28, width: 120, height: 120, borderRadius: 999,
                  border: `2px solid ${T.turk}`, transform: `translate(-50%,-50%) scale(${0.5 + ringP * 0.9})`, opacity: 1 - ringP}} />
              )}
              <div style={{height: 56, padding: '0 34px', borderRadius: 999, background: T.turk, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 19, fontWeight: 600, color: T.fg, transform: `scale(${press})`, boxShadow: '0 0 24px hsl(183 64% 70% / .45)'}}>
                Klar
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
};

const Coins = ({start, end, amount = 15}) => {
  const f = useCurrentFrame();
  const s = useSpring(start + 2, {damping: 14, mass: 0.8});
  const n = Math.round(interpolate(f, [start + 10, start + 28], [0, amount], {...clamp, easing: ease}));
  const glow = interpolate(f, [start + 8, start + 24, start + 48], [0, 1, 0.55], clamp);
  return (
    <Scene start={start} end={end}>
      <div style={{width: 200, height: 200, borderRadius: '50%', marginBottom: 60,
        background: 'radial-gradient(circle at 35% 32%, #ffe08a, #f9b12b 58%, #d39670)',
        boxShadow: `0 0 0 18px rgba(249,177,43,${0.18 * glow}), 0 0 120px rgba(249,177,43,${0.45 * glow})`,
        transform: `scale(${s}) rotate(${(1 - s) * -40}deg)`}} />
      <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 124, lineHeight: 1.12, color: C.white}}>Läxan är klar.</div>
      <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 124, lineHeight: 1.12, color: C.gold}}>+{n} coins.</div>
    </Scene>
  );
};

const EndCard = ({start}) => {
  const f = useCurrentFrame();
  const mark = useSpring(start + 2, {damping: 200});
  const tag = useSpring(start + 16);
  const cta = useSpring(start + 26, {damping: 18});
  const sweep = interpolate(f, [start + 42, start + 70], [-40, 140], clamp);
  const draw = interpolate(f, [start + 2, start + 18], [0, 1], {...clamp, easing: ease});
  return (
    <Scene start={start} end={99999} last justify="flex-start" padTop={20}>
      <Img src={staticFile('heroworks-logo.svg')} style={{width: 300, height: 364, marginBottom: 70, alignSelf: 'flex-start',
        opacity: mark, clipPath: `inset(0 0 ${(1 - draw) * 100}% 0)`, transform: `translateY(${(1 - mark) * 24}px)`}} />
      <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 96, lineHeight: 1.15, color: C.white, marginBottom: 78,
        opacity: tag, transform: `translateY(${(1 - tag) * 30}px)`}}>Gör läxan.<br />Rädda kvällen.</div>
      <div style={{alignSelf: 'flex-start', position: 'relative', overflow: 'hidden', background: C.white, color: C.navy,
        fontFamily: INTER, fontWeight: 700, fontSize: 60, padding: '34px 44px', borderRadius: 999, whiteSpace: 'nowrap',
        opacity: cta, transform: `scale(${interpolate(cta, [0, 1], [0.9, 1])})`, boxShadow: '0 20px 60px rgba(132,222,227,.25)'}}>
        Starta gratis · heroworks.se
        <div style={{position: 'absolute', top: 0, bottom: 0, left: `${sweep}%`, width: '28%',
          background: 'linear-gradient(90deg, transparent, rgba(132,222,227,.35), transparent)', transform: 'skewX(-20deg)'}} />
      </div>
    </Scene>
  );
};

export const useFontsReady = () => {
  const [h] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    Promise.all([
      document.fonts.load('600 40px Fredoka'), document.fonts.load('700 40px Fredoka'),
      document.fonts.load('400 20px Inter'), document.fonts.load('500 20px Inter'), document.fonts.load('700 20px Inter'),
    ]).then(() => document.fonts.ready).then(() => continueRender(h)).catch(() => continueRender(h));
  }, [h]);
};

// ---------- ListItem: en rad i ett listformat (Trend). Etikett-pill (valfri bock) + stor rad. ----------
const ListItem = ({start, end, label, line, instant = false, size = 128, check = true, pillColor = C.turk}) => (
  <Scene start={start} end={end} instant={instant} justify="center">
    <Pill from={start} check={check} instant={instant} color={pillColor}>{label}</Pill>
    <div style={{fontFamily: FRED, fontWeight: 600, fontSize: size, lineHeight: 1.08, color: C.white, marginTop: 56}}>{line}</div>
  </Scene>
);

// =================== Manus: "Tyst vid köksbordet. Misstänkt tyst." (Reels-labb 30 sept 2026, Ögonblicket, posta 14 okt) ===================
export const DUR = 525; // 17,5 s

const Hook = () => (
  <Scene start={0} end={56} instant justify="flex-end">
    <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 120, lineHeight: 1.08, color: C.white}}>Tyst vid<br />köksbordet.</div>
    <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 150, lineHeight: 1.05, color: C.turk, marginTop: 26}}>Misstänkt tyst.</div>
  </Scene>
);

const Peek = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [80, 92], [0, 1], clamp);
  return (
    <Scene start={56} end={118} justify="flex-end">
      <Words text="Du tittar in." from={58} stagger={3}
        style={{fontFamily: FRED, fontWeight: 600, fontSize: 120, lineHeight: 1.1, color: C.white}} />
      <div style={{fontFamily: INTER, fontSize: 64, lineHeight: 1.35, color: C.blush, marginTop: 30, opacity: o}}>Steg 4 av 12. Hen gör det själv.</div>
    </Scene>
  );
};

const Founder = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [136, 148], [0, 1], clamp);
  return (
    <Scene start={118} end={188}>
      <Pill from={118} color={C.lav}>Bella, grundare</Pill>
      <Words text="Jag är mamma till två." from={121} stagger={3}
        style={{fontFamily: FRED, fontWeight: 600, fontSize: 112, lineHeight: 1.1, color: C.white, marginTop: 50}} />
      <div style={{fontFamily: INTER, fontSize: 60, lineHeight: 1.35, color: C.blush, marginTop: 30, opacity: o}}>
        Jag byggde det jag själv saknade vid köksbordet.
      </div>
    </Scene>
  );
};

const STEPS = [
  {title: '6 + 7 =', text: 'Räkna ut. Skriv svaret.'},
  {title: '8 + 8 =', text: 'Räkna ut. Skriv svaret.'},
  {title: '5 + 9 =', text: 'Räkna ut. Skriv svaret.'},
];

const Promise_ = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [352, 364], [0, 1], clamp);
  return (
    <Scene start={328} end={382}>
      <Words text="Ditt barn gör läxan själv." from={330} stagger={3}
        style={{fontFamily: FRED, fontWeight: 600, fontSize: 108, lineHeight: 1.1, color: C.white}} />
      <Words text="Ett steg i taget." from={342} stagger={3}
        style={{fontFamily: FRED, fontWeight: 600, fontSize: 108, lineHeight: 1.1, color: C.turk, marginTop: 10}} />
      <div style={{fontFamily: INTER, fontSize: 60, lineHeight: 1.35, color: C.blush, marginTop: 36, opacity: o}}>Du behöver inte förklara.</div>
    </Scene>
  );
};

export const Reel = () => { useFontsReady(); return (
  <AbsoluteFill>
    <Background />
    <PhotoBg src="klocka.jpg" start={0} end={118} instant zoom={[1.0, 1.14]} origin="58% 22%" shade="bottom" />
    <Hook />
    <Peek />
    <Founder />
    <AppStepView start={188} end={328} steps={STEPS} total={12} first={4} />
    <Promise_ />
    <Coins start={382} end={432} />
    <EndCard start={432} />
  </AbsoluteFill>
);};
