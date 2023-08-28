import { ItemBulk, ItemKind, ItemRarity } from "@/enums";
import { GameEntity } from "@/types";
import { atom } from "recoil";

export const sidebarAtom = atom({
    key: 'sidebarState',
    default: {
        selectedTab: 'dndClasses' as GameEntity,
        UI: {
            filterOpen: false
        },
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
            },
            items: {
                magic: undefined as undefined | string,
                rarity: undefined as undefined | ItemRarity,
                kind: undefined as undefined | ItemKind,
                bulkDir: '>',
                bulk: undefined as undefined | ItemBulk
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