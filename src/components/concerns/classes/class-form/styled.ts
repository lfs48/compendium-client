import Field from '@/components/UI/molecules/field';
import ButtonComponent from '@atoms/button';
import Input from '@atoms/input';
import tw from 'tailwind-styled-components';
import EntityAutocomplete from '../../entities/entity-autocomplete';

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
`

export const Between = tw.div`
    flex 
    justify-between 
    space-x-12
`

export const Selects = tw.div`
    flex 
    space-x-8 
    justify-end
`

export const Grid = tw.div`
    grid 
    grid-cols-2
    gap-x-12 
    gap-y-2
`

export const Buttons = tw.div`
    flex
    self-end
    space-x-8
`

export const Button = tw(ButtonComponent) `
    w-24
`

export const Name = tw(Input)`
    font-fancy
    text-[1.75rem] 
    font-bold leading-[2rem]
`

export const Description = tw(Field)`
    col-span-2 
    row-[span_30_/_span_30]
`

export const Right = tw.div`
    w-1/2 
    space-y-4
`

export const TableInputs = tw.div`
    flex 
    justify-between 
    space-x-4
`