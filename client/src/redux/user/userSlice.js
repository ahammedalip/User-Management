import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSucces: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false
            state.error = false
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart : (state) => {
            state.loading= true;
        },
        deleteUserSuccess : (state) =>{
            state.loading = false;
            state.currentUser = null;
            state.error = false;
        },
        deletUserFailure : (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        }

    }
})

export const { 
    signInFailure, 
    signInStart, 
    signInSucces, 
    updateUserFailure, 
    updateUserStart, 
    updateUserSuccess,
    deletUserFailure,
    deleteUserStart,
    deleteUserSuccess 
} = userSlice.actions;

export default userSlice.reducer;