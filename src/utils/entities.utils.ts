import { GameEntity } from "@/types";

export function entityFormPath(entityType: GameEntity) {
    switch(entityType) {
        case('dndClasses'):
            return 'classes'
        case('features'):
            return 'features'
    }
}

export function apiSourceTypeToGameEntity(sourceType:string) {
    switch(sourceType) {
        case('DndClass'):
            return 'dndClasses';
    }
}