import { Entity } from '@/enums';
import { entityIcon } from '@/utils/entities.utils';
import tw from 'tailwind-styled-components';

type RootProps = {
    $tab: Entity
    $selected?: boolean;
}

export const Root = tw.i<RootProps>`
    transition-colors
    duration-200
    p-2
    bg-black
    dark:bg-gray-200
    rounded-full
    w-8
    h-8
    flex
    justify-center
    items-center
    ${p => entityIcon(p.$tab)}
    ${p => p.$selected
        ?`
            text-green-600
            dark:text-purple-light
        `
        :`
            text-white
            dark:text-black
        `
    }
`