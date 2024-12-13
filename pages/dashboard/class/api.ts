import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "@/services/api";
import { useRouter } from "next/router";
import { message } from "antd/lib";
import { queryClient } from "@/pages/_app";

export type CreateClassPayload = {
  title: string;
  description: string;
  image: string;
  video: string;
  status: "draf" | "public";
};

export const useGetAllClass = () => {
  return useQuery({
    queryKey: ["getAllClass"],
    queryFn: async () => {
      const { data } = await api.get("/users/admin/class");
      return data.data;
    },
  });
};

export const useCreateClass = () => {
//   const queryClient = useQueryClient(); // Access the query client
  const router = useRouter();

  return useMutation({
    mutationKey: ["createClass"],
    mutationFn: async (data: CreateClassPayload) => {
      await api.post("/users/class", data);
    },
    onSuccess: () => {
      // Revalidate `getAllClass`
      queryClient.invalidateQueries(["getAllClass"]);
      // Redirect and show success message
      router.push("/dashboard/class");
      message.success("Class created successfully!");
    },
    onError: () => {
      message.error("Failed to create class. Please try again.");
    },
  });
};
