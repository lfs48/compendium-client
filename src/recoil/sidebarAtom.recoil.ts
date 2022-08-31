import { GameEntity } from "@/types";
import { atom } from "recoil";

export const sidebarAtom = atom({
    key: 'sidebarState',
    default: {
        selectedTab: 'dndClasses' as GameEntity,
        searchInputs: {
            dndClasses: {
                name: ''
            },
            features: {
                name: ''
            },
            races: {
                name: ''
            },
            feats: {
                name: '',
                dndClass: undefined as undefined | string
            }
        }
    }
});