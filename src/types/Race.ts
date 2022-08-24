export interface Race {
    id: string;
    name: string;
    description: string;
    features: string[];
}

export interface PostRace {
    race: {
        id: string;
        name: string;
        description: string;
        features: string[];
    }
}

export interface PatchRace {
    race: {
        id: string;
        name?: string;
        description?: string;
        features?: string[];
    }
}