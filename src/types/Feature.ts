import { APIEntity } from "@/enums";

export interface Feature {
    id: string;
    name: string;
    description: string;
    level?: number;
    prereq?: string;
    kind: 'core' | 'major' | 'minor';
    sources: Source[];
}

interface Source {
    id: string;
    source_type: APIEntity;
}

export interface PostFeature {
    feature: {
        id: string;
        name: string;
        description: string;
        level?: number;
        prereq?: string;
        kind: 'core' | 'major' | 'minor';
    }
}

export interface PatchFeature {
    feature: {
        id: string;
        name?: string;
        description?: string;
        level?: number;
        prereq?: string;
        kind?: 'core' | 'major' | 'minor';
    }
}