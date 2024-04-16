import { useGetUserByIdQuery } from "@/api/users.api";
import { Navigate, Route } from "react-router-dom";
import Loading from "@/components/UI/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { useEffect } from "react";
import { logout } from "@/reducers/session.reducer";
import { skipToken } from "@reduxjs/toolkit/query";

export default function ProtectedRoute({children}) {

    const dispatch = useDispatch();

    const id = useSelector( (state:RootState) => state.session.id)
    const authenticated = !!id;
    
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