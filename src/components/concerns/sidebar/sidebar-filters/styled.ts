import tw from 'tailwind-styled-components';

type RootProps = {
    $open: boolean;
}

export const Root = tw.div<RootProps>`
    absolute
    -right-40
    top-14
    bg-beige-light
    border
    border-black
    rounded-sm
    w-80
    p-4
    z-40
    shadow-lg
    transition-all
    duration-500
    ${p => p.$open ? `visible opacity-100 top-14` : `invisible opacity-0 top-8`}
`

export const Header = tw.div`
    font-semibold
    text-2xl
    w-full
    flex
    justify-between
`