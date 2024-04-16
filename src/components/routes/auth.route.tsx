import { Navigate } from "react-router-dom";
import { useAppSelector } from '@/hooks/useAppSelector.hook';

export default function AuthRoute({children}) {

    const authenticated = useAppSelector( (state) => state.session.authenticated);

    if (authenticated) {
        return( 
            <Navigate 
                to='/'
                replace
            />
        )
    } else {
        return children
    }
};