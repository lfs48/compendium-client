import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { HexColorPicker } from 'react-colorful';
import { useRef, useState } from 'react';
import Button from '@/components/common/button';
import { usePatchUserMutation } from '@/api/users.api';
import toast from 'react-hot-toast';
import { ERROR_MESSAGE } from '@/utils/constants.utils';
import useClickOutside from '@/hooks/useClickOutside.hook';

export default function UserColor() {

    const id = useAppSelector( (state) => state.session.id)
    const user = useAppSelector( (state) => state.entities.users[id])

    const {color} = user;

    const [menuOpen, setMenuOpen] = useState(false);
    const [menuColor, setMenuColor] = useState(color);

    const [trigger, query] = usePatchUserMutation()

    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
        setMenuOpen(false);
    });

    const handleSave = () => {
        trigger({
            user: {
                ...user,
                color: menuColor
            }
        })
        .unwrap()
        .then( (_) =>
            setMenuOpen(false)
        )
        .catch( (_) =>
            toast.error(ERROR_MESSAGE)
        )
    }

    return(
        <S.Root>
            <S.Icon 
                style={{'backgroundColor': color}}
                onClick={()=>setMenuOpen(!menuOpen)}
            />
            <S.Menu 
                open={menuOpen}
                ref={menuRef}
            >
                <HexColorPicker
                    color={menuColor}
                    onChange={setMenuColor}
                />
                <S.Bottom>
                    <S.Hex
                        color={menuColor}
                        onChange={setMenuColor}
                    />
                    <Button
                        onClick={handleSave}
                        loading={query.isLoading}
                    >
                        Save
                    </Button>
                </S.Bottom>
            </S.Menu>
        </S.Root>
    )
}