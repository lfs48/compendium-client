import { Tab } from '@/types';
import * as S from './styled';

interface TabNameProps {
    tab: Tab;
    [prop: string]: any;
}

export default function TabName({
    tab,
    ...props
}: TabNameProps) {
    return(
        <S.Root 
            {...props}
        >
            {tabName(tab)}
        </S.Root>
    )
}

function tabName(tab:Tab) {
    switch(tab) {
        case('dndClasses'):
            return 'Classes';
        case('features'):
            return 'Features';
        default:
            return '';
    }
}