import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Logo, Input, Button } from './index';
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

function SignUp() {
    // UseForm for form handling
    const { register, handleSubmit, formState: { errors } } = useForm(); // Access `errors`
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeoutRef = useRef(null); // Use ref to track the timeout

    const signupSubmit = async (data) => {
        setLoading(true);
        try {
            setError('');
            const session = await authService.createUser(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            // Clear any existing timeout to avoid multiple calls
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set new timeout
            timeoutRef.current = setTimeout(() => {
                setError(
                    error?.message.replace(/AppwriteException: Invalid `password` param: ?/i, '').trim() ||
                    'An error occurred during Sign Up.'
                );
                setLoading(false);
            }, 2000);
        }
    };

    // Clean up on component unmount
    useEffect(() => {
        return () => {
            // Clear timeout if component unmounts
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    return (
        // Sign Up Component
        <div className="flex justify-center items-center w-full h-screen">
            <div className="h-full max-h-[30rem] w-full flex flex-col md:flex-row justify-center items-center px-2 sm:px-0">
                {/* Left-side (Sign Up Information) */}
                <div className="flex h-full flex-col justify-center items-center gap-y-4 bg-[#000] shadow-lg rounded-t-xl md:rounded-l-xl md:rounded-r-none  p-6 w-full max-w-sm">
                    <Logo className="mb-3 w-52" />
                    <h2 className="text-center leading-tight text-xl font-semibold">
                        Sign up to your account
                    </h2>
                    <p className="text-center text-sm ">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="text-blue-500 font-medium transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Right-side (Form) */}
                <form
                    className="w-full border-l flex flex-col justify-center h-full max-w-sm bg-white p-6 rounded-b-xl md:rounded-r-xl md:rounded-l-none space-y-5"
                    onSubmit={handleSubmit(signupSubmit)}
                >
                    <h2 className="text-black text-3xl">Sign Up</h2>

                      {/* Global Error Message from Database */}
                      {error && (
                        <div className="bg-red-50  p-4 rounded-xl border border-red-300  text-center text-xs mb-4">
                            <p className='text-red-500'>{error}</p>
                        </div>
                    )}

                    {/* Name Input */}
                    <div className="flex flex-col space-y-1">
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col space-y-1">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('email', {
                                required: 'Email is required',
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be a valid address',
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="relative flex flex-col space-y-1">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                        <button
                            type="button"
                            onClick={handlePasswordToggle}
                            className="absolute top-6 right-0 mr-2 transition-colors duration-200 ease-linear hover:bg-black hover:text-white p-1 rounded-full text-black text-lg"
                        >
                            {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                        </button>
                        {errors.password && (
                            <span className="text-red-500 text-xs">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        loading={loading || false}
                        type="submit"
                        className="w-full text-xs bg-black/80 hover:bg-black tracking-widest font-semibold text-white rounded-md transition duration-200"
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )

}

export default SignUp;
