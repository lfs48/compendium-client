import * as S from './styled';

interface LabelProps {
    [prop: string]: any;
}

export default function Label({
    ...props
}: LabelProps) {
    return(
        <S.Root {...props} />
    )
}