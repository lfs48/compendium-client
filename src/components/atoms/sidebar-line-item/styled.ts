import tw from 'tailwind-styled-components';

type RootProps = {
    $active: boolean;
}

export const Root = tw.div<RootProps>`
    py-2
    px-4
    group
    text-lg
    cursor-pointer
    transition-colors
    duration-500
    ${p => p.$active
        ?`
            bg-green-600
        `
        :`
            bg-beige-light
        `
    }
`

export const Name = tw.span`
    transition-[margin-left]
    duration-200
    group-hover:ml-2
`