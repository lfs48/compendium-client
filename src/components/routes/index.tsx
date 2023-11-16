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
import Navbar from "../UI/navbar";
import Footer from "../UI/footer";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Navbar />
            <Footer />
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
                        <Dashboard />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}