import styles from "./Button.module.css"

function Button({ text, onClick = () => { }, loadingState = false, ...defaultButtonProps }) {
    return <button value={text} className={loadingState ? styles.button_loading : styles.button} onClick={onClick} {...defaultButtonProps}>{text}
    </button>;
}

export default Button;