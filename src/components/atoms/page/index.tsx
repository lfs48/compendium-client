import * as S from './styled';

export default function Page({
    children
}) {
    return(
        <S.Root>
            {children}
        </S.Root>
    )
}