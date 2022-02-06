import { SyntheticEvent } from "react";
import * as S from "./styled";

interface TextAreaProps {
    value: string | number;
    onChange: (event:SyntheticEvent) => void;
    [prop: string]: any;
}

export default function TextArea({
    onChange, 
    value, 
    ...props
}: TextAreaProps) {
    return(
        <S.Root
            value={value}
            onChange={onChange}
            {...props}
        />
    )
}