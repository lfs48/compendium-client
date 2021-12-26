import tw from 'tailwind-styled-components';

type RootProps = {
    $block?: boolean;
}

export const Root = tw.div<RootProps>`
    font-bold
    text-blue-500
    cursor-pointer
    ${p => p.$block 
        ? `
            w-full 
            text-center
        `
        : ''
    }
`