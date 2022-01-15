import { Tab } from '@/types';
import tw from 'tailwind-styled-components';

type RootProps = {
    $tab: Tab;
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

function tabIcon(tab:Tab) {
    switch(tab) {
        case('dndclasses'):
            return 'fas fa-sword';
        default:
            return '';
    }
}