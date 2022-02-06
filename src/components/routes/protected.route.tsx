import { useGetUserByIdQuery } from "@/api/users.api";
import { Navigate, Route } from "react-router-dom";
import Loading from "@atoms/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { useEffect } from "react";
import { logout } from "@/reducers/session.reducer";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export default function ProtectedRoute({children}) {

    const dispatch = useDispatch();

    const { authenticated, id } = useSelector( (state:RootState) => state.session);
    
    const { data, error, isLoading } = useGetUserByIdQuery(id ?? skipToken);

    useEffect( () => {
        if (error) {
            dispatch({
                type: logout.type
            })
        }
    }, [error])

    if (authenticated && data) {
        return children;
    } else if (isLoading) {
        return <Loading />
    } else {
        return( 
            <Navigate 
                to='/login'
                replace
            />
        )
    }
};