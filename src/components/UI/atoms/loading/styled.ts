import tw from 'tailwind-styled-components';
import { Oval } from 'svg-loaders-react';

export const Root = tw.div`
    h-full
    w-full
    flex
    justify-center
    items-center
`

export const Spinner = tw(Oval)`
    text-blue-500 
    stroke-current
`