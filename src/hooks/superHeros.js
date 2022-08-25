import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { client, client2 } from "../utils/api-client";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes").then((res) => res.data);
};

function useSuperHeros(options) {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeros,
    select: (data) => data.filter((hero) => hero.show),
    ...options,
  });
}

const fetchSuperHero = ({ queryKey }) => {
  return client(`/superheroes/${queryKey[1].id}`).then((res) => res.data);
};

function useSuperHero(id) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["super-heroes", { id }],
    queryFn: fetchSuperHero,
    onError: () => console.log(999),
    initialData: () => {
      const data = queryClient
        .getQueryData(["super-heroes"])
        ?.find((hero) => hero.id === id);
      if (data) {
        return data;
      } else {
        return null;
      }
    },
  });
}

const addSuperHero = (data) => {
  return axios
    .post(`http://localhost:4000/superheroesccc`, data)
    .then((res) => res.data);
};

function useAddSuperHero() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSuperHero,
    // onSuccess: (data) => {
    //   queryClient.setQueryData(["super-heroes"], (oldData) => [
    //     ...oldData,
    //     data,
    //   ]);
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries(["super-heroes"]);
      const prevHeroes = queryClient.getQueryData(["super-heroes"]);
      queryClient.setQueryData(["super-heroes"], (oldHeros) => [
        ...oldHeros,
        { id: oldHeros.length + 1, ...newHero },
      ]);
      return { prevHeroes };
    },
    onError: (err, newHero, context) => {
      console.log(err, newHero, context);
      queryClient.setQueryData(["super-heroes"], context.prevHeroes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["super-heroes"]);
    },
  });
}

export { useSuperHeros, useSuperHero, useAddSuperHero };
