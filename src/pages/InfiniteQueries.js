import React, { Fragment } from "react";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const size = 2;

const fetchColors = ({ pageParam = 1 }) =>
  axios.get(`http://localhost:4000/colors?_limit=${size}&_page=${pageParam}`);

function InfiniteQueries() {
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading && isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages?.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          load more
        </button>
      </div>
      <div>{isFetching && isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}

export default InfiniteQueries;
