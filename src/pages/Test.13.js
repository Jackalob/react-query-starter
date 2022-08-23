import { useSuperHeros } from "../hooks/useSuperHeros";

function Test13Page() {
  const { data, isLoading, isFetching, refetch } =
    useSuperHeros({
      enabled: false,
    });

  return (
    <>
      React Query Super Heroes Page Test 13
      <button onClick={refetch}>fetch data</button>
      {data ? (
        data.map((hero) => (
          <div key={hero.name}>
            {hero.name} - {hero.randomToken}
          </div>
        ))
      ) : isLoading && !isFetching ? (
        <span style={{ marginLeft: "8px" }}>Not ready ...</span>
      ) : (
        <span style={{ marginLeft: "8px" }}>Loading ...</span>
      )}
    </>
  );
}

export default Test13Page;
