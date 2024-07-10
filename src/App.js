import './App.css';

import PROFILE from './components/Profile/profile.js'
import BACKGROUND from './components/Background/background.js'
import SKILLS from './components/Skills/skills.js'
import LINKS from './components/Links/links.js'

function App() {
  return (
    <div className="App">
      <PROFILE />
      <BACKGROUND />
      <SKILLS />
      <LINKS />
    </div>
  );
}

export default App;
