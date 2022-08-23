import { GameEntity } from "@/types";

export function entityFormPath(entityType: GameEntity) {
    switch(entityType) {
        case('dndClasses'):
            return 'classes'
        case('features'):
            return 'features'
        case('races'):
            return 'races'
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
            return 'fas fa-sword';
        case('features'):
            return 'fas fa-award';
        case('races'):
            return 'fas fa-head-side';
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
        default:
            return 'Races';
    }
}