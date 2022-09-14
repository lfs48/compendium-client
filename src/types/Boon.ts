export interface Boon {
    id: string;
    name: string;
    description: string;
    prereq?: string;
    source_id?: string;
    source_type?: BoonSourceType;
}

type BoonSourceType = 'DndClass' | 'Race';

export interface PostBoon {
    boon: {
        id: string;
        name: string;
        description: string;
        prereq?: string;
        source_id?: string;
        source_type?: BoonSourceType;
    }
}

export interface PatchBoon {
    boon: {
        id: string;
        name?: string;
        description?: string;
        prereq?: string;
        source_id?: string;
        source_type?: BoonSourceType;
    }
}