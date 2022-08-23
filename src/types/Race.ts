export interface Race {
    id: string;
    name: string;
    description: string;
    creature_type: string;
    size: string;
    features: string[];
}

export interface PostRace {
    Race: {
        id: string;
        name: string;
        description: string;
        creature_type: string;
        size: string;
        features: string[];
    }
}

export interface PatchRace {
    Race: {
        id: string;
        name?: string;
        description?: string;
        creature_type?: string;
        size?: string;
        features?: string[];
    }
}