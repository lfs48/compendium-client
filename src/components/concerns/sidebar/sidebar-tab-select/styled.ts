import tw from 'tailwind-styled-components';

type RootProps = {
    $selected?: boolean;
}

export const Root = tw.div<RootProps>`
    w-12
    h-12
    rounded-tr-full
    rounded-br-full
    cursor-pointer
    bg-beige-dark
    flex
    justify-between
    items-center
    select-none
    px-2
    space-x-2
    shadow
    has-tooltip
`