import tw from 'tailwind-styled-components';

export const Root = tw.div`
    space-y-2
`

export const Line = tw.div`
    -mx-4
    px-4
    py-0.5
    cursor-pointer
    font-semibold
    odd:bg-white
    even:bg-black
    odd:bg-opacity-0
    even:bg-opacity-10
    odd:hover:bg-opacity-30
    even:hover:bg-opacity-20
    transition-[background]
`