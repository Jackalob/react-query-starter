import { useSuperHeros } from "../hooks/superHeros";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const { data, isLoading, isError, error, isFetching } = useSuperHeros();

  return (
    <>
      React Query Super Heroes Page
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
