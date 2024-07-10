import './App.css';

import PROFILE from './components/Profile/profile'
import BACKGROUND from './components/Background/background'
import SKILLS from './components/Skills/skills'
import LINKS from './components/Links/links'

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
