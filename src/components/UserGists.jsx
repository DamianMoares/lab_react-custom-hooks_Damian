import { useState } from "react";
import useFetch from "../hooks/useFetch";

export default function UserGists() {
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");

  const { data: gists, loading, error } = useFetch(
    query ? `https://api.github.com/users/${query}/gists` : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(username);
  };

  return (
    <div>
      <h2>Gists de Usuario</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingresa un username de GitHub"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && query && <p>Cargando gists de {query}...</p>}
      {error && <p>Error: {error.message}</p>}

      {!loading && !error && query && (
        <ul>
          {gists.map((gist) => (
            <li key={gist.id}>
              <strong>{gist.description || "Sin descripción"}</strong>
              <br />
              <a href={gist.html_url} target="_blank" rel="noreferrer">
                Ver en GitHub
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
