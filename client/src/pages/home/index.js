import React, { useEffect, useState } from 'react';
import SideNav from "./components/sideNav";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [data, setData] = useState({});
    const [cookies] = useCookies(['username', 'ID']);
    const userId = cookies.ID;
    const navigate = useNavigate();

    const markAttendance = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:8000/api/dashboard/mark-attendance/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success("Attendance Marked Successfully");
            navigate('/dashboard-page', { state: { message: "Attendance Marked Successfully" } });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/dashboard/get-data/${userId}`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [userId]);

    const { userdata = {}, todayAttendenceStatus , countPresents , countPending } = data;

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 rounded-xl m-3 shadow-xl">
            <ToastContainer />
            <SideNav />

            <main className="flex-grow bg-indigo-50 ml-0 md:ml-4 pr-6 p-4">
                <div className="flex flex-col md:flex-row justify-between bg-white rounded-xl shadow-lg p-4">
                    <h1 className="text-xl font-bold text-gray-700">
                        Welcome to Student Portal, {userdata.username}. I am {userdata.isAdmin ? 'Admin' : 'User'}
                    </h1>
                </div>

                {!userdata.isAdmin && (
                    <div className="flex flex-col md:flex-row justify-between mt-4 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                            <h1 className="text-xl font-bold text-gray-800 mt-4">Mark Attendance</h1>
                            <div className="flex justify-between space-x-4 text-center mt-6">
                                <div className="bg-indigo-50 rounded-xl p-10">
                                    <button
                                        onClick={markAttendance}
                                        className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                        Present
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
                    <div className="flex-1 justify-between rounded-xl p-4 bg-white shadow-lg">
                        <h1 className="text-xl font-bold text-gray-800 mt-4">
                            {userdata.isAdmin ? 'Pending Approvals' : 'Today’s Status'}
                        </h1>
                        <div className="flex justify-center mt-6">
                            <div className="bg-indigo-50 rounded-xl p-10 text-center">
                                {userdata.isAdmin ? (
                                    <>
                                        <h3 className="text-2xl">Pending Approval Count</h3>
                                        <span>{data.countPending}</span>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-2xl mb-3">Today's Status</h3>
                                        <div className='p-2 bg-gray-400 rounded-3xl font-bold text-lg '>
                                            {todayAttendenceStatus || 'No status available'}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {userdata.isAdmin ?
                        <>

                        </>:
                        <div className="flex-1 justify-between rounded-xl p-4 bg-white shadow-lg">
                            <h1 className="text-xl font-bold text-gray-800 mt-4">Total Attendence</h1>
                            <div className="flex justify-center mt-6">
                                <div className="bg-indigo-50 rounded-xl p-10 text-center">
                                    <h3 className="text-2xl">{data.countPresents}</h3>
                                    <span>Total Presents</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </div>
    );
};

export default HomePage;
