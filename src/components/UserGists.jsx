import { useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function UserGists({ username, onUsernameChange }) {
  const [userInput, setUserInput] = useState(username);
  
  const { data: gists, loading, error } = useFetch(
    username ? `https://api.github.com/users/${username}/gists` : null
  );

  const handleSearch = () => {
    onUsernameChange(userInput);
  };

  if (!username) return (
    <div>
      <h2>Gists de Usuario</h2>
      <input 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ingresa un username de GitHub"
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );

  if (loading) return <p>Cargando gists de {username}...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Gists de @{username}</h2>
      {gists.length === 0 ? (
        <p>No hay gists públicos</p>
      ) : (
        <ul>
          {gists.map(gist => (
            <li key={gist.id}>
              <strong>{gist.description || 'Sin descripción'}</strong>
              <br />
              <a href={gist.html_url} target="_blank">Ver en GitHub</a>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => onUsernameChange('')}>Limpiar</button>
    </div>
  );
}