import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/types";

export default function Auth({children}) {

    const { authenticated } = useSelector( (state:RootState) => state.session);

    if (authenticated) {
        return( 
            <Navigate 
                to='/dashboard'
                replace
            />
        )
    } else {
        return children
    }
};