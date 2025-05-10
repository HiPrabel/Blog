import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [captchaQuestion, setCaptchaQuestion] = useState({});
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10 + 1);
        const num2 = Math.floor(Math.random() * 10);
        setCaptchaQuestion({ num1, num2, answer: num1 + num2 });
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const login = async (data) => {
        setError("");
        setCaptchaError("");

        if (parseInt(captchaAnswer) !== captchaQuestion.answer) {
            setCaptchaError("Captcha answer is incorrect.");
            generateCaptcha(); // regenerate on failure
            return;
        }

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
        <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="mx-auto w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" className="dark:invert" />
                    </span>
                </div>

                <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email:</label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
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
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password:</label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 pr-10"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <span
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                        <div className="text-right mt-1">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                            What is {captchaQuestion.num1} + {captchaQuestion.num2}?
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter your answer"
                            value={captchaAnswer}
                            onChange={(e) => setCaptchaAnswer(e.target.value)}
                            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                        />
                        {captchaError && (
                            <p className="text-sm text-red-500 mt-1">{captchaError}</p>
                        )}
                    </div>


                    <Button
                        type="submit"
                        borderColor="border-blue-600"
                        textColor="text-blue-600 dark:text-white"
                        className="w-full py-3 text-lg font-semibold bg-blue-600 rounded-lg"
                        hoverEffect="hover:bg-blue-700 hover:shadow-md hover:scale-102 hover:text-white"
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
