import { APIEntity, FeatureKind } from "@/enums";
import { Feature } from "@/types";

export function apiFeatureKindToClientFeatureType(kind:string) {
    switch(kind) {
        case('core'):
            return 'Core';
        case('major'):
            return 'Feat';
        case('minor'):
            return 'Boon';
        default:
            return '';
    }
}

interface filterFeaturesOptions {
    name?: string;
    kind?: FeatureKind;
    level?: string;
    levelDir?: number;
    sourceType?: APIEntity;
    source?: string;
}

export function filterFeatures(list:Feature[], options:filterFeaturesOptions) {
    const {name, kind, level, levelDir, source, sourceType} = options;
    const filtered = list.filter( (feature) => {
        const nameMatch = name ? feature.name.toLowerCase().startsWith( name.toLowerCase() ) : true;
        const kindMatch = kind ? feature.kind === kind : true;
        const sourceTypeMatch = sourceType ? feature.sources.some( s => s.source_type === sourceType ) : true;
        const sourceMatch = source ? feature.sources.some( s => s.id === source ) : true;

        let levelMatch = true;
        if (level !== undefined && levelDir !== undefined) {
            if (feature.level) {
                if (levelDir === 0) {
                    levelMatch = feature.level === parseInt(level);
                } else {
                    levelMatch = feature.level * levelDir > parseInt(level) * levelDir;
                }
            } else {
                levelMatch = false;
            }
        }

        return nameMatch && kindMatch && sourceTypeMatch && sourceMatch && levelMatch;
    });
    return filtered;
}