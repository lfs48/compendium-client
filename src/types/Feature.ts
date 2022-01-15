export interface Feature {
    id: string;
    name: string;
    description: string;
    kind: string;
    category: string;
    sources: [
        {
            id: string;
            source_type: string;
            level?: number;
        }
    ]
}

export interface PostFeature {
    id: string;
    feature: {
        name: string;
        description: string;
        kind: string;
        category: string;
    }
}

export interface PatchFeature {
    id: string;
    feature: {
        name?: string;
        description?: string;
        kind?: string;
        category?: string;
    }
}