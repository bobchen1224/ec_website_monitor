import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout";
import AdsMonitorTs from "./pages/AdsMonitorTs/index.tsx";
import DashboardTs from "./pages/DashboardTs/index.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    index 
                    element={
                        <MainLayout>
                            <DashboardTs/>
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