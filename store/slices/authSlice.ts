import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string;
    username: string;
    email: string;
    userRole?: string;
    avatarUrl?: string;
}

interface AuthState {
    accessToken: string | null;
    user: User | null;
    isAutheticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isAutheticated: false,
    isLoading: true,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string, user: User }>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAutheticated = true;
            state.isLoading = false;
        },
        clearCredentials: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAutheticated = false;
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setCredentials, clearCredentials, setLoading } = authSlice.actions;
export default authSlice.reducer;