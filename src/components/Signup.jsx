import React, {useState} from 'react'
import authService from '../appwrite/auth.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice.js'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50">
        <div className="mx-auto w-full max-w-xl bg-white shadow-lg rounded-xl p-10 border border-gray-200">
        <div className="mb-4 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
        </div>
            <h2 className="text-center text-3xl font-bold text-gray-800 leading-tight">
                Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)} className="mt-6 space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Full Name:</label>
                    <Input
                        placeholder="Enter your full name"
                        className="border border-gray-300 px-4 py-2 rounded-lg focus:ring focus:ring-blue-400"
                        {...register("name", { required: "Full name is required" })}
                    />
                </div>
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
                            }
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
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
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
                    Create Account
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Signup