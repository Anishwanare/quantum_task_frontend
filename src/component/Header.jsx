import React, { useState } from "react";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

const Header = () => {
    const [login, setLogin] = useState(false);
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.User);
    

    return (
        <>
            <header className="flex justify-between items-center p-4  text-black shadow-lg">
                <div className="text-2xl font-bold text-green-700 cursor-pointer">NIRVANA</div>

                {!isAuthenticated ? (
                    <button
                        className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg"
                        onClick={() => setLogin(true)}
                    >
                        Login
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold">{user?.name}</span>
                        <button
                            className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-lg"
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </header>

            {login && <Login setLogin={setLogin} />}
        </>
    );
};

export default Header;
