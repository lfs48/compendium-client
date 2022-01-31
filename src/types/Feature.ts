export interface Feature {
    id: string;
    name: string;
    description: string;
    kind: string;
    category: string;
    sources: Source[];
}

interface Source {
    id: string;
    source_type: string;
    level?: number;
}

export interface PostFeature {
    feature: {
        id: string;
        name: string;
        description: string;
        kind: string;
        category: string;
    }
}

export interface PatchFeature {
    feature: {
        id: string;
        name?: string;
        description?: string;
        kind?: string;
        category?: string;
    }
}