import { createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../api/movie.api';
import { movieActions } from '../slices/movie.slice';
import toast from 'react-hot-toast';

export const getMovies = createAsyncThunk(
    'movie/getAll',
    async ({ offset }, { dispatch }) => {
        dispatch(movieActions.setIsLoading(true));
        movieApi
            .getMovies(offset)
            .then((res) => {
                dispatch(movieActions.setData(res.data));
            })
            .catch((e) => {
                toast.error(e.toString());
            })
            .then(() => {
                dispatch(movieActions.setIsLoading(false));
            });
    }
);
