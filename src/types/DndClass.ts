import { Spellcasting } from "./Spellcasting";

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
    subclass_title: string;
    subclass_feature_levels: string;
    features: [
        {
            id: string;
            level?: number;
        }
    ]
}

export interface PostDndClass {
    id: string;
    dndClass: {
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
        subclass_title: string;
        subclass_feature_levels: string;
    }
}

export interface PatchDndClass {
    id: string;
    dndClass: {
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
        subclass_title?: string;
        subclass_feature_levels?: string;
    }
}