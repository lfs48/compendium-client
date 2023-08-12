import tw from 'tailwind-styled-components';

export const Root = tw.div`
    text-sm
    font-bold
    h-10
    bg-gray-300
    tooltip
    left-14
    rounded-sm
    px-2
`

export const Content = tw.div`
    relative 
    h-full 
    flex 
    items-center
`

export const Arrow = tw.div`
    w-0
    h-0
    border-y-8
    border-r-8
    border-l-8
    border-r-gray-300
    border-y-transparent
    border-l-transparent
    absolute
    -left-6
`