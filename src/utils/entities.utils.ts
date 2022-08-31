import { GameEntity } from "@/types";
import { isInFavorites } from "./favorites.utils";

export function entityFormPath(entityType: GameEntity) {
    switch(entityType) {
        case('dndClasses'):
            return 'classes'
        default:
            return entityType;
    }
}

export function apiSourceTypeToGameEntity(sourceType:string) {
    switch(sourceType) {
        case('DndClass'):
            return 'dndClasses';
        case('Race'):
            return 'races'
    }
}

export function entityIcon(entity:GameEntity) {
    switch(entity) {
        case('dndClasses'):
            return 'fas fa-helmet-battle';
        case('features'):
            return 'fas fa-award';
        case('races'):
            return 'fas fa-head-side';
        case('feats'):
            return 'fas fa-swords';
        default:
            return '';
    }
}

export function entityName(entity:GameEntity) {
    switch(entity) {
        case('dndClasses'):
            return 'Classes';
        case('features'):
            return 'Features';
        case('feats'):
            return 'Feats';
        default:
            return 'Races';
    }
}

export function filterEntities(list:any[], name:string) {
    return list
    .filter( (entity:any) => entity.name.toLowerCase().startsWith( name.toLowerCase() ) )
}

export function sortEntities(list:any[]) {
    return list.sort( (a,b) => compareEntities(a,b) );
}

export function compareEntities(e1:any, e2:any) {
    const n1 = e1.name.toLowerCase();
    const n2 = e2.name.toLowerCase();
    const f1 = isInFavorites(e1.id);
    const f2 = isInFavorites(e2.id);
    if( f1 && !f2 ) {
        return -1;
    } else if ( f2 && !f1 ) {
        return 1;
    } else {
        if (n1 > n2) {
            return 1
        } else if (n2 > n1) {
            return -1;
        } else {
            return 0;
        }
    }
}