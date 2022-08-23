import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateId } from "../utils/random";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

function useSuperHeros(options) {
  return useQuery({
    queryKey: ["super-heros"],
    queryFn: fetchSuperHeros,
    select: (data) => {
      const items = data.data.filter((item) => item.show);
      items.forEach((item) => (item.randomToken = generateId()));
      return items;
    },
    ...options,
  });
}

export { useSuperHeros };
