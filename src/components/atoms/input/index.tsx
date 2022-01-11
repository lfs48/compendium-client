import { SyntheticEvent } from "react";
import * as S from "./styled";

interface InputProps {
    value: string | number;
    onChange: (event:SyntheticEvent) => void;
    maxLength: number;
    hasErrors?: boolean;
    [prop:string]: any;
}

export default function Input({
    onChange, 
    value, 
    type='text',
    maxLength=50,
    hasErrors=false,
    ...props
}:InputProps) {
    return(
        <S.Input
            type={type}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            $hasErrors={hasErrors}
            {...props}
        />
    )
}