import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-full
    h-full
    bg-beige-lighter
    flex
    flex-col
`

export const Header = tw.div`
    w-full
    bg-black
    text-white
    flex
    justify-between
    items-center
    px-4
    py-2
`

export const Title = tw.div`
    flex
    flex-col
`

export const Tabs = tw.div`
    flex
    space-x-4
`

export const Tab = tw.div`
    border-white
    bg-gray-200
    text-black
    rounded
    w-16
    h-8
    px-2
    flex
    justify-center
    items-center
    cursor-pointer
    font-bold
`

export const Body = tw.div`
    flex
    p-4
    space-x-4
`

export const Col = tw.div`
    flex
    flex-col
    space-y-4
`

export const ScoresCol = tw(Col)`
    items-center
`

export const HPCol = tw(Col)`
    w-80 
    pt-2
`

export const Saves = tw.div`
    flex 
    flex-col 
    space-y-2
`

export const Bubble = tw.div`
    border-2
    border-black
    rounded
    flex
    flex-col
    items-center
    bg-beige-lightest
`

export const Defenses = tw(Col)`
    space-y-4
    w-80
`

export const MultiBubleRow = tw.div`
    flex 
    space-x-2
`

export const Skills = tw.div`
    flex 
    flex-col 
    px-4
    py-1
    divide-y
    divide-gray-300
    bg-beige-lightest
`
export const TabsCol = tw(Col)`
    pt-2
`
