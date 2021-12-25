import { 
    Routes,
    Route,
    BrowserRouter
 } from "react-router-dom";
import Landing from "@pages/landing";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/"
                    element={<Landing />}
                />
            </Routes>
        </BrowserRouter>
    )
}