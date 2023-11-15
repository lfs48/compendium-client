import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

export const Root = tw.div`
    flex
    space-x-4
`

export const AuthLink = tw(Link)`
    text-sm
    font-semibold
    text-blue-500
`