import { useGetUserByIdQuery } from "@/api/users.api";
import { Navigate, Route } from "react-router-dom";
import Loading from "@pages/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/types/interfaces";

// Route for components that should only be accessed when authenticated, e.g. dashboard
export default function Protected({children}) {

    const { authenticated, id } = useSelector( (state:RootState) => state.session);
    
    const { data, error, isLoading } = useGetUserByIdQuery(id);

    if (authenticated && data) {
        return children;
    } else if (isLoading) {
        return <Loading />
    } else {
        return( 
            <Navigate 
                to='/'
                replace
            />
        )
    }
};