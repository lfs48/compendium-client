import tw from 'tailwind-styled-components';

export const Root = tw.div`
    border-2
    border-black
    rounded
    flex
    flex-col
    items-center
    bg-beige-lightest
    w-100
    h-full
`
export const Tabs = tw.div`
    w-full
    flex 
    space-x-4
    p-2
`

type TabProps = {
    $selected: boolean;
}

export const Tab = tw.div<TabProps>`
    text-sm
    border-b-2
    cursor-pointer
    font-semibold
    pb-0.5
    select-none
    transition-colors
    ${p => p.$selected
        ?`
            border-red-700
        `:`
            border-transparent
            text-gray-400
            hover:text-black
        `
    }
`

export const Body = tw.div`
    w-full 
    h-full 
    p-2 flex 
    flex-col 
    justify-between
    h-[40rem]
    overflow-y-auto
`