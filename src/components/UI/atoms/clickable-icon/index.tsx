import * as S from './styled';

interface ClickableIconProps {
    disabled?: boolean;
    icon: 'check' | 'x' | 'plus';
    onClick: (...args) => void;
    [prop:string]: any;
}

export default function ClickableIcon({
    icon,
    disabled=false,
    ...props
}: ClickableIconProps) {
    return(
        <S.Root 
            $icon={icon}
            $disabled={disabled}
            {...props}
        />
    )
}