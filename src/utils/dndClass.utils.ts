import { Spellcasting } from "@/enums";
import { DndClass, Feature } from "@/types";
import { merge } from 'lodash';

export function sortFeatures(dndClass:DndClass) {
    const sortedFeatures = merge([], dndClass.features)
    .sort( (f1:Feature, f2:Feature) => {
        const l1 = f1.level || 0;
        const l2 = f2.level || 0;
        if (l1 > l2) {
            return 1
        } else if (l2 > l1) {
            return -1;
        } else {
            return 0;
        }
    })
    return sortedFeatures;
}

export const getLevelProficiency = (level:number) => {
  return Math.ceil(level / 3) + 1;
}

export const getLevelHP = (baseHP:number, level:number) => {
  const multiplier = Math.ceil( (level) / 3);
  const classHP = (baseHP * multiplier) + level + '';
  const conHP = `${multiplier > 1 ? `${multiplier}×` : ''}CON`;
  return `${classHP} + ${conHP}`
}
  
export function getSpellSlots(spellcasting:Spellcasting) {
  switch(spellcasting) {
    case(Spellcasting.Full): 
      return [
        [4, 0, 0, 0],
        [5, 0, 0, 0],
        [6, 0, 0, 0],
        [6, 3, 0, 0],
        [6, 4, 0, 0],
        [6, 5, 0, 0],
        [6, 5, 2, 0],
        [6, 5, 3, 0],
        [6, 5, 4, 0],
        [6, 5, 4, 1],
        [6, 5, 4, 2],
        [6, 5, 4, 3]
      ];
    case(Spellcasting.Half): 
      return [
        [4, 0, 0, 0],
        [4, 0, 0, 0],
        [4, 0, 0, 0],
        [4, 2, 0, 0],
        [4, 2, 0, 0],
        [4, 2, 0, 0],
        [4, 3, 0, 0],
        [4, 3, 0, 0],
        [4, 3, 0, 0],
        [4, 3, 2, 0],
        [4, 3, 2, 0],
        [4, 3, 2, 0],
      ];
    case(Spellcasting.Third): 
        return [
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [3, 0, 0, 0],
          [3, 0, 0, 0],
          [3, 0, 0, 0],
          [3, 1, 0, 0],
          [3, 1, 0, 0],
          [3, 1, 0, 0],
          [3, 2, 0, 0],
          [3, 2, 0, 0],
          [3, 2, 0, 0],
        ];
    default:
      return [];
  }
}

export function hasFeature(dndClass:DndClass, id:string) {
  return !!dndClass.features.includes(id);
}

export function isSpellcaster(dndClass:DndClass) {
  return dndClass.spellcasting !== Spellcasting.None;
}