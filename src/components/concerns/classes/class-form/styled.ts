import Field from '@/components/UI/field';
import ButtonComponent from '@/components/UI/button';
import Input from '@/components/UI/input';
import tw from 'tailwind-styled-components';
import EntityAutocomplete from '../../entities/entity-autocomplete';
import Form from '@/components/UI/form';

export const Root = tw(Form)`
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

export const BigField = tw(Field)`
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