import { api } from "@/services/api";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: any) => {
            await api.post("/users/login", data);
        },
        onSuccess: () => {
            router.push("/dashboard");
        },
    })
}

export const useLogout = () => {
    const router = useRouter();
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            await api.delete("/users/logout");
        },
        onSuccess: () => {
            router.push("/login");
        },
    })
}