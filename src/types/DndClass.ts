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
    subclass_feature_levels: number[];
    features: ClassFeature[];
}

interface ClassFeature {
    id: string;
    level?: number;
}

export interface PostDndClass {
    dndclass: {
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
        subclass_feature_levels: number[];
    }
}

export interface PatchDndClass {
    id: string;
    dndclass: {
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
        subclass_feature_levels?: number[];
    }
}