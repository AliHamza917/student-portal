import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [cookies, setCookie] = useCookies(['Token', 'ID' , 'Username']);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInput) => ({ ...prevInput, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login-user", inputs, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success("User Login Successfully");
            setCookie('Token', response.data.token, { path: '/' });
            setCookie('ID', response.data.id, { path: '/' });
            setCookie('Username', response.data.username, { path: '/' });
            navigate('/dashboard-page', { state: { message: "User Login Successfully" } });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Please Check Email or Password";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.state && location.state.message) {
            toast.success(location.state.message);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer />
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <h1 className="text-4xl font-extrabold text-center">Student Portal</h1>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="mx-auto max-w-xs">
                                    <input
                                        id="email"
                                        name="email"
                                        value={inputs.email || ""}
                                        onChange={handleChange}
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        aria-label="Email"
                                    />
                                    <input
                                        id="password"
                                        name="password"
                                        value={inputs.password || ""}
                                        onChange={handleChange}
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        aria-label="Password"
                                    />
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className={`mt-5 tracking-wide font-semibold ${loading ? 'bg-gray-400' : 'bg-indigo-500'} text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
                                    >
                                        {loading ? <span>Loading...</span> : <span>Log In</span>}
                                    </button>
                                    <Link to={'/sign-up'} className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <span className="ml-3">Sign Up</span>
                                    </Link>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        I agree to
                                        <a href="#" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
                                        and its
                                        <a href="#" className="border-b border-gray-500 border-dotted"> Privacy Policy </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
