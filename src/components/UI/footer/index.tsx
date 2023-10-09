import * as S from './styled';
import { GITHUB_URL } from '@/utils/constants.utils';
import { openLink } from '@/utils/window.utils';

export default function Footer() {

    return(
        <S.Root>
            <S.Github
                onClick={()=>openLink(GITHUB_URL)}
            />
            <S.Version>{APP_VERSION}</S.Version>
        </S.Root>
    )
}