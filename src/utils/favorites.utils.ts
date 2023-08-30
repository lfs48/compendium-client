export function isInFavorites(id:string) {
    const favorites =  JSON.parse( localStorage.getItem('favorites') || '{}');
    return id in favorites;
}

export function handleToggleFavorite(id:string) {
    const favorites =  JSON.parse( localStorage.getItem('favorites') || '{}');
    if ( isInFavorites(id) ) {
        delete favorites[id];
    } else {
        favorites[id] = true;
    }
    localStorage.setItem('favorites',  JSON.stringify(favorites) );
}