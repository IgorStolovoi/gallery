export const parseFavoriteImages = () => {
    const images = localStorage.getItem('favorites')
    if (images) {
        return JSON.parse(images);
    }
    else {
        return [];
    }
}