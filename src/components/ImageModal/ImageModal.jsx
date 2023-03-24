import { forwardRef, useState, memo } from "react";
import styles from "./ImageModal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ImageModal = forwardRef(({ src, setIsModalOpen }, ref) => {
    const [stickyModal, setStickyModal] = useState(window.pageYOffset)
    document.addEventListener('scroll', () => {
        setStickyModal(window.pageYOffset)
    })
    return (
        <div ref={ref} className={styles.imageModal__wrapper} style={{ top: `${stickyModal}px` }} >
            <img src={src} alt="modal" />
            <div className={styles.imageModal__closeIcon} onClick={() => { setIsModalOpen(false) }}><AiOutlineCloseCircle style={{ color: "white", fontSize: "1.5em" }} /></div>
        </div>
    );
})

export default memo(ImageModal);