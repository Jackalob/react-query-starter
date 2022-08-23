import { useSuperHeros } from "../hooks/useSuperHeros";

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => console.log(data, "It's working!!");

  const onError = (error) => console.log(error, "Uh.., something wrong.");

  const { data, isLoading, isError, error, isFetching } = useSuperHeros({
    onSuccess,
    onError,
  });

  console.log({ isLoading, isFetching, data });

  if (isFetching) return <h2>Loading...</h2>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      React Query Super Heroes Page
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
};
