import tw from 'tailwind-styled-components';

type RootProps = {
    $active: boolean;
    $animating: boolean;
}

export const Root = tw.div<RootProps>`
    py-2
    px-4
    group
    text-lg
    cursor-pointer
    transition-colors
    duration-200
    ${p => p.$active
        ?`
            bg-green-600
        `
        :`
            bg-beige-light
        `
    }
`

type NameProps = {
    $animating: boolean;
}

export const Name = tw.div<NameProps>`
    transition-[margin-left]
    duration-200
    group-hover:ml-2
    ${p => p.$animating
        ?`
            animate-wiggle
        `
        :`
        `
    }
`