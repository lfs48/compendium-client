import Label from '../label';
import * as S from './styled';

interface CheckboxProps {
    label?: string;
    checked: boolean;
    onChange?: () => void;
    [prop: string]: any;
}

export default function Checkbox({
    label=undefined,
    checked,
    onChange=undefined,
    ...props
}: CheckboxProps) {
    return(
        <S.Root {...props}>
            <input
                type='checkbox'
                checked={checked}
                onChange={onChange}
                readOnly={onChange === undefined}
            ></input>
            {label &&
                <Label>{label}</Label>
            }
        </S.Root>
    )
}