import { ItemBulk, ItemKind, ItemRarity } from "@/enums";
import { GameEntity } from "@/types";
import { atom } from "recoil";

export const sidebarAtom = atom({
    key: 'sidebarState',
    default: {
        selectedTab: 'dndClasses' as GameEntity,
        UI: {
            sidebarOpen: true,
            filterOpen: false
        },
        dndClasses: {
            search: '',
            sort: {
                field: 'name',
                dir: 1
            }
        },
        features: {
            search: 'name',
            sort: {
                field: 'name',
                dir: 1
            },
            filters: {
                sourceType: '',
                source: '',
                kind: '',
                levelDir: '>',
                level: undefined as undefined | number
            }
        },
        races: {
            search: 'name',
            sort: {
                field: 'name',
                dir: 1
            }
        },
        spells:  {
            search: 'name',
            sort: {
                field: 'name',
                dir: 1
            },
            filters: {
                rank: undefined as undefined | number,
                dndClass: undefined as undefined | string,
                description: ''
            }
        },
        items: {
            search: 'name',
            sort: {
                field: 'name',
                dir: 1
            },
            filters: {
                magic: undefined as undefined | string,
                rarity: undefined as undefined | ItemRarity,
                kind: undefined as undefined | ItemKind,
                bulkDir: '>',
                bulk: undefined as undefined | ItemBulk
            }
        }
    },
    effects: [
        ({onSet}) => {
            onSet( (newState) => console.log(newState))
        }
    ]
});