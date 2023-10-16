import { Collection } from "@/types";

export function collectionContainsEntity(collection:Collection, entityID: string) {
    return collection.entities.some( (e) => e.id === entityID);
}