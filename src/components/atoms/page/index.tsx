import * as S from './styled';

export default function Template({
    children
}) {
    return(
        <S.Root>
            {children}
        </S.Root>
    )
}