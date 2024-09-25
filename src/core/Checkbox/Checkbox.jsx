import { useEffect, useState } from 'react'
import styles from './checkbox.module.css'

const Checkbox = ({
    label,
    checked,
    onChange,
    name
}) => {
    const [_checked, setChecked] = useState(checked)

    useEffect(() => {
        setChecked(checked)
    }, [checked])

    return (
        <label className={styles.root}>
            <input type="checkbox"
                checked={_checked}
                onChange={(e) => {
                    setChecked(e.target.checked)
                    onChange(e)
                }}
                name={name}
            />  <span className={styles.checkmark}></span>
            {label}
        </label>
    )
}

export default Checkbox