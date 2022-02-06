import { 
    Routes,
    Route,
    BrowserRouter
 } from "react-router-dom";
import Auth from "./auth.route";
import Protected from "./protected.route";
import Landing from "@pages/landing";
import Register from "@pages/register";
import Dashboard from "@pages/dashboard";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/login'
                    element={
                        <Auth>
                            <Landing />
                        </Auth>
                    }
                />
                <Route 
                    path='/register'
                    element={
                        <Auth>
                            <Register />
                        </Auth>
                    }
                />
                <Route 
                    path='/*'
                    element={
                        <Protected>
                            <Dashboard />
                        </Protected>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}