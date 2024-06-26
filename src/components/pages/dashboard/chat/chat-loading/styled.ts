import tw from "tailwind-styled-components";

export const Root = tw.div`
    h-[calc(100%-12rem)]
    flex
    flex-col
    w-full
    p-2
    overflow-y-scroll
    space-y-4
`

export const Line = tw.div`
    flex
    flex-wrap
    group
    gap-y-1
    gap-x-2
`

export const Rect = tw.div`
    h-5
    rounded-md
    bg-gray-400
    animate-pulse
`