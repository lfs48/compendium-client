import Field from '@molecules/field';
import Input from '@atoms/input';
import ButtonComponent from '@atoms/button';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    w-full
    h-full
    bg-beige-lighter
    border-2
    border-black
    px-6
    py-4
    rounded
    flex
    flex-col
    justify-between
    space-y-4
`

export const Body = tw.div`
    flex 
    flex-col 
    h-full
`

export const Top = tw.div`
    inline-flex
`

export const LeftRight = tw.div`
    flex
    w-full
    h-full
    space-x-8
`

export const Left = tw.div`
    w-1/2
`

export const Right = tw.div`
    w-1/2
`

export const Selects = tw.div`
    flex 
    space-x-8 
    justify-end
`

export const Buttons = tw.div`
    flex
    self-end
    space-x-8
`

export const Button = tw(ButtonComponent)`
    w-24
`

export const Name = tw(Input)`
    font-fancy
    text-[1.75rem] 
    font-bold leading-[2rem]
`

export const Description = tw(Field)`
    h-full
`