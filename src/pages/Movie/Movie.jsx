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
import ReactLoading from 'react-loading';

const fileTypes = ["JPG", "PNG", "GIF"];

const Movie = () => {
    const navigate = useNavigate()
    const [body, setBody] = useState({})
    const [img, setImg] = useState(null)
    const history = useLocation()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setBody(history.state)
        if (history?.state?.poster) {
            setImg('https://autohackers.am:3000/' + history?.state?.poster?.replaceAll(`/\/`, `/`)?.replaceAll(' ', '_'))
        }
    }, [history.state])

    const onFinish = (e) => {
        setBody(onChangeBody(e.target.value, e.target.name, true, body))
    }

    return (
        <div className={styles.root}>
            <h1>
                {history.state ? 'Edit' : 'Create a new movie'}
            </h1>
            <div className={styles.block}>
                <FileUploader
                    handleChange={(f) => {
                        if (f) {
                            setBody(p => ({ ...p, poster: f }))
                            setImg(URL.createObjectURL(f))
                        }
                    }}
                    name="file"
                    types={fileTypes}
                    classes={[styles.uploader].join(' ')}
                    onTypeError={(e) => toast.error(e)}
                >
                    {img ?
                        <img src={img} alt="" className={styles.image_presenter} /> :
                        <div className={styles.content}>
                            <Icon name={'Plus'} />
                            <p>Drop an image here</p>
                        </div>}
                </FileUploader>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px 0"
                }}>
                    <Input placeholder={'Title'}
                        name={'title'}
                        onChange={onFinish}
                        value={body?.title}
                    />
                    <Input placeholder={'Publishing year'}
                        type='number'
                        name={'year'}
                        onChange={onFinish}
                        value={body?.year}
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
                                setIsLoading(true)
                                if (history.state) {
                                    movieApi.edit(body._id, form)
                                        .then(() => {
                                            navigate('/my-movies')
                                        })
                                        .catch(e => {
                                            toast.error(e.toString())
                                        })
                                        .then(() => {
                                            setIsLoading(false)
                                        })
                                } else {
                                    movieApi.addMovie(form)
                                        .then(() => {
                                            navigate('/my-movies')
                                        })
                                        .catch(e => {
                                            toast.error(e.toString())
                                        }).then(() => {
                                            setIsLoading(false)
                                        })
                                }
                            }}
                        >Submit {isLoading && <ReactLoading height={30} width={30} />}</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Movie