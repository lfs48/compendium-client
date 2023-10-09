import tw from 'tailwind-styled-components';
import Markdown from '@/components/UI/markdown';

export const Root = tw.div`
    space-y-4
`

export const Description = tw(Markdown)`
    italic
    mb-6
`

export const Block = tw.div`
    ml-4
    mb-2
`