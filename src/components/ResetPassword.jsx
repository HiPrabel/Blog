import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    useEffect(() => {
        if (!userId || !secret) {
            setError("Invalid or expired reset link.");
        }
    }, [userId, secret]);

    const onSubmit = async ({ password, confirmPassword }) => {
        setError("");
        setMessage("");
        try {
            await authService.confirmPasswordReset({ userId, secret, password, confirmPassword });
            setMessage("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
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
                    Reset your password
                </h2>

                {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">New Password:</label>
                        <Input
                            type="password"
                            placeholder="Enter new password"
                            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Confirm Password:</label>
                        <Input
                            type="password"
                            placeholder="Confirm password"
                            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value =>
                                    value === watch("password") || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        borderColor="border-blue-600"
                        textColor="text-blue-600 dark:text-white"
                        className="w-full py-3 text-lg font-semibold bg-blue-600 rounded-lg"
                        hoverEffect="hover:bg-blue-700 hover:shadow-md hover:scale-102 hover:text-white"
                    >
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
