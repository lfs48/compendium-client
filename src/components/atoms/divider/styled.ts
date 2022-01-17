import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-full
    flex
    justify-center
`

export const Left = tw.div`
    h-0.5
    bg-gradient-to-r
    from-transparent
    to-orange
    rounded-l-full
    w-1/2
`

export const Right = tw.div`
    h-0.5
    bg-gradient-to-l
    from-transparent
    to-orange
    rounded-r-full
    w-1/2
`