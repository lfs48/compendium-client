import { Hitpoints } from '@/types/Character';
import * as S from './styled';

interface HitPointsProps {
    hp: Hitpoints;
    [prop: string]: any;
}

export default function HitPoints({
    hp,
    ...props
}: HitPointsProps) {
    return(
        <S.Root {...props}>
            <S.HitpointControls>
                <div>
                    <S.HealButton fill={false} color='green'>HEAL</S.HealButton>
                    <S.TempButton fill={false}>TEMP</S.TempButton>
                </div>
                <S.HitpointInput />
                <S.DamageButton fill={false} color='red'>DAMAGE</S.DamageButton>
            </S.HitpointControls>
            <S.Hitpoints>
                <S.HitpointLabel>HIT POINTS</S.HitpointLabel>
                <span>{hp.current}/{hp.max}</span>
            </S.Hitpoints>
            <S.Hitpoints>
                <S.HitpointLabel>TEMP HP</S.HitpointLabel>
                <span>{hp.temp > 0 ? hp.temp : '- -'}</span>
            </S.Hitpoints>
        </S.Root>
    )
}