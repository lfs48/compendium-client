import { SpellAspect } from "@/enums";

export interface Spell {
    id: string;
    name: string;
    description: string;
    rank: string;
    material?: string;
    concentration: boolean;
    duration: string;
    range: string;
    targets: string;
    casting_time: string;
    upcast?: string[];
    aspects: SpellAspect[];
}

export interface PostSpell {
    spell: {
        id: string;
        name: string;
        description: string;
        rank: string;
        material?: string;
        concentration: boolean;
        duration: string;
        range: string;
        targets: string;
        casting_time: string;
        upcast?: string[];
    }
}

export interface PatchSpell {
    spell: {
        id: string;
        name?: string;
        description?: string;
        rank?: string;
        material?: string;
        concentration?: boolean;
        duration?: string;
        range?: string;
        targets?: string;
        casting_time?: string;
        upcast?: string[];
    }
}