import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame, useVideoConfig,
  staticFile, continueRender, delayRender, Easing,
} from 'remotion';

// ---- Tokens: exakt ur src/index.css (Heroworks – design system) ----
export const C = {
  background: 'hsl(350 35% 97%)',
  card: 'hsl(0 0% 100%)',
  foreground: 'hsl(236 63% 16%)',
  primary: 'hsl(183 64% 70%)',
  secondary: 'hsl(270 65% 73%)',
  muted: 'hsl(359 66% 89%)',
  line: 'hsl(270 33% 91%)',
  lineStrong: 'hsl(265 26% 84%)',
  ink2: 'hsl(300 13% 32%)',
  accentInk2: 'hsl(268 51% 54%)',
  surfaceMint: 'hsl(185 55% 94%)',
  surfaceLavender: 'hsl(273 60% 95%)',
  surfaceSun: 'hsl(42 100% 92%)',
  surfaceRose: 'hsl(356 76% 96%)',
  shadowCard: '0 4px 20px hsl(270 20% 85% / 0.3)',
};
export const FRED = 'Fredoka, sans-serif';
export const INTER = 'Inter, sans-serif';
const R_CARD = 22, R_PILL = 999, R_CHIP = 12;

export const useFontsReady = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const css = `
      @font-face{font-family:Fredoka;font-weight:600;src:url(${staticFile('fredoka-600.woff2')}) format('woff2')}
      @font-face{font-family:Fredoka;font-weight:500;src:url(${staticFile('fredoka-500.woff2')}) format('woff2')}
      @font-face{font-family:Inter;font-weight:600;src:url(${staticFile('inter-600.woff2')}) format('woff2')}
      @font-face{font-family:Inter;font-weight:500;src:url(${staticFile('inter-500.woff2')}) format('woff2')}
      @font-face{font-family:Inter;font-weight:400;src:url(${staticFile('inter-400.woff2')}) format('woff2')}`;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    Promise.all([
      document.fonts.load('600 80px Fredoka'), document.fonts.load('500 40px Fredoka'),
      document.fonts.load('600 48px Inter'), document.fonts.load('500 40px Inter'), document.fonts.load('400 40px Inter'),
    ]).then(() => continueRender(h)).catch(() => continueRender(h));
  }, [h]);
};

// ---- Tidslinje (bildrutor, 30 fps) ----
export const T = {hook: 60, scen: 75, knep: 80, barn: 100, spel: 50, slut: 95};
export const durationFor = (p) => T.hook + T.scen + T.knep + T.barn + (p.spel ? T.spel : 0) + T.slut;

