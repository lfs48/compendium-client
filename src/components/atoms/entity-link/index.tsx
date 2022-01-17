import * as S from './styled';
import { useDispatch } from 'react-redux';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { GameEntity } from '@/types';

interface EntityLinkProps {
    id: string;
    entityType: GameEntity;
    inline?: boolean;
    [prop: string]: any;
}

export default function EntityLink({
    id,
    entityType, 
    inline=false,
    ...props
}: EntityLinkProps) {

    const dispatch = useDispatch();
    
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const action = {
            type: openPanel.type,
            payload: {
                panelType: entityType,
                id: id
            }
        };
        dispatch(action);
    }

    return(
        <S.Root
            onClick={(e) => handleClick(e)}
            $inline={inline}
            {...props}
        />
    )

}