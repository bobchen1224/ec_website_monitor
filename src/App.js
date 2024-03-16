import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AdsMonitorTs from "./pages/AdsMonitorTs/index.tsx";

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
                <Route 
                    path='/adsMonitor' 
                    element={
                        <MainLayout>
                            <AdsMonitorTs/>
                        </MainLayout>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
};

export default App;