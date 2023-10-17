import Input from '@/components/UI/input';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    justify-between
`

export const TitleInput = tw(Input)`
    text-lg 
    leading-none 
    font-semibold 
    py-0 
    bg-beige-light
`

export const Title = tw.div`
    text-lg 
    leading-none 
    font-semibold 
    py-[0.19rem]
`

export const Right = tw.div`
    flex
    space-x-4
`

export const Icon = tw.i`
    text-sm 
    flex 
    items-center 
    leading-none 
    cursor-pointer
`

export const EditIcon = tw(Icon)`
    fas fa-edit
`

export const SaveIcon = tw(Icon)`
    fas fa-check
`

export const DeleteIcon = tw(Icon)`
    fas fa-trash
`