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
`

export const Spine = tw.div`
    absolute 
    left-0 
    h-full 
    w-8 
    shadow-right
`

export const Bookmark = tw.i`
    fad 
    fa-bookmark 
    absolute 
    top-[-0.25rem] 
    left-2 
    text-2xl 
    text-orange
`

export const Cover = tw.div`
    bg-beige-light
    h-full
    rounded-tr
    rounded-br
`