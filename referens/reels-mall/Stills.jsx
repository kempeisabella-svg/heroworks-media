import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C, FRED, INTER, Background, useFontsReady} from './Reel';

// Stillbilder i samma stil som reelsen. Allt styrs med props (--props='{"...": ...}'), så Claude byter bara text.
// Karusell 1080×1350 · Story 1080×1920 (nedre tredjedelen tom för klistermärket) · Omslag 1080×1920 (reelens omslag).

const SHADE = {
  heavy: 'linear-gradient(180deg, rgba(15,19,64,.58) 0%, rgba(15,19,64,.74) 45%, rgba(15,19,64,.86) 100%)',
  bottom: 'linear-gradient(180deg, rgba(15,19,64,.15) 0%, rgba(15,19,64,.55) 45%, rgba(15,19,64,.94) 78%, rgba(15,19,64,.97) 100%)',
};

const Bg = ({photo, shade = 'heavy', origin = '50% 40%'}) => (
  <>
    <Background />
    {photo && (
      <AbsoluteFill>
        <Img src={staticFile(photo)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: origin}} />
        <AbsoluteFill style={{background: SHADE[shade]}} />
      </AbsoluteFill>
    )}
  </>
);

const Label = ({children, color = C.turk, fg = C.navy, size = 40}) => (
  <div style={{alignSelf: 'flex-start', background: color, color: fg, fontFamily: INTER, fontWeight: 700, fontSize: size,
    padding: `${size * 0.36}px ${size * 0.8}px`, borderRadius: 999, whiteSpace: 'nowrap'}}>{children}</div>
);

const Check = ({size = 54}) => (
  <div style={{flex: '0 0 auto', width: size, height: size, borderRadius: 999, background: C.turk, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6}}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" stroke={C.navy} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
  </div>
);

const Counter = ({n, of}) => (n && of ? (
  <div style={{position: 'absolute', top: 64, right: 72, fontFamily: INTER, fontWeight: 500, fontSize: 34, color: 'rgba(255,255,255,.7)',
    fontVariantNumeric: 'tabular-nums'}}>{n}/{of}</div>
) : null);

const Signature = () => (
  <div style={{position: 'absolute', left: 96, bottom: 72, fontFamily: INTER, fontWeight: 500, fontSize: 32, color: 'rgba(255,255,255,.6)'}}>heroworks.se</div>
);

