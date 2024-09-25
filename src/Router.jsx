import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import MyMovies from './pages/MyMovies';
import Movie from './pages/Movie';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Signin />}
                />
                <Route
                    path='/my-movies'
                    element={<MyMovies />}
                />
                <Route
                    path='/movie'
                    element={<Movie />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default Router;
