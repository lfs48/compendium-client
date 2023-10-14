import tw from 'tailwind-styled-components';

type RootProps = {
    $open: boolean;
}

export const Root = tw.div<RootProps>`
    absolute
    z-40
    transition-opacity
    duration-100
    shadow-lg
    ${p => p.$open
        ?`
            opacity-100
        `
        :`
            opacity-0
            pointer-events-none
        `
    }
`