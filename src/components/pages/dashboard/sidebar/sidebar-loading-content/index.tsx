import SidebarLoadingCell from '../sidebar-loading-cell';
import * as S from './styled';

export default function SidebarLoadingContent() {

    const rows = [...Array(26).keys()].map( (i) => {
        return(
            <SidebarLoadingCell key={i}/>
        )
    })

    return(
        <S.Root>
            {rows}
        </S.Root>
    )
}