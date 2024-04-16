import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/types";

export default function AuthRoute({children}) {

    const authenticated = useSelector( (state:RootState) => state.session.authenticated);

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