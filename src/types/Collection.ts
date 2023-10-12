import { APIEntity } from "@/enums";

export interface Collection {
    id: string
    title: string;
    entities: CollectionEntity[];
}

export interface CollectionEntity {
    id: string;
    entity_type: APIEntity;
}

export interface PostCollection {
    collection: Collection;
}

export interface PatchCollection {
    collection: {
        id: string;
        title?: string;
        entities?: CollectionEntity[];
    }
}