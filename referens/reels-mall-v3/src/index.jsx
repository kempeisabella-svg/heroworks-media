import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {Reel, durationFor} from './Reel.jsx';

const defaults = {
  hook1: '”Jag gör den sen.”', hook2: 'Klockan 17:30.',
  hookShots: [{src: 'ai_friktion_10.jpg', pos: '50% 40%', from: 0}],
  scen1: 'Läxbladet ligger kvar.', scen2: 'Sen blir det 18:00.',
  scenShots: [{src: 'ai_kok_04.jpg', pos: '50% 50%', from: 0}],
  knep: 'Peka på uppgift 1. Säg inget mer.',
  knepShots: [{src: 'ai_hander_01.jpg', pos: '50% 40%', from: 0}, {src: 'ai_laxblad_kvallsljus_1.jpg', pos: '50% 30%', from: 50}],
  step1: {n: 1, emoji: 'e-rakna.png', task: '6 + 7 =', instr: 'Räkna ut. Skriv svaret.'},
  step2: {n: 2, emoji: 'e-rakna.png', task: '8 + 5 =', instr: 'Räkna ut. Skriv svaret.'},
  spel: false,
};

registerRoot(() => (
  <Composition id="Reel" component={Reel} width={1080} height={1920} fps={30}
    durationInFrames={durationFor(defaults)} defaultProps={defaults}
    calculateMetadata={({props}) => ({durationInFrames: durationFor(props)})} />
));
