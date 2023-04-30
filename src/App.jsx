import {useFetch} from "./useFetch";
import Error from "./components/Error";
import Loading from "./components/Loading";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const {data, loading, error} = useFetch("https://rickandmortyapi.com/api/character");
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {error && <Error message={error} />}
          {loading && <Loading />}
          {data?.results?.map((character, index) => (
            <div className="col-auto mb-4" key={character.id}>
              <div className="card">
                <img src={character.image} className="card-img-top" alt={character.name} />
                <div className="card-body">
                  <h5 className="card-title">{character.name}</h5>
                  <p className="card-text">
                    {character.status}, {character.species}, {character.gender}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
