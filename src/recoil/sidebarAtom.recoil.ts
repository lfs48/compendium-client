import { APIEntity, Entity, FeatureKind, ItemBulk, ItemKind, ItemRarity, SpellAspect } from "@/enums";
import { atom } from "recoil";

export const sidebarAtom = atom({
    key: 'sidebarState',
    default: {
        selectedTab: Entity.dndClasses,
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
            search: '',
            sort: {
                field: 'name',
                dir: 1
            },
            filters: {
                sourceType: undefined as undefined | APIEntity,
                source: '',
                kind: undefined as undefined | FeatureKind,
                levelDir: 0,
                level: undefined as undefined | string
            }
        },
        races: {
            search: '',
            sort: {
                field: 'name',
                dir: 1
            }
        },
        spells:  {
            search: '',
            sort: {
                field: 'name',
                dir: 1
            },
            filters: {
                rank: undefined as undefined | string,
                rankDir: 0,
                description: '',
                aspects: [] as SpellAspect[]
            }
        },
        items: {
            search: '',
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