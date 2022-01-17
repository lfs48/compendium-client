import * as S from './styled';

interface EquipmentProps {
    equipmentList: string[];
    [prop: string]: any;
}

export default function StartingEquipment({
    equipmentList,
    ...props
}: EquipmentProps) {
    return(
        <S.Root {...props}>
            <h2>Equipment</h2>
            <p>
                You start with the following equipment, in addition to the equipment granted by your background.
            </p>
            <S.List>
                {equipmentList.map( (line, i) => {
                    return <li key={i}>{line}</li>
                })}
            </S.List>
        </S.Root>
    )
}