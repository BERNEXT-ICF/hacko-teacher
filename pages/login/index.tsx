// pages/login.tsx
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { email, password } = data;

      if (email === "admin@example.com" && password === "password123") {
        router.push("/dashboard");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-center text-2xl font-semibold mb-6 text-black">Login</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label className="block mb-2 text-black">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-black">Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
    </div>
  );
}
