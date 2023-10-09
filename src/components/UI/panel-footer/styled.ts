import tw from 'tailwind-styled-components';
import ButtonComponent from '@/components/UI/button';

export const Root = tw.footer`
    flex
    justify-between
    absolute
    -mx-6
    bottom-0
    px-6
    py-2
    shadow-inner
    border-t-2
    border-black
    w-full
    h-12
    bg-beige-dark
    dark:bg-gray-600
`

export const Button = tw(ButtonComponent)`
    w-20
`