import Button from '@/components/atoms/button';
import ModalBg from '@/components/atoms/modal-bg';
import * as S from './styled';

interface DialogProps {
    title: string;
    body: string;
    handleConfirm: () => void;
    handleCancel: () => void;
    loading: boolean;
}

export default function Dialog({
    title,
    body,
    handleConfirm,
    handleCancel,
    loading
}: DialogProps) {
    return(
        <>
        <S.Root>
            <h1>{title}</h1>
            <p>{body}</p>
            <S.Buttons>
                <Button
                    color='red'
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    loading={loading}
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </S.Buttons>
        </S.Root>
        <ModalBg />
        </>
    )
}