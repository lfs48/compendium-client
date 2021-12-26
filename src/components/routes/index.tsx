import { 
    Routes,
    Route,
    BrowserRouter
 } from "react-router-dom";
import Auth from "./auth";
import Protected from "./protected";
import Landing from "@pages/landing";
import Register from "@pages/register";
import Dashboard from "@pages/dashboard";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/"
                    element={
                        <Auth>
                            <Landing />
                        </Auth>
                    }
                />
                <Route 
                    path="/register"
                    element={
                        <Auth>
                            <Register />
                        </Auth>
                    }
                />
                <Route 
                    path="/dashboard"
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