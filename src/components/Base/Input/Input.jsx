import styles from './Input.module.css'

function Input({ value, onChange, ...inputDefaultProps }) {
    return <><input type='text' value={value} onChange={onChange} className={styles.input} {...inputDefaultProps} /></>;
}

export default Input;