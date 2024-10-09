import React, { useEffect, useState } from 'react';
import SideNav from "./components/sideNav";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [data, setData] = useState({});
    const [approvals, setApprovals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(['username', 'ID']);
    const userId = cookies.ID;
    const navigate = useNavigate();
    const [refreshFlag, setRefreshFlag] = useState(false);

    const markAttendance = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:8000/api/dashboard/mark-attendance/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success("Attendance Marked Successfully");
            setRefreshFlag((prev) => !prev);
            navigate('/dashboard-page', { state: { message: "Attendance Marked Successfully" } });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    };

    const approveAttendance = async (u_id) => {
        try {
            // Call the API to approve attendance
            await axios.post(`http://localhost:8000/api/dashboard/admin/approve-attendance/${u_id}`);
            toast.success("Attendance Approved Successfully");
            // Optionally refresh the approvals after approving
            setRefreshFlag((prev) => !prev);
            await fetchApprovals();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to approve attendance";
            toast.error(errorMessage);
        }
    };

    const fetchApprovals = async () => {
        try {
            const approvalResponse = await axios.get('http://localhost:8000/api/dashboard/admin/pending-approvels/');
            setApprovals(approvalResponse.data.data);
        } catch (error) {
            console.error("Error fetching approvals:", error);
            toast.error("Failed to fetch approvals. Please try again later.");
        }
    };

    const rejectAttendance = async (u_id) => {
        try {
            // Call the API to reject attendance
            await axios.post(`http://localhost:8000/api/dashboard/admin/reject-attendance/${u_id}`);
            setRefreshFlag((prev) => !prev);
            toast.error("Attendance Rejected ");

            await fetchApprovals();
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to reject attendance";
            toast.error(errorMessage);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/dashboard/get-data/${userId}`);
                setData(response.data);
                await fetchApprovals();
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [userId , refreshFlag]);

    const { userdata = {}, todayAttendenceStatus, countPresents, countPending } = data;

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 rounded-xl m-3 shadow-xl">
            <ToastContainer />
            <SideNav />

            <main className="flex-grow bg-indigo-50 ml-0 md:ml-4 pr-6 p-4">
                <div className="flex flex-col md:flex-row justify-between bg-white rounded-xl shadow-lg p-4">
                    <h1 className="text-xl font-bold text-gray-700">
                        Welcome to Student Portal , {userdata.username}
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
                        <div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : userdata.isAdmin ? (
                                <>
                                    <div className='bg-indigo-50 rounded-xl p-10 text-center'>
                                        <h3 className="text-2xl">Pending Approval Count</h3>
                                        <span>{countPending}</span>
                                    </div>

                                    <div className="overflow-x-auto mt-5 bg-indigo-50 rounded-xl text-center">
                                        <table className="table w-full border-2 border-black">
                                            <thead>
                                            <tr className='border-2 '>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {approvals.map((approval, index) => (
                                                <tr className="bg-base-200" key={approval._id}>
                                                    <th>{index + 1}</th>
                                                    <td>{approval.userName}</td>
                                                    <td>{approval.status}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-success mr-4"
                                                            onClick={() => approveAttendance(approval.u_id)}>
                                                            Approve
                                                        </button>
                                                        <button className='btn btn-error' onClick={() => rejectAttendance(approval.u_id)}>Reject</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-2xl mb-3"></h3>
                                    <div className='p-2 bg-gray-400 rounded-3xl font-bold text-lg '>
                                        {todayAttendenceStatus || 'No status available'}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {!userdata.isAdmin && (
                        <div className="flex-1 justify-between rounded-xl p-4 bg-white shadow-lg">
                            <h1 className="text-xl font-bold text-gray-800 mt-4">Total Attendance</h1>
                            <div className="flex justify-center mt-6">
                                <div className="bg-indigo-50 rounded-xl p-10 text-center">
                                    <h3 className="text-2xl">{countPresents}</h3>
                                    <span>Total Presents</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HomePage;
