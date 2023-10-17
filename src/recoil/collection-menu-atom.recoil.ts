import { atom } from "recoil";

export const collectionMenuAtom = atom({
    key: 'collectionMenuState',
    default: {
        selectedCollectionID: null as null | string,
        deleting: false
    },
    effects: [
        ({onSet}) => {
            onSet( (newState) => console.log(newState))
        }
    ]
});