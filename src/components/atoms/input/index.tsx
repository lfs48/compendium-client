import { SyntheticEvent } from "react";
import * as S from "./styled";

interface InputProps {
    value: string | number;
    onChange: (event:SyntheticEvent) => void;
    maxLength: number;
    placeholder?: string;
    type?: string;
    [prop: string]: any;
}

export default function Input({
    onChange, 
    value, 
    type='text',
    placeholder,
    maxLength=50,
    ...props
}: InputProps) {
    return(
        <S.Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            {...props}
        />
    )
}