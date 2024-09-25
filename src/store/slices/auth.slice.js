import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    data: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
