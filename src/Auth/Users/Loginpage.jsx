import React, { useContext, useEffect, useState } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaEyeSlash, FaEye } from "react-icons/fa";
import bg from "../../assets/loginbg.jpg"
import ill from "../../assets/llg.jpg"

import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const LoginPage = () => {
    const axiosPublic = UseAxiosPublic()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const [show, setShow] = useState(false)
    const ShowPassWord = (e) => {
        e.preventDefault();
        setShow(!show)
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const navigate = useNavigate()
    const location = useLocation()

    //---------- Context use----------------------

    const { LoginUser, setUser, GoogleLogin } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        let user_captcha_value = document.getElementById('user_captcha_input').value;

        if (validateCaptcha(user_captcha_value) == true) {
            alert('Captcha Matched');
        }
        else {
            alert('Captcha Does Not Match');
            return;
        }

        //-------------------------login with email and password--------------------
        LoginUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                setSuccess('LOGIN Successful.')
                navigate(location.state ? location.state : '/')
            })
            .catch((error) => {
                // console.log(error)
                // navigate(location.state ? location.state : '/')
                if (error) { setError('Password or Email is invalid..!') }
            });
    }

    //------------------- HAndle google--------------
    const HandleGoogleLogin = () => {
        GoogleLogin()
            .then((res) => {
                // console.log(res.user)
                setUser(res.user)

                const UserInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: "user"
                }

                setSuccess('LOGIN Successful.')
                navigate(location.state ? location.state : '/')

                axiosPublic.post('/users', UserInfo)
                    .then(res => {
                        if (res.data.insertedId) {

                        }
                    })
            })
            .catch(err => {
                // console.log(err);
                setUser(null)
            })
    }


    return (
        <div
            className="flex items-center justify-center min-h-screen py-10 bg-cover md:bg-center"
            style={{ background: `url(${bg})`, backgroundSize: "cover" }}
        >

            <div className=" shadow-xl border backdrop-blur-md border-black rounded-lg flex flex-col lg:flex-row w-11/12 max-w-4xl overflow-hidden">
                {/* Left Side */}
                <div className="lg:w-1/2 w-full flex items-center justify-center ">
                    <img
                        src={ill}
                        alt="Login Illustration"
                        className="w-3/4 lg:w-2/3 p-4 rounded-full"
                    />
                </div>

                {/* Right Side */}
                <div className="lg:w-1/2 w-full p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
                        Login
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Type here"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="my-1 text-sm font-semibold">Password</label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 peer"
                                placeholder="Enter Password."
                                required
                            />
                            <button
                                onClick={ShowPassWord}
                                className="btn btn-ghost btn-xs absolute right-3 top-8 text-lg text-black"
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Captcha */}
                        <div className="p-4 bg-white rounded-xl">
                            <label
                                htmlFor="captcha"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Captcha
                            </label>
                            <div className="flex items-center justify-between">
                                <LoadCanvasTemplate />
                            </div>
                            <input
                                type="text"
                                id="user_captcha_input"
                                className="mt-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-400 focus:border-blue-400"
                                placeholder="Type here"
                            />
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <p className="text-xs font-semibold text-red-500 text-center">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-xs font-semibold text-green-500 text-center">
                                {success}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-md"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Registration Link */}
                    <p className="mt-4 text-center text-sm text-gray-600">
                        New here?{" "}
                        <a
                            href="/register"
                            className="text-blue-500 hover:underline hover:font-bold"
                        >
                            Create a New Account
                        </a>
                    </p>

                    {/* Social Sign-in */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Or sign in with</p>
                        <div className="flex justify-center space-x-4 mt-2">
                            <button
                                onClick={HandleGoogleLogin}
                                className="w-full btn  btn-sm text-blue-900"
                            >
                                <FaGoogle className="mr-2" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
