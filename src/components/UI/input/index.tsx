import { SyntheticEvent } from "react";
import * as S from "./styled";

interface InputProps {
    value: string | number;
    onChange: (event:SyntheticEvent) => void;
    type?: string;
    [prop: string]: any;
}

export default function Input({
    onChange, 
    value, 
    type='text',
    ...props
}: InputProps) {
    return(
        <S.Input
            type={type}
            value={value}
            onChange={onChange}
            {...props}
        />
    )
}