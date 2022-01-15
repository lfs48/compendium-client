import tw from 'tailwind-styled-components';

export const Root = tw.div`
    py-2
    px-4
    bg-beige-light
    group
    text-lg
    cursor-pointer
`

export const Name = tw.span`
    transition-[margin-left]
    duration-200
    group-hover:ml-2
`