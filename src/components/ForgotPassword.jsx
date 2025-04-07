import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        setError("");
        setMessage("");
        try {
            await authService.sendPasswordReset(data.email);
            setMessage("Password recovery link sent to your email.");
        } catch (err) {
            setError(err.message || "Something went wrong.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-10 border border-gray-200 dark:border-gray-700">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" className="dark:invert" />
                    </span>
                </div>

                <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
                    Forgot your password?
                </h2>
                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Enter your email to receive a password reset link.
                </p>

                {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email:</label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        borderColor="border-blue-600"
                        textColor="text-blue-600 dark:text-white"
                        className="w-full py-3 text-lg font-semibold bg-blue-600 rounded-lg"
                        hoverEffect="hover:bg-blue-700 hover:shadow-md hover:scale-102 hover:text-white"
                    >
                        Send Reset Link
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
