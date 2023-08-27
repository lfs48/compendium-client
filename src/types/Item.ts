import { ItemKind, ItemRarity, ItemBulk } from "@/enums";

export interface Item {
    id: string;
    name: string;
    description: string;
    kind: ItemKind;
    rarity: ItemRarity;
    magic: boolean;
    bulk: ItemBulk;
    value: string;
}

export interface PostItem {
    item: {
        id: string;
        name: string;
        description: string;
        kind: ItemKind;
        rarity: ItemRarity;
        magic?: boolean;
        bulk: ItemBulk;
        value: string;
    }
}

export interface PatchItem {
    item: {
        id: string;
        name?: string;
        description?: string;
        kind?: ItemKind;
        rarity?: ItemRarity;
        magic?: boolean;
        bulk?: ItemBulk;
        value?: string;
    }
}