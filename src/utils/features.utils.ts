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