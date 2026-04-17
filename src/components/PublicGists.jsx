import useFetch from "../hooks/useFetch";

export default function PublicGists() {
  const { data: gists, loading, error } = useFetch("https://api.github.com/gists/public");

  if (loading) return <p>Cargando gists públicos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Gists Públicos</h2>
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
    </div>
  );
}
