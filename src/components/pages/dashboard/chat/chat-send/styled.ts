import Field from '@/components/common/field';
import Input from '@/components/common/input';
import TextArea from '@/components/common/textarea';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    h-48
    w-full
    border-t-2
    border-black
    p-2
    flex
    flex-col
    space-y-2
`

export const MessageTextfield = tw(TextArea)`
    h-full
    bg-white
`

export const Bottom = tw.div`
    flex
    justify-end
`