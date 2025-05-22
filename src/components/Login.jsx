import React, { useEffect, useState } from "react";
import * as ReactRouterDom from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { handleEmailChange, handlePasswordChange } from "../utils/util";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginStore from "../store/loginStore";


function Login() {

    const { useNavigate, Link } = ReactRouterDom;
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: { email: "", password: "" }
    });

    const { loginLoader, token, authenticateUser } = loginStore();
    const formData = watch();
    const isValid = Object.keys(errors).length === 0 && Object.values(formData).every(value => value.trim() !== "");

    /**
     * @param {Object} data - Contains user credentials.
     * @return {Promise<void>} Authenticates the user.
     */
    const handleLogin = async (data) => {
        let formData = new FormData();
        formData.append("email", data?.email);
        formData.append("password", data?.password);
        await authenticateUser(formData);

    };

    /**
     * @param {string} token - Authentication token that determines user login state.
     * @param {Function} navigate - Function to redirect the user to the home page.
     * @return {void} Redirects user upon authentication.
     */
    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

    return (
        (
            <div className="min-h-screen flex items-center justify-center">
                <form onSubmit={handleSubmit(handleLogin)} className="p-6 shadow-2xl  bg-white rounded-lg w-full max-w-md mx-auto">
                    <h1 className="text-center text-blue-600 text-3xl font-medium">Welcome Back</h1>

                    <div className="flex flex-col space-y-4 mt-6">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                minLength: {
                                    value: 3,
                                    message: "Email must be at least 3 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email format.",
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type="text"
                                        inputMode="email"
                                        maxLength={44}
                                        className={`p-3 w-full text-base border ${errors.email ? "border-red-500" : "border-blue-500"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your email"
                                        onChange={(e) => handleEmailChange({ e, field })}
                                    />

                                    <p className="text-red-500 text-[13px] -mb-3 min-h-[20px]">{errors.email?.message}</p>
                                </div>
                            )}
                        />

                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/,
                                    message: "Password must be at least 8 characters long and include a number, an uppercase letter, a lowercase letter, and a special character.",
                                },
                            }}
                            render={({ field }) => (
                                <div className="relative">
                                    <input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        inputMode="text"
                                        maxLength={44}
                                        className={`p-3 w-full text-base border ${errors.password ? "border-red-500" : "border-blue-500"
                                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter your password"
                                        onChange={(e) => handlePasswordChange({ e, field })}
                                    />
                                    <span
                                        className="absolute right-10 top-4 cursor-pointer text-gray-600"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    <p className="text-red-500 text-[13px] -mb-3 min-h-[20px]">{errors.password?.message}</p>
                                </div>
                            )}
                        />

                        {
                            loginLoader ?
                                <div className="flex justify-center h-10 items-center">
                                    <div className="border-4 border-solid text-center border-blue-700 border-e-transparent rounded-full animate-spin w-10 h-10"></div>
                                </div>
                                :
                                <button
                                    disabled={!isValid}
                                    className={`mt-6 p-3 w-full font-medium text-lg rounded-xl ${!isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                                >
                                    Log in
                                </button>

                        }


                        <div className="flex flex-col items-center">
                            <Link
                                to="/signup"
                                className="mt-2 px-4 py-2 text-blue-600 text-lg   hover:text-blue-800 transition">
                                Don't have an account?
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )

    );

}

export default Login;