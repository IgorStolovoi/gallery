const API_URL = `https://pixabay.com/api/?key=${process.env.REACT_APP_API_KEY}`;

export async function getImages(searchQuery, page = 1) {
    const correctQuery = searchQuery.split(' ').join('+');
    const images = await fetch(`${API_URL}&q=${correctQuery}&page=${page}`).then(res => res.json());
    return images;
}