import React from 'react';
import SideNav from "./components/sideNav";
import CardWidgit from "./components/cardWidgit";

const HomePage = () => {
    return (
        <>

            <>
                {/* component */}
                <div className="flex bg-gray-100 rounded-xl m-3 shadow-xl">

                    <SideNav/>

                    <main className="flex-col bg-indigo-50 w-full ml-4 pr-6">
                        <div className="flex justify-between p-4 bg-white mt-3 rounded-xl shadow-lg">
                            <h1 className="text-xl font-bold text-gray-700">Welcome to Student Portal</h1>
                            <div className="flex justify-between w-2/5">
                                <div className="flex items-center border-2 p-2 rounded-xl">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="ml-2 outline-none w-full"
                                    />
                                </div>
                                <div className="flex items-center space-x-6 pr-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 cursor-pointer text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        />
                                    </svg>
                                    <img
                                        src="https://i.imgur.com/iH7hkQb.png"
                                        alt=""
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-4 space-x-4 s">

                         <CardWidgit title='Mark Attendance' btnText = 'Present'/>
                            
                        </div>
                        <div className="flex space-x-4">
                            <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                                <h1 className="text-xl font-bold text-gray-800 mt-4">
                                    Today’s Status
                                </h1>
                                <div className="flex justify-between space-x-4 text-center mt-6">
                                    <div className="bg-indigo-50 rounded-xl p-10">
                                        <h3>8.7K</h3>
                                        <spnan>Total Present</spnan>
                                    </div>

                                </div>
                            </div>
                            <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                                <h1 className="text-xl font-bold text-gray-800 mt-4">
                                    Today’s Status 2
                                </h1>
                                <div className="flex justify-between space-x-4 text-center mt-6">

                                    <div className="bg-indigo-50 rounded-xl p-10">
                                        <h3>8.7K</h3>
                                        <spnan>Total Present</spnan>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </>



        </>
    );
};

export default HomePage;