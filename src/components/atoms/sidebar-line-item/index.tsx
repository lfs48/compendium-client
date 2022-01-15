import * as S from './styled';

export default function SidebarLineItem({
    content
}) {
    return(
        <S.Root>
            <S.Name>{content.name}</S.Name>
        </S.Root>
    )
}