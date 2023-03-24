import ImageItem from "../ImageItem/ImageItem";
import styles from "./ImageList.module.css"
import InfiniteScroll from 'react-infinite-scroll-component';
import { createRef } from "react";

const ImageList = function ({ images, loadNew = () => { }, toggleFavoriteState }) {
    const modalRef = createRef()

    return (
        <InfiniteScroll
            dataLength={images.items.length}
            next={loadNew}
            hasMore={true}
        >
            <div className={styles.imageList}>
                {images.items?.length ?
                    images.items.map(
                        ({ previewURL, id, isFavorite, largeImageURL }) => <ImageItem ref={modalRef} key={id} onFavorite={() => { toggleFavoriteState(id) }} src={previewURL} hightResSrc={largeImageURL} isFavorite={isFavorite} />)
                    : <h3>No results</h3>}
            </div>
        </InfiniteScroll>
    )
}

export default ImageList;