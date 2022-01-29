import { GameEntity } from "@/types";

export function isInFavorites(id:string, entityType:GameEntity) {
    const favorites =  JSON.parse( localStorage.getItem('favorites') || '{}');
    return entityType in favorites && favorites[entityType].includes(id);
}

export function handleToggleFavorite(id:string, entityType:GameEntity) {
    const favorites =  JSON.parse( localStorage.getItem('favorites') || '{}');
    if ( isInFavorites(id, entityType) ) {
        favorites[entityType] = favorites[entityType].filter( (id) => id !== id);
    } else {
        if (entityType in favorites) {
            favorites[entityType].push(id);
        } else {
            favorites[entityType] = [id];
        }
    }
    localStorage.setItem('favorites',  JSON.stringify(favorites) );
}