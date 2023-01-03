import { Boon } from "@/types";

export function filterBoons(list:Boon[], name:string, source:string|undefined) {
    return list
    .filter( (boon:Boon) => {
        const nameMatch = boon.name.toLowerCase().startsWith( name.toLowerCase() );
        let sourceMatch = true;
        if (source !== undefined) {
            if (source == '') {
                sourceMatch = !!boon.source_id;
            } else {
                sourceMatch = boon.source_id == source;
            }
        }
        return nameMatch && sourceMatch;
    })
}

export function sourceTypeToName(sourceType:string='') {
    switch(sourceType) {
        case('DndClass'):
            return 'Class';
        case('Race'):
            return 'Race';
        default:
            return '—'
    }
}