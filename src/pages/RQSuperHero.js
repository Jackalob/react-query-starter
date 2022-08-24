import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHero } from "../hooks/superHeros";

function RQSuperHeroPage() {
  const { heroId } = useParams();
  const { data, isLoading, isFetching } = useSuperHero(parseInt(heroId));

  return (
    <>
      React Query Super Heroes Page
      {data ? (
        <div key={data.id}>{data.name}</div>
      ) : isLoading && !isFetching ? (
        <span style={{ marginLeft: "8px" }}>Not ready ...</span>
      ) : (
        <span style={{ marginLeft: "8px" }}>Loading ...</span>
      )}
    </>
  );
}

export default RQSuperHeroPage;
