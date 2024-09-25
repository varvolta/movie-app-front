import React from 'react'
import styles from './movieContainer.module.css'
import MovieCard from '../../components/Card'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { getMovies } from '../../store/asyncThunks/movie';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

const MovieContainer = () => {
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movies)
    const navigate = useNavigate()

    if (movies.isLoading) {
        return <ReactLoading height={50} width={50} />
    }

    return (
        <div >
            <div className={styles.movies}>
                {
                    movies?.data?.data?.map(movie => {
                        return (
                            <MovieCard key={movie._id}
                                title={movie.title}
                                date={movie.year}
                                img={movie.poster}
                                onClick={() => {
                                    navigate('/movie', { state: movie })
                                }}
                            />
                        )
                    })
                }
            </div>
            {movies.data?.total > 8 && <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={(e) => {
                    if (e.selected > 0) {
                        dispatch(getMovies({ offset: e.selected * 8 }))
                    }
                }}
                pageRangeDisplayed={5}
                pageCount={Math.ceil(movies.data?.total / 8)}
                previousLabel="Prev"
                renderOnZeroPageCount={null}
                containerClassName={styles.pagination_item}
                nextClassName={styles.next}
                previousClassName={styles.prev}
                activeClassName={styles.active}
            />}
        </div>

    )
}

export default MovieContainer