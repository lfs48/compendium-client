import tw from 'tailwind-styled-components';

export const Root = tw.div`
    border-2
    border-black
    rounded
    flex
    flex-col
    items-center
    w-16
    h-16
    relative
    bg-beige-lightest
`

export const Score = tw.div`
    font-semibold
    absolute
    -bottom-2
    border-2
    border-black
    rounded-full
    w-8
    h-6
    flex
    justify-center
    items-center
    bg-beige-lightest
`