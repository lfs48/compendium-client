import { SyntheticEvent } from "react";
import * as S from "./styled";

interface InputProps {
    value: string | number;
    onChange: (event:SyntheticEvent) => void;
    maxLength: number;
    [prop:string]: any;
}

export default function Input({
    onChange, 
    value, 
    type='text',
    maxLength=50,
    ...props
}:InputProps) {
    return(
        <S.Input
            type={type}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            {...props}
        />
    )
}