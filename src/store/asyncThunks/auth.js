import { createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../../api/auth.api';
import { authActions } from '../slices/auth.slice';
import toast from 'react-hot-toast';

export const login = createAsyncThunk(
    'auth/login',
    async ({ body, navigate }, { dispatch }) => {
        dispatch(authActions.setIsLoading(true));

        auth.signin(body)
            .then((res) => {
                navigate('/my-movies');
                dispatch(authActions.setData(res.data));
                localStorage.setItem('token', res.data.token);
            })
            .catch((e) => {
                toast.error(e.toString());
            })
            .then(() => {
                dispatch(authActions.setIsLoading(false));
            });
    }
);
