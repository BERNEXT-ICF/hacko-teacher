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

export const useGetDetailsClass = (id: any) => {
  return useQuery({
    queryKey: ["getDetailsClass", id],
    queryFn: async () => {
      const { data } = await api.get(`/users/class/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateClass = () => {
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

export const useUpdateClass = (id: any) => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["updateClass", id],
    mutationFn: async (data: any) => {
      await api.put(`/users/class/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllClass"]);
      router.push("/dashboard/class");
      message.success("Class updated successfully!");
    },
    onError: () => {
      message.error("Failed to update class. Please try again.");
    },
  });
};