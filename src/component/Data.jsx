import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";

const Data = () => {
    const { users, isAuthenticated } = useSelector(state => state.User);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUsers());
        }
    }, [isAuthenticated, dispatch]);

    if (!isAuthenticated) {
        return (
            <div className="text-center p-5 flex items-center flex-col justify-center h-96 gap-5">
                <h2 className="sm:text-4xl font-semibold text-red-500">Login to view Data 🃏</h2>
                <p className="text-gray-600 sm:text-xl">You need to log in to view this data.</p>
            </div>
        );
    }

    return (
        <div className="p-5 w-full md:max-w-6xl m-auto">
            <h2 className="text-2xl font-bold mb-4 text-center border-b pb-5">User Data</h2>

            {users?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-green-500 text-white">
                                <th className="py-2 px-4 border text-xs md:text-base">Sr No.</th>
                                <th className="py-2 px-4 border text-xs md:text-base">Name</th>
                                <th className="py-2 px-4 border text-xs md:text-base">Date of Birth</th>
                                <th className="py-2 px-4 border text-xs md:text-base">Email</th>
                                <th className="py-2 px-4 border text-xs md:text-base">Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={index}
                                    className={`text-center border hover:bg-gray-100 cursor-pointer ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                                >
                                    <td className="py-2 px-4 border text-xs md:text-base">{index + 1}</td>
                                    <td className="py-2 px-4 border text-xs md:text-base">{user.name}</td>
                                    <td className="py-2 px-4 border text-xs md:text-base">{(user.dob).slice(0, 10)}</td>
                                    <td className="py-2 px-4 border text-xs md:text-base">{user.email}</td>
                                    <td className="py-2 px-4 border text-xs md:text-base">{user.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">No user data available.</p>
            )}
        </div>
    );
};

export default Data;
