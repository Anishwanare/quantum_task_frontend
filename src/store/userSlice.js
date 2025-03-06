import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("USER")) || {},
        users: [],
        loading: false,
        isAuthenticated: Boolean(localStorage.getItem("USER")),
        error: null,
    },
    reducers: {
        RegisterResponse(state) {
            state.loading = true;
        },
        RegisterSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("USER", JSON.stringify(action.payload));
        },
        RegisterFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
        },
        loginResponse(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem("USER", JSON.stringify(action.payload));
        },
        loginFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
        },
        fetchUsersResponse(state) {
            state.loading = true;
        },
        fetchUsersSuccess(state, action) {
            state.loading = false;
            state.users = action.payload?.users;
        },
        fetchUsersFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
        },
        logout(state) {
            state.user = {};
            state.isAuthenticated = false;
            localStorage.removeItem("USER");
        },
    },
});

export const register = (formData) => async (dispatch) => {
    dispatch(userSlice.actions.RegisterResponse());
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/register`,
            formData,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(userSlice.actions.RegisterSuccess(response.data.user));
        toast.success(response.data?.message)
    } catch (error) {
        dispatch(userSlice.actions.RegisterFailed({ error: error.message }));
        console.error(error.message);
        toast.error(error.response.data?.message)
    }
};

export const login = (formData) => async (dispatch) => {
    dispatch(userSlice.actions.loginResponse());
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/login`,
            formData,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(userSlice.actions.loginSuccess(response.data.user));
        toast.success(response.data?.message)
    } catch (error) {
        dispatch(userSlice.actions.loginFailed({ error: error.message }));
        console.error(error.message);
        toast.error(error.response.data?.message)
    }
};

export const fetchUsers = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUsersResponse());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/fetch`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(userSlice.actions.fetchUsersSuccess(response.data));
        toast.success(response.data?.message)
    } catch (error) {
        dispatch(userSlice.actions.fetchUsersFailed({ error: error.message }));
        console.error(error.message);
        toast.error(error.response.data?.message)
    }
};

export const logout = () => (dispatch) => {
    dispatch(userSlice.actions.logout());
    toast.success("logout success")
};

export const fetchMe = () => (dispatch) => {
    const storedUser = localStorage.getItem("USER");

    if (storedUser) {
        try {
            dispatch(userSlice.actions.loginSuccess(JSON.parse(storedUser)));
        } catch (error) {
            console.error("Error parsing stored user:", error);
        }
    }
};

export default userSlice.reducer;
