import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth.slice';
import { movieReducer } from './slices/movie.slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: movieReducer,
    },
});

export default store;
