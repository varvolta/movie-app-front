import { useState } from "react";
import styles from './signin.module.css'
import Button from '../../core/Button'
import Input from '../../core/Input'
import Checkbox from '../../core/Checkbox'
import { useNavigate } from "react-router-dom";
import auth from "../../api/auth.api";
import { onChangeBody } from "../../resources/utils";
import { login } from "../../store/asyncThunks/auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Signin = () => {
    const [body, setBody] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = (e, isValid) => {
        setBody(onChangeBody(e.target.value, e.target.name, isValid, body))
    }


    return (
        <div className={styles.root}>
            <div className={styles.block}>
                <div className={styles.title}>Sign in</div>
                <Input
                    validationKey={'email'}
                    name={'email'}
                    placeholder={'Email'}
                    onChange={onFinish}
                    value={body?.email}

                />
                <Input
                    validationKey={'password'}
                    name={'password'}
                    placeholder={'Password'}
                    onChange={onFinish}
                    value={body?.password}
                />
                <div className={styles.checkbox_container}>
                    <Checkbox label={'Remember me'}
                        onChange={(e) => {

                        }}
                    />
                </div>
                <Button variant={'primary'}
                    onClick={() => {
                        dispatch(login({ body, navigate }))
                    }}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Signin