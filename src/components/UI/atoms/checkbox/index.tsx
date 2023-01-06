import * as S from './styled';

interface CheckboxProps {
    label?: string;
    checked: boolean;
    onChange: () => void;
    [prop: string]: any;
}

export default function Checkbox({
    label=undefined,
    checked,
    onChange,
    ...props
}: CheckboxProps) {
    return(
        <S.Root>
            <input
                type='checkbox'
                checked={checked}
                onChange={onChange}
            ></input>
            {label &&
                <label>{label}</label>
            }
        </S.Root>
    )
}