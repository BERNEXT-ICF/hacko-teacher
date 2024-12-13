import {useQuery } from "react-query";
import { api } from "@/services/api";

export const useGetAllClass = () => {
  return useQuery({
    queryKey: ["getAllClass"],
    queryFn: async () => {
      const { data } = await api.get("/users/admin/class");
      return data.data;
    },
  });
};