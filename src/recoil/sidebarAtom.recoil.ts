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
            spells: {
                name: '',
                description: '',
                dndClass: undefined as undefined | string
            },
            items: {
                name: ''
            }
        },
        filters: {
            features: {
                sourceType: '',
                source: '',
                kind: '',
                levelDir: '>',
                level: undefined as undefined | number
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
            spells: {
                field: 'name',
                dir: 1
            },
            items: {
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