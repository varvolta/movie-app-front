import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    data: null,
};

export const movieSlice = createSlice({
    name: 'movie',
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

export const movieActions = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
