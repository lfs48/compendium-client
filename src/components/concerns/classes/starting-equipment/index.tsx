import Markdown from '@/components/UI/markdown';
import * as S from './styled';

interface EquipmentProps {
    equipment: string;
    [prop: string]: any;
}

export default function StartingEquipment({
    equipment,
    ...props
}: EquipmentProps) {
    return(
        <S.Root {...props}>
            <h2>Equipment</h2>
            <p>
                You start with the following equipment, in addition to the equipment purchased with your starting gold.
            </p>
            <Markdown>
                {equipment}
            </Markdown>
        </S.Root>
    )
}