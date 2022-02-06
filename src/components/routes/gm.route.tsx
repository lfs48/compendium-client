import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/types";

export default function GmRoute({children}) {

    const gm = useSelector( (state:RootState) => state.session.gm);

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