import * as S from './styled';

interface ToggleProps {
    active: boolean;
    handleToggle: () => void;
    circleClass?: string;
    [prop: string]: any;
}

export default function Toggle({
    active,
    handleToggle,
    circleClass='',
    ...props
}: ToggleProps) {

    return(
        <S.Root onClick={handleToggle}>
            <S.Circle $active={active}/>
        </S.Root>
    )
}