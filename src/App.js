import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout";
import { routesConfig } from "./routesConfig.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routesConfig.map((v)=>{
                    const MatchComponent = v.component;
                    return (
                        <Route
                            key={v.name}
                            path={v.route}
                            element={
                                <MainLayout>
                                    <MatchComponent/>
                                </MainLayout>
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    )
};

export default App;