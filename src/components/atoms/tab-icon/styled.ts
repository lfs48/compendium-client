import { GameEntity } from '@/types';
import tw from 'tailwind-styled-components';

type RootProps = {
    $tab: GameEntity;
    $selected?: boolean;
}

export const Root = tw.i<RootProps>`
    transition-colors
    duration-500
    text-white
    p-2
    bg-black
    rounded-full
    w-8
    h-8
    flex
    justify-center
    items-center
    ${p => tabIcon(p.$tab)}
    ${p => p.$selected
        ?`
            text-green-500
        `
        :`
            text-white
        `
    }
`

function tabIcon(tab:GameEntity) {
    switch(tab) {
        case('dndClasses'):
            return 'fas fa-sword';
        case('features'):
            return 'fas fa-award';
        default:
            return '';
    }
}