import React from 'react';
import {Link} from "react-router-dom";

const CardWidgit = (props) => {
    return (
        <>
            <div className="justify-between rounded-xl mt-4 p-4 bg-white shadow-lg">
                <h1 className="text-xl font-bold text-gray-800 mt-4">
                    {props.title || 'Card Title'}
                </h1>
                <div className="flex justify-between space-x-4 text-center mt-6">
                    <div className="bg-indigo-50 rounded-xl p-10">
                        <Link to={props.link || '404'}
                            className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            {props.btnText || 'Button Text'}
                        </Link>

                    </div>

                </div>
            </div>


        </>
    );
};

export default CardWidgit;