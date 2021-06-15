import React from 'https://dev.jspm.io/react';
import { ObsidianWrapper } from 'https://deno.land/x/obsidian/clientMod.ts';
import MainContainer from './MainContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const App = () => {
  return (
    <ObsidianWrapper>
      <MainContainer />
    </ObsidianWrapper>
  );
};

export default App;
