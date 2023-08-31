import { Spellcasting } from "@/enums";

export interface DndClass {
    id: string;
    name: string;
    description: string;
    hitdie: string;
    armor: string;
    weapons: string;
    tools: string;
    saves: string;
    skills: string; 
    equipment: string[]; 
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
        hitdie: string;
        armor: string;
        weapons: string;
        tools: string;
        saves: string;
        skills: string; 
        equipment: string[]; 
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
        hitdie?: string;
        armor?: string;
        weapons?: string;
        tools?: string;
        saves?: string;
        skills?: string; 
        equipment?: string[]; 
        spellcasting?: Spellcasting;
        table_cols?: {
            [title: string]: string[]
        };
        features: string[];
    }
}