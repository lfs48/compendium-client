export interface Item {
    id: string;
    name: string;
    description: string;
    kind: ItemKind;
    rarity: ItemRarity;
    magic: boolean;
    bulk: number;
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
        bulk: number;
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
        bulk?: number;
        value?: string;
    }
}

export enum ItemKind {
    Armor='armor',
    Weapon='weapon',
    Tool='tool',
    Commodity='commodity',
    Gear='gear',
    Treasure='treasure',
    Wondrous='wondrous',
    Consumable='consumable'
}

export enum ItemRarity {
    Common='common',
    Uncommon='uncommon',
    Rare='rare',
    Legendary='legendary',
    Artifact='artifact'
}