import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-14
    h-6
    bg-white
    rounded-full
    relative
    cursor-pointer
    flex
    items-center
    select-none
`

type CircleProps = {
    $active: boolean;
}

export const Circle = tw.div<CircleProps>`
    h-4
    w-4
    rounded-full
    bg-black
    absolute
    ${p => p.$active ? 'right-[0.5rem]' : 'right-[calc(100%-1.5rem)]'}
    transition-[right]
    duration-300
`