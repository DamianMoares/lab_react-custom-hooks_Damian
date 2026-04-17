import PublicGists from './components/PublicGists';
import UserGists from './components/UserGists';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React Custom Hooks Lab</h1>
      <PublicGists />
      <hr />
      <UserGists />
    </div>
  );
}

export default App;
