import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes").then(res => res.data);
};
const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends").then(res => res.data);
};

function ParallelQueries() {
  useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });
  useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  return <div>ParallelQueries</div>;
}

export default ParallelQueries;
