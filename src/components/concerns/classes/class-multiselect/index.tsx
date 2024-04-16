import { RootState } from '@/types';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { isSpellcaster } from '@/utils/dndClass.utils';

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

    const dndclasses = useAppSelector( (state) => state.entities.dndClasses);

    const bubbles = Object.values(dndclasses).map( (dndclass) => {
        if ( isSpellcaster(dndclass) ) {
            return(
                <S.Option
                    key={dndclass.id}
                    $selected={value.includes(dndclass.id)}
                    onClick={() => handleSelect(dndclass.id)}
                    {...props}
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