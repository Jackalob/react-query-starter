import React from "react";
import axios from "axios";
import { useQueries } from "@tanstack/react-query";

const fetchSuperhero = ({ queryKey }) =>
  axios.get(`http://localhost:4000/superheroes/${queryKey[1]}`).then(res => res.data);

function DynamicParallel({ heroId }) {
  const queries = heroId.map((id) => ({
    queryKey: ["super-hero", id],
    queryFn: fetchSuperhero,
  }));

  const queriesData = useQueries({
    queries,
  });

  return (
    <>
      Dynamic Parallel
      {queriesData.map((queryData, index) => {
        const { data, isLoading, isFetching } = queryData;
        return data ? (
          <div key={data.id}>{data.name}</div>
        ) : isLoading && !isFetching ? (
          <div key={index + +new Date()} style={{ marginLeft: "8px" }}>
            Not ready ...
          </div>
        ) : (
          <div key={index + +new Date()} style={{ marginLeft: "8px" }}>
            Loading ...
          </div>
        );
      })}
    </>
  );
}

export default DynamicParallel;