// ---- Delar ----
// Stilla foto med en långsam, knappt synlig push-in (1,00 → 1,04 över skottet). Ingen övergång.
const Photo = ({src, pos = '50% 50%', t = 0}) => (
  <AbsoluteFill>
    <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${1 + 0.04 * t})`, transformOrigin: pos}} />
  </AbsoluteFill>
);

// Hårt klipp mellan foton: lista av {src,pos,from}
const Shots = ({shots, len}) => {
  const f = useCurrentFrame();
  let cur = shots[0], next = null;
  for (let i = 0; i < shots.length; i++) if (f >= shots[i].from) { cur = shots[i]; next = shots[i + 1] || null; }
  const end = next ? next.from : len;
  const t = Math.min(1, Math.max(0, (f - cur.from) / Math.max(1, end - cur.from)));
  return <Photo src={cur.src} pos={cur.pos} t={t} />;
};

const HookCard = ({line1, line2}) => (
  <div style={{position: 'absolute', left: 72, right: 72, top: 330}}>
    <div style={{background: C.card, borderRadius: R_CARD, padding: '44px 52px', boxShadow: C.shadowCard}}>
      <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 84, lineHeight: 1.08, color: C.foreground, letterSpacing: -0.5}}>{line1}</div>
      {line2 ? <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 72, lineHeight: 1.1, color: C.accentInk2, marginTop: 14}}>{line2}</div> : null}
    </div>
  </div>
);

// Undertext-pill: Inter 600 46px, foreground på card, nedre tredjedelen av säkerzonen.
const Sub = ({text, y = 1300, from = 0, accent}) => {
  const f = useCurrentFrame();
  const o = interpolate(f - from, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dy = interpolate(f - from, [0, 6], [12, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  if (f < from) return null;
  return (
    <div style={{position: 'absolute', left: 72, right: 72, top: y, display: 'flex', justifyContent: 'center', opacity: o, transform: `translateY(${dy}px)`}}>
      <div style={{background: C.card, color: accent ? C.accentInk2 : C.foreground, fontFamily: INTER, fontWeight: 600, fontSize: 46, lineHeight: 1.2, padding: '20px 36px', borderRadius: R_PILL, boxShadow: C.shadowCard, textAlign: 'center', maxWidth: 900}}>{text}</div>
    </div>
  );
};

const KnepCard = ({text}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 6], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 72, right: 72, top: 640, opacity: o}}>
      <div style={{background: C.card, borderRadius: R_CARD, padding: '44px 52px 52px', boxShadow: C.shadowCard}}>
        <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 30, letterSpacing: 4, textTransform: 'uppercase', color: C.accentInk2, marginBottom: 18}}>Kvällsknep</div>
        <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 70, lineHeight: 1.1, color: C.foreground}}>{text}</div>
      </div>
    </div>
  );
};

// ---- Barnvyn: StepCard enligt design systemet, skala 2.2 från 440 px ----
const S = 2.2;
const StepStrip = ({total, done}) => (
  <div style={{display: 'flex', gap: 8 * S, margin: `0 ${16 * S}px`}}>
    {Array.from({length: total}).map((_, i) => (
      <div key={i} style={{flex: 1, height: 10 * S, borderRadius: R_PILL, background: i < done ? C.primary : C.muted, overflow: 'hidden', position: 'relative'}}>
        {i === done - 1 ? <div style={{position: 'absolute', inset: 0, background: C.primary, transformOrigin: 'left', transform: `scaleX(${1})`}} /> : null}
      </div>
    ))}
  </div>
);

const StepCard = ({n, total, emoji, task, instr, enterFrame, pressFrame, done}) => {
  const f = useCurrentFrame();
  const e = interpolate(f - enterFrame, [0, 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  const press = pressFrame != null ? interpolate(f - pressFrame, [0, 4, 9], [1, 0.96, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  const fill = pressFrame != null ? interpolate(f - pressFrame, [4, 16], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)}) : 0;
  if (f < enterFrame) return null;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, opacity: e, transform: `translateX(${(1 - e) * 40 * S}px)`}}>
      <div style={{fontFamily: INTER, fontWeight: 600, fontSize: 15 * S, color: C.ink2, margin: `0 ${16 * S}px ${8 * S}px`}}>Steg {n} av {total}</div>
      <div style={{display: 'flex', gap: 8 * S, margin: `0 ${16 * S}px`}}>
        {Array.from({length: total}).map((_, i) => (
          <div key={i} style={{flex: 1, height: 10 * S, borderRadius: R_PILL, background: C.muted, overflow: 'hidden'}}>
            <div style={{height: '100%', background: C.primary, transformOrigin: 'left', transform: `scaleX(${i < done ? 1 : i === n - 1 ? fill : 0})`}} />
          </div>
        ))}
      </div>
      <div style={{margin: `${24 * S}px ${16 * S}px 0`, background: C.card, border: `1px solid ${C.line}`, borderRadius: R_CARD * 1.3, padding: 24 * S, boxShadow: C.shadowCard}}>
        <Img src={staticFile(emoji)} style={{width: 40 * S, height: 40 * S}} />
        <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 34 * S, color: C.foreground, marginTop: 12 * S, lineHeight: 1.05}}>Steg {n}</div>
        <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 20 * S, color: C.foreground, marginTop: 12 * S, lineHeight: 1.35, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 * S}}>
          <span style={{fontFamily: FRED, fontWeight: 600, fontSize: 26 * S, fontVariantNumeric: 'tabular-nums', background: C.surfaceLavender, color: C.foreground, borderRadius: R_CHIP, padding: `${4 * S}px ${12 * S}px`}}>{task}</span>
          <span>{instr}</span>
        </div>
        <div style={{marginTop: 24 * S, height: 60 * S, borderRadius: R_PILL, background: C.primary, color: C.foreground, fontFamily: INTER, fontWeight: 600, fontSize: 18 * S, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${press})`}}>Klar</div>
      </div>
    </div>
  );
};

