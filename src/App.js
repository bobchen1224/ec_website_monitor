import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    index 
                    element={
                        <MainLayout>
                            <Dashboard/>
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
};

export default App;