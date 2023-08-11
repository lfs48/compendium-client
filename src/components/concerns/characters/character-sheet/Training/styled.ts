import tw from 'tailwind-styled-components';

export const Root = tw.div`
    border-2
    border-black
    rounded
    flex
    flex-col
    items-center
    bg-beige-lightest
    p-2
`

export const Body = tw.div`
    flex 
    flex-col 
    w-full 
    space-y-0.5
`

export const Label = tw.span`
    font-semibold
`