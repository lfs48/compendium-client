import tw from 'tailwind-styled-components';
import Button from '@/components/UI/atoms/button';

export const Root = tw.div`
    w-full
    h-full
`;

export const NewButton = tw(Button)`
    absolute 
    bottom-4 
    right-4
`