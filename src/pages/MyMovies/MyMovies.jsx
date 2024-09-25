import React, { useEffect, useLayoutEffect } from "react";
import styles from './myMovies.module.css'
import Button from "../../core/Button";
import Icon from "../../core/Icon";
import MovieCard from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../store/asyncThunks/movie";
import { useDispatch } from "react-redux";
import MovieContainer from "../../containers/MovieContainer";
import { useSelector } from "react-redux";

const MyMovies = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const movies = useSelector(state => state.movies)

    useEffect(() => {
        dispatch(getMovies(1))
    }, [])

    return (
        <div className={styles.root}>
            {movies.data?.data.length ?
                <div>
                    <div className={styles.header}>
                        <div className={styles.my_account}>
                            <span>My Movies</span>
                            <Button
                                onClick={() => {
                                    navigate('/movie')
                                }}
                            ><Icon name={'PlusCircle'} size={20} /></Button>
                        </div>
                        <div>
                            <Button className={styles.log_out_btn}
                                onClick={() => {
                                    navigate('/')
                                    localStorage.clear()
                                }}
                            >
                                Log out <Icon name={'LogOut'} size={16} />
                            </Button>
                        </div>
                    </div>
                    <MovieContainer />
                </div>
                :
                <div className={styles.empty_block}>
                    <div className={styles.title}>Your movie list is empty</div>
                    <Button variant={'primary'}
                        onClick={() => {
                            navigate('/movie')
                        }}
                    >Add a new movie</Button>
                </div>
            }
        </div>
    )
}

export default MyMovies