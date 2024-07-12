import React from 'react';
import './App.css';

import PROFILE from './components/Profile/profile.js'
import BACKGROUND from './components/Background/background.js'
import SKILLS from './components/Skills/skills.js'
import LINKS from './components/Links/links.js'
import GsALGORITHM from './components/GS-Algorithm/gs-algorithm.js'
import BLACKBOX from './components/Blackbox/blackbox.js'

function App() {
  return (
    <div className="App">
      <PROFILE />
      <BACKGROUND />
      <SKILLS />
      <LINKS />
      <GsALGORITHM />
      <BLACKBOX />
      <BLACKBOX />
      <BLACKBOX />
      <BLACKBOX />
    </div>
  );
}

export default App;
