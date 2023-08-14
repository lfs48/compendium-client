import { GameEntity } from "@/types";
import { isInFavorites } from "./favorites.utils";
import { spaceship } from "./functions.utils";
import { capitalize } from 'lodash';

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
            return 'dndClasses' as GameEntity;
        case('Race'):
            return 'races' as GameEntity;
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
        case('spells'):
            return 'fas fa-meteor';
        default:
            return '';
    }
}

export function entityName(entity:GameEntity) {
    switch(entity) {
        case('dndClasses'):
            return 'Classes';
        default:
            return capitalize(entity);
    }
}

export function filterEntities(list:any[], name:string) {
    return list
    .filter( (entity:any) => entity.name.toLowerCase().startsWith( name.toLowerCase() ) )
}

interface CompareOptions {
    field?: string;
    dir?: number;
    considerFaves?: boolean;
}

export function sortEntities(list:any[], options:CompareOptions={}) {
    return list.sort( (a,b) => compareEntities(a,b, options) );
}

export function compareEntities(e1:any, e2:any, options:CompareOptions={}) {
    const field = options.field || 'name';
    const dir = options.dir || 1;
    const n1 = e1[field].toLowerCase();
    const n2 = e2[field].toLowerCase();
    const f1 = isInFavorites(e1.id);
    const f2 = isInFavorites(e2.id);
    if (options.considerFaves) {
        if( f1 && !f2 ) {
            return -1;
        } else if ( f2 && !f1 ) {
            return 1;
        } else {
            return spaceship(n1, n2) * dir;
        }
    } else {
        return spaceship(n1, n2) * dir;
    }
}