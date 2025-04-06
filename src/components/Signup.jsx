import React, { useState } from "react";
import authService from "../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-10 border border-gray-200 dark:border-gray-700">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" className="dark:invert" />
          </span>
        </div>
  
        <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
  
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
  
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Full Name:
            </label>
            <Input
              placeholder="Enter your full name"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg focus:ring focus:ring-blue-400"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
  
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Email:
            </label>
            <Input
              placeholder="Enter your email"
              type="email"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-lg focus:ring focus:ring-blue-400"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
  
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Password:
            </label>
            <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-400 pr-10"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
            />
            <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
  
          <Button
            type="submit"
            disabled={loading}
            borderColor="border-blue-600 dark:border-blue-500"
            textColor="text-blue-600 dark:text-white"
            className={`w-full py-3 text-lg font-semibold bg-blue-600 dark:bg-blue-500 rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            hoverEffect="hover:bg-blue-700 dark:hover:bg-blue-600 hover:text-white hover:shadow-md hover:scale-102"
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
  
}

export default Signup;
