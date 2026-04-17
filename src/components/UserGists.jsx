import { useState } from 'react';
import useFetch from '../hooks/useFetch';

export default function UserGists() {
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');

  const { data: gists, loading, error } = useFetch(
    searchUsername ? `https://api.github.com/users/${searchUsername}/gists` : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchUsername(username.trim());
  };

  return (
    <div>
      <h2>Gists de Usuario</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa un username de GitHub"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && searchUsername && <p>Cargando gists de {searchUsername}...</p>}
      {error && <p>Error: {error.message}</p>}

      {!loading && !error && searchUsername && (
        <>
          {gists.length === 0 ? (
            <p>No hay gists públicos.</p>
          ) : (
            <ul>
              {gists.map((gist) => (
                <li key={gist.id}>
                  <strong>{gist.description || 'Sin descripción'}</strong>
                  <br />
                  <a href={gist.html_url} target="_blank" rel="noreferrer">
                    Ver en GitHub
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
