export interface Character {
    owner: string;
    name: string;
    race: string;
    dnd_class: string;
    level: number;
    prof: number;
    AC: number;
    scores: AbilityScores;
    hp: Hitpoints;
    hitdice: Hitdice;
    saves: SavingThrows;
    skills: Skills;
    resistances: DamageTypes;
    immunities: DamageTypes;
    training: Training;
    inventory: InventorySlot[];
    feature_ids: string[];
    spell_ids: [];
    currency: number;
}

export interface AbilityScores {
    str: number;
    dex: number;
    con: number;
    int: number;
    awa: number;
    cha: number;
}

export interface Hitpoints {
    current: number;
    max: number;
    temp: number;
    mod: number;
}

export interface Hitdice {
    current: number;
    max: number;
}

export interface SavingThrows {
    fortitude: boolean;
    reflex: boolean;
    willpower: boolean;
}

export interface AC {
    base: number;
    touch: number;
    static: number;
}

export interface Skills {
    arcana: boolean;
    acrobatics: boolean;
    animal_handling: boolean;
    athletics: boolean;
    endearment: boolean;
    inspection: boolean;
    intimidation: boolean;
    lookout: boolean;
    medicine: boolean;
    navigation: boolean;
    nature: boolean;
    persuasion: boolean;
    society: boolean;
    subtelty: boolean;
    weightwork: boolean;
}

export interface DamageTypes {
    burning?: boolean;
    crushing?: boolean;
    cutting?: boolean;
    dousing?: boolean;
    ethereal?: boolean;
    freezing?: boolean;
    necrotic?: boolean;
    psychic?: boolean;
    radiant?: boolean;
    toxic?: boolean;
    shocking?: boolean;
    sonic?: boolean;
}

export interface Training {
    weapons: string;
    armor: string;
}

export interface InventorySlot {
    quantity: number;
    label: string;
    description?: string;
    bulk: number;
}

export interface Attack {
    label: string;
    hit_roll: string;
    damage_roll: string;
    damageType: string;
}