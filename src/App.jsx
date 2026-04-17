import { useState } from 'react';
import PublicGists from './components/PublicGists';
import UserGists from './components/UserGists';
import './App.css';

function App() {
  const [username, setUsername] = useState('');  // Para Iteration 2+

  return (
    <div className="App">
      <h1>React Custom Hooks Lab</h1>
      <PublicGists />
      <hr />
      <UserGists username={username} onUsernameChange={setUsername} />
    </div>
  );
};

export default App;