const BarnVy = ({step1, step2}) => {
  const f = useCurrentFrame();
  const press = 42, swap = 58;
  return (
    <AbsoluteFill style={{background: C.background}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 430, fontFamily: FRED, fontWeight: 600, fontSize: 22 * S, color: C.foreground, margin: `0 ${16 * S}px`}}>Liv</div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 520}}>
        {f < swap ? <StepCard n={step1.n} total={8} emoji={step1.emoji} task={step1.task} instr={step1.instr} enterFrame={0} pressFrame={press} done={step1.n - 1} /> : null}
        {f >= swap ? <StepCard n={step1.n + 1} total={8} emoji={step2.emoji} task={step2.task} instr={step2.instr} enterFrame={swap} pressFrame={null} done={step1.n} /> : null}
      </div>
      <Sub text="Ett steg i taget." y={1340} from={8} />
    </AbsoluteFill>
  );
};

const SpelRuta = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: C.surfaceLavender, justifyContent: 'center', alignItems: 'center', opacity: o}}>
      <div style={{margin: '0 72px', background: C.card, borderRadius: R_CARD, padding: '56px 60px', boxShadow: C.shadowCard}}>
        <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 74, lineHeight: 1.1, color: C.foreground}}>Ja, Heroworks gör läxan till ett spel.</div>
        <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 74, lineHeight: 1.1, color: C.accentInk2, marginTop: 18}}>Ett lugnt spel.</div>
        <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 38, lineHeight: 1.35, color: C.ink2, marginTop: 28}}>Inga straff. Inga lootboxar. Ingen tidspress. Det går inte att förlora.</div>
      </div>
    </AbsoluteFill>
  );
};

const SlutKort = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  const pill = interpolate(f, [14, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: C.background, justifyContent: 'center', alignItems: 'center', opacity: o}}>
      <Img src={staticFile('heroworks-logo.svg')} style={{height: 300, marginBottom: 56}} />
      <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 78, lineHeight: 1.1, color: C.foreground, textAlign: 'center'}}>Gör läxan.<br />Rädda kvällen.</div>
      <div style={{marginTop: 56, opacity: pill, background: C.foreground, color: C.card, fontFamily: INTER, fontWeight: 600, fontSize: 40, padding: '26px 48px', borderRadius: R_PILL}}>Starta gratis · heroworks.se</div>
    </AbsoluteFill>
  );
};

// ---- Reel ----
export const Reel = (p) => {
  useFontsReady();
  let at = 0;
  const seq = (len) => { const from = at; at += len; return {from, durationInFrames: len}; };
  const sHook = seq(T.hook), sScen = seq(T.scen), sKnep = seq(T.knep), sBarn = seq(T.barn);
  const sSpel = p.spel ? seq(T.spel) : null; const sSlut = seq(T.slut);
  return (
    <AbsoluteFill style={{background: C.background}}>
      <Sequence {...sHook}>
        <Shots shots={p.hookShots} len={T.hook} />
        <HookCard line1={p.hook1} line2={p.hook2} />
      </Sequence>
      <Sequence {...sScen}>
        <Shots shots={p.scenShots} len={T.scen} />
        <Sub text={p.scen1} y={1210} from={0} />
        <Sub text={p.scen2} y={1330} from={30} accent />
      </Sequence>
      <Sequence {...sKnep}>
        <Shots shots={p.knepShots} len={T.knep} />
        <KnepCard text={p.knep} />
        <Sub text="Spara till nästa läxkväll." y={1340} from={40} />
      </Sequence>
      <Sequence {...sBarn}><BarnVy step1={p.step1} step2={p.step2} /></Sequence>
      {sSpel ? <Sequence {...sSpel}><SpelRuta /></Sequence> : null}
      <Sequence {...sSlut}><SlutKort /></Sequence>
    </AbsoluteFill>
  );
};
