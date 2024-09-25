import React from 'react'
import styles from './movieCard.module.css'


const MovieCard = ({
    title,
    date,
    img,
    onClick = () => {

    }
}) => {

    return (
        <div className={styles.root}
            onClick={onClick}>

            <img src={'http://localhost:3000/' + img.replaceAll(`/\/`, `/`)} alt="" />
            <div className={styles.title}>{title}</div>
            <div className={styles.date}>{date}</div>
        </div>
    )
}

export default MovieCard