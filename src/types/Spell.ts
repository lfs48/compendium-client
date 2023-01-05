export interface Spell {
    id: string;
    name: string;
    description: string;
    rank: string;
    verbal: boolean;
    somatic: boolean;
    material: boolean;
    material_description?: string;
    concentration: boolean;
    duration: string;
    range: string;
    casting_time: string;
    higher_level?: string;
    dnd_class_ids: string[];
}

export interface PostSpell {
    spell: {
        id: string;
        name: string;
        description: string;
        rank: string;
        verbal: boolean;
        somatic: boolean;
        material: boolean;
        material_description?: string;
        concentration: boolean;
        duration: string;
        range: string;
        casting_time: string;
        higher_level?: string;
        dnd_class_ids: string[];
    }
}

export interface PatchSpell {
    spell: {
        id: string;
        name?: string;
        description?: string;
        rank?: string;
        verbal?: boolean;
        somatic?: boolean;
        material?: boolean;
        material_description?: string;
        concentration?: boolean;
        duration?: string;
        range?: string;
        casting_time?: string;
        higher_level?: string;
        dnd_class_ids?: string[];
    }
}