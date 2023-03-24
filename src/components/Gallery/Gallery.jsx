import { useEffect, useState } from "react";
import ImageList from "../ImagesGrid/ImageList/ImageList";
import SearchBar from "../SearchBar/SearchBar";
import { getImages } from "../../api/getImages";
import styles from "./Gallery.module.css"
import { parseFavoriteImages } from "../../utils/getImagesFromStorage";
import { checkForExsistanceInStorage } from "../../utils/checkTorageFavorites";

function Gallery() {
    const [gallery, setGallery] = useState(
        {
            items: [],
            totalHits: 0,
            page: 1,
            loading: false,
            error: false,
            userInput: ''
        }
    );
    useEffect(() => {
        //Compare favorite state from localstorage with new images
        if (gallery.items.length) {
            const storageImages = parseFavoriteImages()
            if (storageImages.length) {
                let equalElFromState = gallery.items.map(stateEl => {
                    if (checkForExsistanceInStorage(stateEl.id)) {
                        return { ...stateEl, isFavorite: true }
                    }
                    return stateEl
                })
                setGallery(prev => ({ ...prev, items: equalElFromState }))
            }
        }
    }, [gallery.totalHits, gallery.userInput])

    const expandImages = ({ hits, totalHits }) => {
        const expandedWithFavoriteState = hits.map(el => {
            if (checkForExsistanceInStorage(el.id)) {
                return { ...el, isFavorite: true }
            }
            else {
                return { ...el, isFavorite: false }
            }
        })
        setGallery(prev => ({ ...prev, items: expandedWithFavoriteState, totalHits }))
    }

    const removeError = () => setGallery(prev => ({ ...prev, error: false }))

    const toggleFavoriteState = (id) => {
        const storageImages = parseFavoriteImages()
        if (storageImages.length) {
            if (checkForExsistanceInStorage(id)) {
                const updatedList = storageImages.filter(el => id !== el.id)
                localStorage.setItem('favorites', JSON.stringify(updatedList));
            }
            else {
                const newStorageItem = gallery.items.find(el => el.id === id)
                localStorage.setItem('favorites', JSON.stringify([...storageImages, newStorageItem]));
            }
        }
        else if (!storageImages.length) {
            const firstFavorite = gallery.items.filter(el => el.id === id)
            localStorage.setItem('favorites', JSON.stringify(firstFavorite));
        }
        const stateImages = gallery.items.map(el => {
            if (el.id === id) {
                return { ...el, isFavorite: !el.isFavorite }
            }
            return el;
        })
        setGallery(prev => ({ ...prev, items: stateImages }))
    }

    const onSearch = async (searchValue, page = 1) => {
        try {
            setGallery(prev => ({ ...prev, loading: true, searchValue }))
            const res = await getImages(searchValue, page);
            if (!res.hits?.length) {
                setGallery(prev => ({ ...prev, loading: false, error: "No results" }))
                return;
            }
            expandImages(res);
            setGallery(prev => ({ ...prev, loading: false }))
        } catch (error) {
            setGallery({ loading: false, error: 'Something went wrong' })
        }
    }

    const loadNewSlice = async () => {
        try {
            setGallery(prev => ({ ...prev, page: prev.page + 1 }));
            const res = await getImages(gallery.searchValue, gallery.page + 1);
            expandImages({ hits: [...gallery.items, ...res.hits], totalHits: res.totalHits })
        } catch (err) {
            setGallery({ error: 'Something went wrong' })
        }
    }

    return (
        <section className={styles.gallery} >
            <div className={gallery.items?.length ? styles.gallery__searchBar_withResult : styles.gallery__searchBar}>
                <SearchBar onSubmit={onSearch} error={gallery.error} loading={gallery.loading} clearError={removeError} />
            </div>
            {
                <div className={gallery.items.length ? styles.gallery__items_active : styles.gallery__items}>
                    {!!gallery.items.length && <ImageList images={gallery} loadNew={loadNewSlice} toggleFavoriteState={toggleFavoriteState} />}
                </div>
            }
        </section >
    )
}

export default Gallery;