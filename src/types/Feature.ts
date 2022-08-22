export interface Feature {
    id: string;
    name: string;
    description: string;
    kind: string;
    level?: number;
    sources: Source[];
}

interface Source {
    id: string;
    source_type: string;
}

export interface PostFeature {
    feature: {
        id: string;
        name: string;
        description: string;
        kind: string;
        level?: number;
    }
}

export interface PatchFeature {
    feature: {
        id: string;
        name?: string;
        description?: string;
        kind?: string;
        level?: number;
    }
}