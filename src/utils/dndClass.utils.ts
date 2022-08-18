import { DndClass, Spellcasting } from "@/types";
import { merge } from 'lodash';

export function sortFeatures(dndClass:DndClass) {
    const sortedFeatures = merge([], dndClass.features)
    .sort( (f1, f2) => {
        const l1 = f1.level;
        const l2 = f2.level;
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
  
export function getSpellSlots(spellcasting:Spellcasting) {
  switch(spellcasting) {
    case('full'): 
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
    case('half'): 
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
    case('third'): 
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
  return !!dndClass.features.find( (feature) => feature.id === id);
}

export function hasFeatureAtLevel(dndClass:DndClass, id:string, level:number) {
  return !!dndClass.features.find( (feature) => feature.id === id && feature.level === level);
}