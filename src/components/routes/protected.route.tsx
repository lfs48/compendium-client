import { useGetUserByIdQuery } from "@/api/users.api";
import { Navigate, Route } from "react-router-dom";
import Loading from "@/components/UI/loading";
import { useDispatch } from "react-redux";
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { useEffect } from "react";
import { logout } from "@/reducers/session.reducer";
import { skipToken } from "@reduxjs/toolkit/query";

export default function ProtectedRoute({children}) {

    const dispatch = useDispatch();

    const id = useAppSelector( (state) => state.session.id)
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