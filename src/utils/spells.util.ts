import { Spell } from "@/types";
import { intToOrdinal } from "./functions.utils";
import { capitalize, merge } from 'lodash';
import { SpellAspect } from "@/enums";

interface filterSpellsOptions {
    name?: string;
    description?: string;
    rank?: string;
    rankDir?: number;
    aspects?: SpellAspect[];
}

export function filterSpells(list:Spell[], options:filterSpellsOptions) {
    const {name, description, rank, rankDir, aspects} = options;
    const filtered = list.filter( (spell:Spell) => {
        const nameMatch = name ? spell.name.toLowerCase().startsWith( name.toLowerCase() ) : true;
        const descMatch = description ? spell.description.toLowerCase().includes( description.toLowerCase() ) : true;
        const aspectMatch = aspects && aspects.length > 0 ? aspects.some( aspect => spell.aspects.includes(aspect) ) : true;

        let rankMatch = true;
        if ( rank && rankDir) {
            rankMatch = parseInt(spell.rank) * rankDir > parseInt(rank) * rankDir;
        } else if (rank) {
            rankMatch = parseInt(spell.rank) === parseInt(rank);
        }

        return nameMatch && descMatch && rankMatch && aspectMatch;
    });
    return filtered;
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