// ---------- Karusell (1080×1350) ----------
// kind: "hook" | "text" | "spara" | "cta"
//  hook:  title (vit), accent (turkos, valfri), photo (valfri)
//  text:  label (valfri pill), title, body
//  spara: label (standard "Spara till i kväll"), title, items[] (max 5, korta)
//  cta:   title (standard "Gör läxan. Rädda kvällen."), cta (standard "Starta gratis · heroworks.se")
export const Karusell = ({kind = 'text', title = '', accent = '', body = '', label = '', items = [], photo = null, n = null, of = null,
  cta = 'Starta gratis · heroworks.se'}) => {
  useFontsReady();
  const pad = {position: 'absolute', left: 96, right: 96, top: 150, bottom: 170, display: 'flex', flexDirection: 'column'};
  return (
    <AbsoluteFill>
      <Bg photo={photo} shade={kind === 'hook' ? 'bottom' : 'heavy'} />
      <Counter n={n} of={of} />
      {kind === 'hook' && (
        <div style={{...pad, justifyContent: 'flex-end'}}>
          <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 112, lineHeight: 1.06, color: C.white}}>{title}</div>
          {accent && <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 112, lineHeight: 1.06, color: C.turk, marginTop: 18}}>{accent}</div>}
        </div>
      )}
      {kind === 'text' && (
        <div style={{...pad, justifyContent: 'center'}}>
          {label && <Label>{label}</Label>}
          <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 84, lineHeight: 1.1, color: C.white, marginTop: label ? 44 : 0}}>{title}</div>
          {body && <div style={{fontFamily: INTER, fontSize: 46, lineHeight: 1.42, color: C.blush, marginTop: 36}}>{body}</div>}
        </div>
      )}
      {kind === 'spara' && (
        <div style={{...pad, justifyContent: 'center'}}>
          <Label color={C.lav}>{label || 'Spara till i kväll'}</Label>
          {title && <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 76, lineHeight: 1.1, color: C.white, marginTop: 40}}>{title}</div>}
          <div style={{display: 'flex', flexDirection: 'column', gap: 30, marginTop: 44}}>
            {items.slice(0, 5).map((t, i) => (
              <div key={i} style={{display: 'flex', gap: 28, alignItems: 'flex-start'}}>
                <Check />
                <div style={{fontFamily: INTER, fontWeight: 500, fontSize: 46, lineHeight: 1.32, color: C.white}}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {kind === 'cta' && (
        <div style={{...pad, justifyContent: 'center'}}>
          <Img src={staticFile('heroworks-logo.svg')} style={{width: 210, height: 255, marginBottom: 56}} />
          <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 92, lineHeight: 1.12, color: C.white, marginBottom: 60}}>
            {(title || 'Gör läxan. Rädda kvällen.').split('. ').map((p, i, a) => <div key={i}>{p}{i < a.length - 1 ? '.' : ''}</div>)}
          </div>
          <div style={{alignSelf: 'flex-start', background: C.white, color: C.navy, fontFamily: INTER, fontWeight: 700, fontSize: 50,
            padding: '30px 42px', borderRadius: 999, whiteSpace: 'nowrap', boxShadow: '0 20px 60px rgba(132,222,227,.25)'}}>{cta}</div>
          <div style={{fontFamily: INTER, fontSize: 38, color: C.blush, marginTop: 30}}>Länk i bio</div>
        </div>
      )}
      {kind !== 'cta' && <Signature />}
    </AbsoluteFill>
  );
};

// ---------- Story (1080×1920) ----------
// type: "fraga" | "omrostning". Texten ligger i y 300–1150; y 1250–1700 lämnas tomt för klistermärket.
export const Story = ({type = 'fraga', line = '', sub = '', photo = null}) => {
  useFontsReady();
  const tag = type === 'omrostning' ? 'Rösta' : 'Fråga till dig';
  return (
    <AbsoluteFill>
      <Bg photo={photo} />
      <div style={{position: 'absolute', left: 96, right: 96, top: 300, height: 850, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
        <Label color={type === 'omrostning' ? C.lav : C.turk} size={42}>{tag}</Label>
        <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 104, lineHeight: 1.1, color: C.white, marginTop: 44}}>{line}</div>
        {sub && <div style={{fontFamily: INTER, fontSize: 50, lineHeight: 1.4, color: C.blush, marginTop: 32}}>{sub}</div>}
      </div>
      <div style={{position: 'absolute', left: 96, bottom: 120, fontFamily: INTER, fontWeight: 500, fontSize: 34, color: 'rgba(255,255,255,.55)'}}>heroworks.se</div>
    </AbsoluteFill>
  );
};

// ---------- Omslag (1080×1920) ----------
// Reelens omslag. Texten hålls inom mitten (y 420–1500) så att den syns i profilrutnätet (3:4-beskärning).
export const Omslag = ({title = '', accent = '', photo = null, origin = '50% 40%'}) => {
  useFontsReady();
  return (
    <AbsoluteFill>
      <Bg photo={photo} shade="bottom" origin={origin} />
      <div style={{position: 'absolute', left: 96, right: 96, top: 420, height: 1080, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
        <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 120, lineHeight: 1.06, color: C.white}}>{title}</div>
        {accent && <div style={{fontFamily: FRED, fontWeight: 600, fontSize: 132, lineHeight: 1.04, color: C.turk, marginTop: 22}}>{accent}</div>}
      </div>
    </AbsoluteFill>
  );
};
