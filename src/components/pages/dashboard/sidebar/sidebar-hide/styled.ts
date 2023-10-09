import tw from 'tailwind-styled-components';

type RootProps = {
    $open: boolean;
}

export const Root = tw.i<RootProps>`
    fas
    fa-chevron-double-left
    absolute
    bottom-6
    transform
    ${p => p.$open ? 'rotate-0 -right-8' : 'rotate-180 -right-20' }
    transition-all
    duration-700
    cursor-pointer
`