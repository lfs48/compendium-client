import { Spell } from "@/types";

export function filterSpells(list:Spell[], name:string, dndClass:string='') {
    return list
    .filter( (spell:Spell) => {
        const nameMatch = spell.name.toLowerCase().startsWith( name.toLowerCase() );
        const classMatch = !dndClass || spell.dnd_class_ids.includes(dndClass);
        return nameMatch && classMatch;
    })
}