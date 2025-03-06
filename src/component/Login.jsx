import React, { useState, memo } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/userSlice";

const Login = ({ setLogin }) => {
    const [email, setEmail] = useState("anishwanare@gmail.com");
    const [password, setPassword] = useState("123456789");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const { loading } = useSelector((state) => state.User);
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        dispatch(login(formData));
        setLogin(false);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim() || !dob.trim()) {
            alert("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("dob", dob);

        dispatch(register(formData));
        setLogin(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <form
                className="bg-gray-800 rounded-lg shadow-lg p-8 md:w-96 relative border border-gray-300"
                onSubmit={showSignup ? handleRegister : handleLogin}
            >
                <button
                    title="Close"
                    className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl"
                    onClick={() => setLogin(false)}
                >
                    <IoClose />
                </button>

                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-teal-400 text-white text-center py-2 px-4 rounded-t-lg w-32">
                    {showSignup ? "Sign Up" : "Sign In"}
                </div>

                {!showSignup && <div className="flex justify-center mb-6">
                    <img
                        alt="User avatar"
                        className="rounded-full bg-gray-700 p-2"
                        height="100"
                        src="https://storage.googleapis.com/a1aa/image/yNZ0vzviyPw4Li79EHEaPUT0rMW0Bz6KrkictLD80oU.jpg"
                        width="100"
                    />
                </div>}

                {showSignup && (
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="text-white w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-teal-400 outline-none"
                            required
                        />
                    </div>
                )}

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-white w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-teal-400 outline-none"
                        required
                    />
                </div>

                {showSignup && (
                    <div className="mb-4">
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="text-white w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-teal-400 outline-none"
                            required
                        />
                    </div>
                )}

                <div className="mb-4 relative">
                    <input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-white w-full p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-teal-400 outline-none pr-10"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-4 text-gray-400 hover:text-gray-300"
                        onClick={() => setShowPass(!showPass)}
                    >
                        {showPass ? <FaEyeSlash size={20} title="Hide" /> : <FaEye size={20} title="Show" />}
                    </button>
                </div>

                <p className="text-sm text-red-500">
                    {password && (password.includes(" ") ? "Password should not contain spaces" : password.length < 6 ? "Password must be at least 6 characters" : "")}
                </p>

                <button
                    type="submit"
                    className="w-full bg-teal-400 text-white py-3 rounded-lg hover:bg-teal-500 transition"
                    disabled={loading}
                >
                    {loading ? "Loading..." : showSignup ? "Sign Up" : "Sign In"}
                </button>

                <p className="text-center text-sm pt-4 text-gray-300">
                    {showSignup ? "Already have an account?" : `New to ${import.meta.env.VITE_APP_NAME || "NIRVANA"}?`}
                    <span
                        className="text-teal-400 cursor-pointer font-semibold hover:underline ml-1"
                        onClick={() => setShowSignup(!showSignup)}
                    >
                        {showSignup ? "Sign In" : "Create Account"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default memo(Login);
