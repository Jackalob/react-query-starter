import { useState } from "react";
import { useSuperHeros, useAddSuperHero } from "../hooks/superHeros";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alertEgo, setAlertEgo] = useState("");
  const { data, isLoading, isError, error, isFetching } = useSuperHeros();
  const { mutate: addHero, isLoading: isMutating } = useAddSuperHero();

  const handleAdd = () => {
    addHero({ name, alertEgo, show: true });
    setName("");
    setAlertEgo("");
  };

  return (
    <>
      React Query Super Heroes Page
      <div>
        name: <input value={name} onChange={(e) => setName(e.target.value)} />
        alertEgo:{" "}
        <input value={alertEgo} onChange={(e) => setAlertEgo(e.target.value)} />
        <button onClick={handleAdd} disabled={isMutating}>
          add
        </button>
      </div>
      {data ? (
        data.map((hero) => (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        ))
      ) : isLoading && !isFetching ? (
        <span style={{ marginLeft: "8px" }}>Not ready ...</span>
      ) : (
        <span style={{ marginLeft: "8px" }}>Loading ...</span>
      )}
    </>
  );
};
