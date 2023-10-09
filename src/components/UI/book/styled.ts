import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-100
    h-full
    sm:h-140
    pl-8
    rounded
    shadow-xl
    relative
    filled-padding
    from-beige-darkest
    to-beige-darkest
    dark:from-blue-darker
    dark:to-blue-darker
`

export const Spine = tw.div`
    absolute 
    left-0 
    h-full 
    w-8 
    shadow-right-sm
    dark:border-y
    dark:border-l
    dark:rounded-tl
    dark:rounded-bl
    dark:border-y-gray-700
    dark:border-l-gray-700
    dark:border-r
    dark:border-r-gray-800
`

export const Bookmark = tw.i`
    fas
    fa-bookmark
    absolute 
    top-[-0.25rem] 
    left-2 
    text-2xl 
    text-orange
`

export const Cover = tw.div`
    h-full
    rounded-tr
    rounded-br
    bg-beige
    dark:bg-blue-dark
    dark:border-y
    dark:border-r
    dark:border-gray-700
`