import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    flex-col
    p-4
    sticky
    top-0
    bg-beige
    border-b-2
    border-black
    space-y-2
`

export const Bottom = tw.div`
    flex
    items-center
    space-x-4
`

type FiltersButtonProps = {
    $show?: boolean;
}

export const FiltersButton = tw.i<FiltersButtonProps>`
    fas fa-filter
    cursor-pointer
    ${p => p.$show? `` : `invisible`}
`