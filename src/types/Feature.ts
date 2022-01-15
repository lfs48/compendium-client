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