import tw from 'tailwind-styled-components';

type RootProps = {
    $inline?: boolean;
}

export const Root = tw.div<RootProps>`
    font-bold
    cursor-pointer
    text-blue-500
    inline-block
    ${p => p.$inline 
        ? `
        ` 
        :`
            bg-gray-300
            rounded
            px-2
            py-1
        `
    }
`