import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (!session) throw new Error("Login failed. Try again.");

            const userData = await authService.getCurrentUser();
            if (!userData) throw new Error("Failed to fetch user data.");

            dispatch(authLogin(userData)); 
            navigate("/");

        } catch (error) {
            setError(error.message || "An error occurred during login.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
            <div className="mx-auto w-full max-w-xl bg-white shadow-lg rounded-xl p-10 border border-gray-200">
                
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-3xl font-bold text-gray-800 leading-tight">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
                    
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email:</label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-400"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address",
                                },
                            })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password:</label>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-400"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                    </div>

                    <Button
                        type="submit"
                        borderColor="border-blue-600"
                        textColor="text-blue-600"
                        className="w-full py-3 text-lg font-semibold bg-blue-600 rounded-lg"
                        hoverEffect="hover:bg-blue-700 hover:text-white hover:shadow-md hover:scale-102"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
