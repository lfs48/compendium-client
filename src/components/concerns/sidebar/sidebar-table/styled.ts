import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-full
    h-full
    relative
`;

export const HeaderContainer = tw.div`
    sticky
    top-0
    z-[1]
`

export const BodyContainer = tw.div`
    overflow-auto
    h-[calc(100vh-8.65rem)]
    scrollbar
    bg-beige-lighter
    dark:bg-gray-800
`