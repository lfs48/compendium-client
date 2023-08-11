import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    items-center
    relative
`

export const ScoreBox = tw.label`
    flex 
    justify-center 
    items-center 
    h-12 
    w-16
    rounded
    z-30
`

export const Shield = tw.i`
    fas fa-shield
    absolute
    text-5xl
    text-gray-300
    z-20
`

export const BorderExtend = tw.div`
    absolute
    border-y-2
    border-black
    h-8
    top-2
    left-8
    w-8
    h-8
    z-10
    bg-beige-lightest
`

export const LabelBox = tw.span`
    border-r-2 
    border-y-2 
    border-black 
    rounded-tr 
    rounded-br 
    w-full 
    pl-[2.45rem] 
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