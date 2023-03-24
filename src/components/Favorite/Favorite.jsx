import { useEffect, useState } from "react";
import Button from "../Base/Button/Button";
import ImageList from "../ImagesGrid/ImageList/ImageList";
import { useHistory } from "react-router-dom";
import { parseFavoriteImages } from "../../utils/getImagesFromStorage";
import styles from "./Favorite.module.css";

function Favorite() {
    const [favorites, setFavorites] = useState([])
    const history = useHistory();

    useEffect(() => {
        const parsedItems = parseFavoriteImages();
        setFavorites({ items: parsedItems.map(el => ({ ...el, isFavorite: true })), totalHits: parsedItems.length })
    }, [favorites.totalHits])

    const toggleFavoriteState = (id) => {
        const parsedItems = parseFavoriteImages();
        if (parsedItems.length) {
            const updatedList = parsedItems.filter(el => el.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedList))
            setFavorites({ items: updatedList, totalHits: updatedList.length })
        }
    }

    return (
        <>
            <h2 className={styles.favorites__heading}>Favorites</h2>
            <div className={styles.favorite__list}>
                {favorites.items?.length ? <ImageList images={favorites} toggleFavoriteState={toggleFavoriteState} /> : <h3 style={{ textAlign: 'center' }}>No Favorites</h3>}
            </div>
            <div className={styles.favorites__actions}>
                <Button text="Go back" onClick={() => { history.push("/"); }} />
            </div>
        </>
    );
}

export default Favorite;