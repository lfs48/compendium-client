import { spaceship } from "./functions.utils";
import { capitalize } from 'lodash';
import { APIEntity, Entity } from "@/enums";

export function entityFormPath(entityType: Entity) {
    switch(entityType) {
        case(Entity.dndClasses):
            return 'classes'
        default:
            return entityType.toLowerCase();
    }
}

export function apiEntityToClientEntity(entityType:APIEntity) {
    switch(entityType) {
        case(APIEntity.DndClass):
            return Entity.dndClasses;
        case(APIEntity.Race):
            return Entity.races;
        case(APIEntity.Feature):
            return Entity.features;
        case(APIEntity.Spell):
            return Entity.spells;
        case(APIEntity.Item):
            return Entity.items;
    }
}

export function clientEntityToAPIEntity(entityType:Entity) {
    switch(entityType) {
        case(Entity.dndClasses):
            return APIEntity.DndClass;
        case(Entity.features):
            return APIEntity.Feature;
        case(Entity.items):
            return APIEntity.Item;
        case(Entity.races):
            return APIEntity.Race;
        case(Entity.spells):
            return APIEntity.Spell;
    }
}

export function entityIcon(entity:Entity) {
    switch(entity) {
        case(Entity.dndClasses):
            return 'fas fa-swords';
        case(Entity.features):
            return 'fas fa-award';
        case(Entity.races):
            return 'fas fa-child';
        case(Entity.spells):
            return 'fas fa-meteor';
        case(Entity.items):
            return 'fas fa-flask-potion';
        default:
            return '';
    }
}

export function entityName(entity:Entity) {
    switch(entity) {
        case(Entity.dndClasses):
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
}

export function sortEntities(list:any[], options:CompareOptions={}) {
    return list.sort( (a,b) => {
        return compareEntities(a,b, options);
    });
}

export function compareEntities(e1:any, e2:any, options:CompareOptions={}) {
    const field = options.field !== undefined ? options.field : 'name';
    const dir = options.dir !== undefined ? options.dir : 1;
    const f1 = e1[field] ? (e1[field]+'').toLowerCase() : '';
    const f2 = e2[field] ? (e2[field]+'').toLowerCase() : '';
    const comp = spaceship(f1, f2) * dir;
    if (comp === 0 && field !== 'name') {
        const n1 = e1.name.toLowerCase();
        const n2 = e2.name.toLowerCase();
        return spaceship(n1,n2);
    } else {
        return comp;
    }
}