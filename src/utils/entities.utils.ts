import { GameEntity } from "@/types";

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