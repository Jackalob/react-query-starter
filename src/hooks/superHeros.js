import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes").then((res) => res.data);
};

const fetchSuperHero = ({ queryKey }) => {
  return axios
    .get(`http://localhost:4000/superheroes/${queryKey[1].id}`)
    .then((res) => res.data);
};

function useSuperHeros(options) {
  return useQuery({
    queryKey: ["super-heros"],
    queryFn: fetchSuperHeros,
    select: (data) => data.filter((hero) => hero.show),
    ...options,
  });
}

function useSuperHero(id) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["super-heros", { id }],
    queryFn: fetchSuperHero,
    initialData: () => {
      const data = queryClient
        .getQueryData(["super-heros"])
        ?.find((hero) => hero.id === id);
      if (data) {
        return data;
      } else {
        return null;
      }
    },
  });
}

export { useSuperHeros, useSuperHero };
