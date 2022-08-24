import React, { useState } from "react";
import { isError, useQuery } from "@tanstack/react-query";
import axios from "axios";

const size = 2;

const fetchColors = (page) => {
  return axios
    .get(`http://localhost:4000/colors?_limit=${size}&_page=${page}`)
    .then((res) => res.data);
};

function PaginatedQueries() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["colors", { page }],
    queryFn: () => fetchColors(page),
    keepPreviousData: true
  });

  if (isLoading && isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>PaginatedQueries</div>
      {data?.map((color) => (
        <div key={color.id}>
          <h2>
            {color.id}. {color.label}
          </h2>
        </div>
      ))}
      <div>
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          prev
        </button>
        <button
          onClick={() => setPage((page) => page + 1)}
          disabled={page === 4}
        >
          next
        </button>
      </div>
    </>
  );
}

export default PaginatedQueries;
