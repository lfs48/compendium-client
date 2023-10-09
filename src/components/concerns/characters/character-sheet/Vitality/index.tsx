import Checkbox from '@/components/UI/checkbox';
import { BubbleLabel } from '../BubbleLabel';
import * as S from './styled';

interface VitalityProps {
    failed: number;
    [prop: string]: any;
}

export default function Vitality({
    failed,
    ...props
}: VitalityProps) {

    const points = [1,2,3].map( (i) =>
        <S.Point 
            key={i}
            $failed={failed >= i}
        >
            {failed >= i &&
                <S.Skull />
            }
        </S.Point>
    )
    return(
        <S.Root {...props}>
            <BubbleLabel>VITALITY</BubbleLabel>
            <S.Points>
                {points}
            </S.Points>
        </S.Root>
    )
}