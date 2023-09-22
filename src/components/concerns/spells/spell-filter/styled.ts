import tw from 'tailwind-styled-components';

export const Root = tw.div`
    space-y-2
`

export const Line = tw.div`
    flex
    space-x-2
`

export const Aspects = tw.div`
    grid
    grid-cols-2
    gap-1
`

export const Aspect = tw.div`
    bg-beige-dark
    rounded
    flex
    justify-between
    px-2
    capitalize
    col-span-1
    font-semibold
`