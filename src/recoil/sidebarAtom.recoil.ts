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
            },
            boons: {
                name: '',
                source_type: undefined as undefined | GameEntity,
                source_id: undefined as undefined | string
            },
            spells: {
                name: '',
                description: '',
                dndClass: undefined as undefined | string
            }
        },
        sort: {
            dndClasses: {
                field: 'name',
                dir: 1
            },
            features: {
                field: 'name',
                dir: 1
            },
            races: {
                field: 'name',
                dir: 1
            },
            feats: {
                field: 'name',
                dir: 1
            },
            boons: {
                field: 'name',
                dir: 1
            },
            spells: {
                field: 'name',
                dir: 1
            }
        }
    },
    effects: [
        ({onSet}) => {
            onSet( (newState) => console.log(newState))
        }
    ]
});