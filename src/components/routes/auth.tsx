import { useGetUserByIdQuery } from "@/api/users.api";
import { Navigate, Route } from "react-router-dom";
import Loading from "@pages/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/types/interfaces";

// Route for components that should only be accessed when authenticated, e.g. dashboard
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