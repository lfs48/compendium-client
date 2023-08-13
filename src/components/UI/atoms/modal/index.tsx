import { createPortal } from 'react-dom';
import * as S from './styled';

export default function Modal({...props}) {
    return(
        createPortal(
            <S.Root {...props} />,
            document.body
        )
    )
}