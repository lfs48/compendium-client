import { GameEntity } from '@/types';
import { entityName } from '@/utils/entities.utils';
import * as S from './styled';

interface TabTooltipProps {
    tab: GameEntity;
    [prop: string]: any;
}

export default function TabTooltip({
    tab,
    ...props
}: TabTooltipProps) {
    return(
        <S.Root 
            {...props}
        >
            <S.Content>
                <S.Arrow />
                <div className=''>
                    {entityName(tab)}
                </div>
            </S.Content>
        </S.Root>
    )
}