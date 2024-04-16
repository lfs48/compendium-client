import { Navigate } from "react-router-dom";
import { useAppSelector } from '@/hooks/useAppSelector.hook';

export default function GmRoute({children}) {

    const gm = useAppSelector( (state) => state.session.gm);

    if (gm) {
        return children;
    } else {
        return( 
            <Navigate 
                to='/'
                replace
            />
        )
    }
};