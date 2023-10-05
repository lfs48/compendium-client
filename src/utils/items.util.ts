import { ItemBulk } from '@/enums';
import { Item } from '@/types';
import { DiceRoll } from 'rpg-dice-roller';

export function valueString(item:Item) {
    const {value} = item;
    if (value.match(/\A\d+\z/)) {
        return value + 'gp';
    } else if (value.match(/^\d+d\d+($|\×\d+$)/)) {
        const rollable = value.split('×')[0];
        const roll = new DiceRoll(rollable);
        const avg = roll.averageTotal;
        return `${value} (~${avg}gp)`;
    } else {
        return value;
    }
}

export function bulkEnumToInt(bulk:ItemBulk) {
    switch(bulk) {
        default:
        case(ItemBulk.Trivial):
            return 0;
        case(ItemBulk.Slight):
            return 0.1;
        case(ItemBulk.Moderate):
            return 1;
        case(ItemBulk.Bulky):
            return 2;
        case(ItemBulk.Burdensome):
            return 4;
        case(ItemBulk.Massive):
            return 8;
    }
}

export function bulkString(item:Item) {
    const {bulk} = item;
    const bulkInt = bulkEnumToInt(bulk);
    let str = `${bulk} (`;
    switch(bulk) {
        default:
        case(ItemBulk.Trivial):
            str += `${bulkInt} slots)`;
            break;
        case(ItemBulk.Slight):
            str += `Up to 10 per slot)`;
            break;
        case(ItemBulk.Moderate):
            str += `${bulkInt} slot)`;
            break;
    }
    return str;
}