import { GameEntity } from '@/types';
import { entityIcon } from '@/utils/entities.utils';
import tw from 'tailwind-styled-components';

type RootProps = {
    $tab: GameEntity;
    $selected?: boolean;
}

export const Root = tw.i<RootProps>`
    transition-colors
    duration-200
    text-white
    p-2
    bg-black
    rounded-full
    w-8
    h-8
    flex
    justify-center
    items-center
    ${p => entityIcon(p.$tab)}
    ${p => p.$selected
        ?`
            text-green-400
        `
        :`
            text-white
        `
    }
`