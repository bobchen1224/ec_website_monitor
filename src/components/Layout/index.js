import { Box, useMediaQuery, useTheme } from "@mui/material";
import SlideMenu from "./SlideMenu";
import TopMenu from "./TopMenu";

const MainLayout = ({children}) => {
    const theme = useTheme();
    const smCheck = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <>
            {smCheck ? <SlideMenu/> : <TopMenu/>}
            <Box sx={{backgroundColor: '#070D19', minHeight: '100vh', paddingLeft: smCheck ? '120px' : '0'}}>
                {children}
            </Box>
        </>
    )
};

export default MainLayout;