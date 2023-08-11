import { Character } from "@/types";

export function scoreAbrevToFull(score:string) {
    switch(score) {
        case('str'):
            return 'Strength';
            case('dex'):
        return 'Dexterity';
            case('con'):
        return 'Constitution';
            case('int'):
        return 'Intelligence';
            case('awa'):
        return 'Awareness';
            case('cha'):
        return 'Charisma';
            default:
                return '';
    }
}

export function scoreToModifier(score:number) {
    return Math.floor( (score - 10) / 2);
}

export function scoreToModifierString(score:number) {
    const mod = scoreToModifier(score);
    return modifierToString(mod);
}

export function modifierToString(mod:number) {
    if (mod >= 0) {
        return `+${mod}`
    } else {
        return `${mod}`
    }
}

export function calcSavingThrow(character:Character, save:string) {
    const {scores, saves, prof} = character;
    let mod = 0;
    switch(save) {
        case('fortitude'):
            mod = Math.max(scores.str, scores.con);
        case('reflex'):
            mod = Math.max(scores.dex, scores.awa);
        case('willpower'):
            mod = Math.max(scores.int, scores.cha);
    }
    mod = scoreToModifier(mod);
    if (saves[save]) {
        mod += prof;
    }
    return modifierToString(mod);
}

export const skillProperties = {
    arcana: {
        score: 'int'
    },
    acrobatics: {
        score: 'dex'
    },
    animal_handling: {
        score: 'awa'
    },
    athletics: {
        score: 'str'
    },
    endearment: {
        score: 'cha'
    },
    inspection: {
        score: 'awa'
    },
    intimidation: {
        score: 'cha'
    },
    lookout: {
        score: 'awa'
    },
    medicine: {
        score: 'awa'
    },
    navigation: {
        score: 'awa'
    },
    nature: {
        score: 'int'
    },
    persuasion: {
        score: 'cha'
    },
    society: {
        score: 'int'
    },
    subtelty: {
        score: 'dex'
    },
    weightwork: {
        score: 'str'
    }
}

export function calcSkillModifier(character:Character, skill:string, score:string|undefined=undefined) {
    let mod = 0;
    const scoreMod = scoreToModifier(character.scores[score || skillProperties[skill].score])
    mod += scoreMod;
    if (character.skills[skill]) {
        mod += character.prof;
    }
    return mod;
}

export function calcCarryingCapacity(character:Character) {
    let cap = 5;
    cap += Math.max(0, scoreToModifier(character.scores.str) );
    if (character.skills['weightwork']) {
        cap += character.prof;
    }
    return cap;
}