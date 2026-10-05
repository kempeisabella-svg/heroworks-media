import React from 'react';
import {registerRoot, Composition, Still} from 'remotion';
import '@fontsource/fredoka/600.css';
import '@fontsource/fredoka/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import {Reel, DUR} from './Reel';
import {Karusell, Story, Omslag} from './Stills';

// Stillbilderna har inga exempeltexter: allt skickas med --props (se reels-mall/README.md), annars följer gammal text med.
const Root = () => (
  <>
    <Composition id="Reel" component={Reel} durationInFrames={DUR} fps={30} width={1080} height={1920} />
    <Still id="Karusell" component={Karusell} width={1080} height={1350}
      defaultProps={{}} />
    <Still id="Story" component={Story} width={1080} height={1920}
      defaultProps={{}} />
    <Still id="Omslag" component={Omslag} width={1080} height={1920}
      defaultProps={{}} />
  </>
);
registerRoot(Root);
