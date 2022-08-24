import tw from 'tailwind-styled-components';

export const Root = tw.div`
    relative
    w-full
    flex
    items-end
`

export const List = tw.ul`
    w-full
    divide-y
    divide-y-gray
    rounded-b
`

export const Line = tw.li`
    w-full
    transition-colors
    duration-200
    bg-beige-light
    hover:bg-gray-300
    cursor-pointer
    text-left
    px-2
    py-0.5
    last:rounded-b
`