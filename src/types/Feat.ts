export interface Feat {
    id: string;
    name: string;
    description: string;
    dnd_class_id: string;
}

export interface PostFeat {
    feat: {
        id: string;
        name: string;
        description: string;
        dnd_class_id: string;
    }
}

export interface PatchFeat {
    feat: {
        id: string;
        name?: string;
        description?: string;
        dnd_class_id?: string;
    }
}