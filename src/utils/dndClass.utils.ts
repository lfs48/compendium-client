import { DndClass } from "@/types";
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