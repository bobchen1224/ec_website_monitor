import DashboardTs from "./pages/DashboardTs";
import AdsMonitorTs from "./pages/AdsMonitorTs";
import { AdsClick, Dashboard } from "@mui/icons-material";

export const routesConfig = [
    {
        name: '營業狀態總覽',
        menuTitle: 'businessOverview',
        route: '/',
        component: DashboardTs,
        icon: Dashboard,
    },
    {
        name: '廣告活動監控',
        menuTitle: 'adsCampaignMonitor',
        route: '/adsMonitor',
        component: AdsMonitorTs,
        icon: AdsClick,
    }
];