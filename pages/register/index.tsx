// pages/register.tsx
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Simulate API request for user registration
      const { name, email, password } = data;

      // Example: Simulate successful registration
      if (email === "user@example.com") {
        throw new Error("Email already registered");
      }

      setSuccessMessage("Registration successful! Redirecting to login page...");
      setTimeout(() => router.push("/login"), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-center text-2xl font-semibold mb-6 text-black">Register</h2>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label className="block mb-2 text-black">Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full text-black p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-black">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-black">Password:</label>
          <input
            type="password"
            {...register("password", { 
              required: "Password is required", 
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Register
        </button>
      </form>
    </div>
  );
}
