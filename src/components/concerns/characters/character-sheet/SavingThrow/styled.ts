import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    items-center
`

export const ScoreBox = tw.label`
    flex 
    justify-center 
    items-center 
    h-12 
    w-16 
    border-2 
    border-black 
    rounded
    bg-beige-lightest
`

export const LabelBox = tw.span`
    border-r-2 
    border-y-2 
    border-black 
    rounded-tr 
    rounded-br 
    w-full 
    pl-4 
    flex 
    items-center 
    space-x-2
    bg-beige-lightest
`

export const Value = tw.span`
    font-bold
    absolute
    -bottom-2
    bg-white
    border
    border-black
    rounded-full
    w-8
    h-6
    flex
    justify-center
    items-center
`