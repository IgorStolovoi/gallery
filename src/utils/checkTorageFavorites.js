import { parseFavoriteImages } from "./getImagesFromStorage"
export const checkForExsistanceInStorage = function (id) {
    const storageImages = parseFavoriteImages();
    return storageImages.some(el => el.id === id)
}