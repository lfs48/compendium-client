import { APIEntity, FeatureKind } from "@/enums";

export interface Feature {
    id: string;
    name: string;
    description: string;
    level?: number;
    prereq?: string;
    kind: FeatureKind;
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
        kind: FeatureKind;
    }
}

export interface PatchFeature {
    feature: {
        id: string;
        name?: string;
        description?: string;
        level?: number;
        prereq?: string;
        kind?: FeatureKind;
    }
}