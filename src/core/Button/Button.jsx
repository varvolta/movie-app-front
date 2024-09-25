import React from 'react'
import styles from './button.module.css'

const Button = ({
    children,
    onClick = () => { },
    variant,
    disabled = false,
    onClickDisabled = () => { },
    className = '',
    style = {},
}) => {

    return (
        <div className={[
            styles.root,
            styles[`${variant}${disabled ? '_disabled' : ''}`],
            className,
        ].join(' ')}
            style={style}
            onClick={() => {
                disabled ?
                    onClickDisabled() :
                    onClick()
            }}
        >
            {children}
        </div>
    )
}

export default Button