import Field from '@/components/UI/field';
import Input from '@/components/UI/input';
import ButtonComponent from '@/components/UI/button';
import tw from 'tailwind-styled-components';
import Form from '@/components/UI/form';

export const Root = tw(Form)`
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
    first:h-52
    h-32
`