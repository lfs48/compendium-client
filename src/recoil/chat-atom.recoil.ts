import { atom } from "recoil";

export const chatAtom = atom({
    key: 'chatState',
    default: {
        chatOpen: true
    },
    effects: [
        ({onSet}) => {
            onSet( (newState) => console.log(newState))
        }
    ]
});