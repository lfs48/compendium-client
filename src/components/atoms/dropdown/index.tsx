import * as S from './styled';

interface DropdownProps {
    open: boolean;
    [prop: string]: any;
}

export default function Dropdown({
    open,
    ...props
}: DropdownProps) {
    return(
        <S.Root
            $open={open}
            {...props}
        />
    )
}