import { Feat } from "@/types";

export function filterFeats(list:Feat[], name:string, dndClass:string='') {
    return list
    .filter( (feat:Feat) => {
        const nameMatch = feat.name.toLowerCase().startsWith( name.toLowerCase() );
        const classMatch = !dndClass || feat.dnd_class_id == dndClass;
        return nameMatch && classMatch;
    })
}