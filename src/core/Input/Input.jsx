import { useEffect, useState, useRef } from "react";
import styles from './input.module.css'
import { validateField } from "./utils";
import { debounce } from "../../resources/utils";
import Icon from "../Icon";
import regexp from "./regexp";

const Input = ({
    type = 'text',
    validationKey,
    errorMessage,
    onChange = () => { },
    onFinish,
    value = '',
    ...props
}) => {
    const [visibility, setVisibility] = useState(validationKey === "password");
    const [defaultValue, setDefaultValue] = useState(value);
    const [isValid, setIsValid] = useState(false);
    const _debounce = debounce(onFinish, 500)

    useEffect(() => {
        setDefaultValue(value);
    }, [value]);

    useEffect(() => {
        if (validationKey) {
            const _isValid = validateField(validationKey, defaultValue);
            setIsValid(_isValid);
        }
        setIsValid(true);
    }, []);

    const onTextChange = e => {
        setDefaultValue(e.target.value);

        if (validationKey) {
            // [--- handled when user finished typing >>>
            const _isValid = validateField(validationKey, e.target.value);
            setIsValid(_isValid);

            if (onFinish) return _debounce(e, _isValid)
            return onChange?.(e, _isValid)
        }
        // [--- handled when user finished typing >>>
        if (onFinish) return _debounce(e)
        return onChange?.(e);
    };

    return (
        <div className={styles.root}>
            <div className={styles.row}
                style={{
                    borderColor: validationKey && !isValid && 'rgb(220, 90, 90)',
                }}
            >
                <input type={validationKey === 'password' ? (visibility ? 'password' : 'text') : type}
                    value={defaultValue}
                    style={{
                        color: validationKey && !isValid && 'var(--error-color)',
                    }}
                    onChange={onTextChange}
                    {...props}
                />
                {validationKey === "password" && defaultValue.length > 0 ? (<span onClick={() => setVisibility(!visibility)}>
                    <Icon
                        name={
                            visibility ?
                                "Eye" :
                                "EyeOff"
                        }
                        size={20}
                        color={!isValid ? 'var(--error-color)' : '#fff'}
                    />
                </span>) : null}
            </div>
            {defaultValue.length > 0 && !isValid && <div className={styles.warning}>
                {errorMessage || regexp[validationKey]?.errorMessage}
            </div>}
        </div>
    )
}

export default Input