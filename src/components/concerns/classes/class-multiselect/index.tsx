import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';

interface ClassMultiselectProps {
    value: string[];
    handleSelect: (id:string) => void;
    [prop: string]: any;
}

export default function ClassMultiselect({
    value,
    handleSelect,
    ...props
}: ClassMultiselectProps) {

    const dndclasses = useSelector( (state:RootState) => state.entities.dndClasses);

    const bubbles = Object.values(dndclasses).map( (dndclass) => {
        if (dndclass.spellcasting !== 'none') {
            return(
                <S.Option
                    key={dndclass.id}
                    $selected={value.includes(dndclass.id)}
                    onClick={() => handleSelect(dndclass.id)}
                >
                    {dndclass.name}
                </S.Option>
            )
        }
    })

    return(
        <S.Root>
            {bubbles}
        </S.Root>
    )
}