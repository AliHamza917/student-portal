import React, {useEffect, useState} from 'react';
import SideNav from "./components/sideNav";
import CardWidgit from "./components/cardWidgit";
import { useCookies } from "react-cookie";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const [data , setData] = useState('')
    const [cookies] = useCookies(['username' , 'ID']);

    const userId = cookies.ID
    const navigate = useNavigate();

    const markAttentence =async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/dashboard/mark-attendance/${userId}`,{},{
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success("Attendence Marked Successfully");



            navigate('/dashboard-page', { state: { message: "Attendence Marked Successfully" } });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Please Check Email or Password";
            toast.error(errorMessage);
        }
    };


    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get(`http://localhost:8000/api/dashboard/get-data/${userId}`)
            setData(response.data)


        };fetchData()
    },[userId])

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 rounded-xl m-3 shadow-xl">
            <ToastContainer />
            <SideNav/>


            <main className="flex-grow bg-indigo-50 ml-0 md:ml-4 pr-6 p-4">
                <div className="flex flex-col md:flex-row justify-between bg-white rounded-xl shadow-lg p-4">
                    <h1 className="text-xl font-bold text-gray-700">Welcome to Student Portal, {data.username}</h1>
                    <div className="flex justify-between w-full md:w-2/5 mt-2 md:mt-0">
                        <div className="flex items-center space-x-6 pr-8">
                            {/* Add additional elements here if needed */}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between mt-4 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                        <h1 className="text-xl font-bold text-gray-800 mt-4">
                            Mark Attendance
                        </h1>
                        <div className="flex justify-between space-x-4 text-center mt-6">
                            <div className="bg-indigo-50 rounded-xl p-10">
                                <button onClick={markAttentence} value={userId}
                                        className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Present
                                </button>

                            </div>

                        </div>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
                    <div className="flex-1 justify-between rounded-xl p-4 bg-white shadow-lg">
                        <h1 className="text-xl font-bold text-gray-800 mt-4">Today’s Status</h1>
                        <div className="flex justify-center mt-6">
                            <div className="bg-indigo-50 rounded-xl p-10 text-center">
                                <h3 className="text-2xl">Today</h3>
                                <span>Total Present</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 justify-between rounded-xl p-4 bg-white shadow-lg">
                        <h1 className="text-xl font-bold text-gray-800 mt-4">Today’s Status 2</h1>
                        <div className="flex justify-center mt-6">
                            <div className="bg-indigo-50 rounded-xl p-10 text-center">
                                <h3 className="text-2xl">8.7K</h3>
                                <span>Total Present</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
