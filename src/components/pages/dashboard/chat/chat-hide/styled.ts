import tw from 'tailwind-styled-components';

type RootProps = {
    $open: boolean;
}

export const Root = tw.i<RootProps>`
    fas
    fa-chevron-double-right
    absolute
    bottom-6
    transform
    ${p => p.$open ? 'rotate-0 -left-8' : 'rotate-180 -left-8' }
    transition-all
    duration-700
    cursor-pointer
    dark:text-white
`