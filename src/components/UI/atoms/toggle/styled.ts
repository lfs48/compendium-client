import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-14
    h-6
    bg-white
    dark:bg-blue-500
    rounded-full
    relative
    cursor-pointer
    flex
    items-center
    select-none
    border-2
    border-black
    dark:border-white
`

type CircleProps = {
    $active: boolean;
}

export const Circle = tw.div<CircleProps>`
    h-4
    w-4
    rounded-full
    bg-black
    dark:bg-white
    absolute
    ${p => p.$active ? 'right-[0.25rem]' : 'right-[calc(100%-1.25rem)]'}
    transition-[right]
    duration-300
`