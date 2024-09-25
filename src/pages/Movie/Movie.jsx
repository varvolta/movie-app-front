import { useEffect, useState } from 'react'
import styles from './movie.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../../core/Input'
import Button from '../../core/Button'
import { FileUploader } from "react-drag-drop-files";
import Icon from '../../core/Icon'
import { onChangeBody } from '../../resources/utils'
import movieApi from '../../api/movie.api'
import toast from 'react-hot-toast'
const fileTypes = ["JPG", "PNG", "GIF"];

const Movie = () => {
    const navigate = useNavigate()
    const [body, setBody] = useState({})
    const history = useLocation()

    useEffect(() => {
        setBody(history.state)
    }, [history.state])
    const onFinish = (e) => {
        setBody(onChangeBody(e.target.value, e.target.name, true, body))
    }
    console.log(body)

    return (
        <div className={styles.root}>
            <h1>
                {history.state ? 'Edit' : 'Create a new movie'}
            </h1>
            <div className={styles.block}>

                <FileUploader
                    handleChange={(f) => {

                        setBody(p => ({ ...p, poster: f }))

                    }}
                    name="file"
                    types={fileTypes}
                    classes={[styles.uploader].join(' ')}
                    onTypeError={(e) => console.log(e)}
                >
                    <Icon name={'Plus'} />
                    <p>Drop an image here</p>
                </FileUploader>


                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px 0"
                }}>
                    <Input placeholder={'Title'}
                        name={'title'}
                        onChange={onFinish}
                    />
                    <Input placeholder={'Publishing year'}
                        type='number'
                        name={'year'}
                        onChange={onFinish}
                    />
                    <div className={styles.row}>
                        <Button variant={'secondary'}
                            onClick={() => navigate(-1)}
                        >Cancel</Button>
                        <Button variant={'primary'}
                            onClick={() => {
                                const form = new FormData()

                                Object.entries(body).forEach(([key, value]) => {
                                    form.append(key, value)
                                })
                                if (history.state) {
                                    movieApi.edit(body._id, form)
                                        .then(() => {
                                            navigate('/my-movies')
                                        })
                                        .catch(e => {
                                            toast.error(e.toString())
                                        })
                                } else {
                                    movieApi.addMovie(form)
                                        .then(() => {
                                            navigate('/my-movies')
                                        })
                                        .catch(e => {
                                            toast.error(e.toString())
                                        })
                                }


                            }}
                        >Submit</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Movie