import styles from "./ImageITem.module.css";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md"
import ImageModal from "../../ImageModal/ImageModal";
import { forwardRef, useState } from "react";

const ImageItem = forwardRef(({ src, isFavorite, onFavorite, hightResSrc }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleFavoriteState = (e) => {
        e.stopPropagation()
        onFavorite()
    }

    const onModalOpen = () => {
        if (ref.current) {
            return;
        }
        setIsModalOpen(true);
    }

    return <>
        <div className={styles.imageItem} onClick={onModalOpen}>
            <img alt='gallery' src={src} />
            <div className={styles.imageItem__favorite} onClick={handleFavoriteState} >
                {isFavorite ? <MdFavorite /> : <GrFavorite />}
            </div>
        </div>
        {isModalOpen && <ImageModal ref={ref} src={hightResSrc} setIsModalOpen={setIsModalOpen} />}
    </>
})

export default ImageItem;