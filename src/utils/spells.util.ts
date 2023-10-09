import { Spell } from "@/types";
import { intToOrdinal } from "./functions.utils";
import { capitalize, merge } from 'lodash';

export function filterSpells(list:Spell[], name:string, dndClass:string='') {
    return list
    .filter( (spell:Spell) => {
        const nameMatch = spell.name.toLowerCase().startsWith( name.toLowerCase() );
        const classMatch = !dndClass || spell.dnd_class_ids.includes(dndClass);
        return nameMatch && classMatch;
    })
}

export function spellRankString(spell:Spell) {
    const {rank} = spell;
    if (rank === '0') {
        return 'Cantrip';
    } else {
        return `${intToOrdinal(rank)} rank spell`;
    }
}

export function spellAspectsString(spell:Spell) {
    const aspects = merge([],(spell.aspects));
    if (aspects.length > 0) {
        return aspects.sort().map( aspect => capitalize(aspect) ).join(', ');
    } else {
        return 'No aspects';
    }
}
