import { Spellcasting } from "@/enums";

export interface DndClass {
    id: string;
    name: string;
    description: string;
    hp: string;
    armor: string;
    weapons: string;
    defenses: string;
    skills: string; 
    equipment: string; 
    spellcasting: Spellcasting;
    table_cols: {
        [title: string]: string[]
    };
    features: string[];
}

export interface PostDndClass {
    dndclass: {
        id: string;
        name: string;
        description: string;
        hp: string;
        armor: string;
        weapons: string;
        defenses: string;
        skills: string; 
        equipment: string; 
        spellcasting: Spellcasting;
        table_cols: {
            [title: string]: string[]
        };
        features: string[];
    }
}

export interface PatchDndClass {
    dndclass: {
        id: string;
        name?: string;
        description?: string;
        hp?: string;
        armor?: string;
        weapons?: string;
        defenses?: string;
        skills?: string; 
        equipment?: string; 
        spellcasting?: Spellcasting;
        table_cols?: {
            [title: string]: string[]
        };
        features: string[];
    }
}