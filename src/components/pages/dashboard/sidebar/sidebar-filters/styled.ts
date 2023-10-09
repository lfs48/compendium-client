import tw from 'tailwind-styled-components';

type RootProps = {
    $open: boolean;
}

export const Root = tw.div<RootProps>`
    absolute
    top-2
    bg-beige-light
    dark:bg-gray-darker
    rounded
    w-80
    p-4
    z-40
    shadow-lg
    transition-all
    duration-500
    dark:border
    dark:border-gray-dark
    ${p => p.$open ? `visible opacity-100 -right-100` : `invisible opacity-0 -right-80`}
`

export const Header = tw.div`
    font-semibold
    text-2xl
    w-full
    flex
    justify-between
`