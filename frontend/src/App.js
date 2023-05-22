import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import {useState} from "react";
import Context from "./Context";

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    const [loginState, setLoginState] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false);

    const contextValue = {loginState, setLoginState, loginOpen, setLoginOpen}

    return (
        <Context.Provider value={contextValue}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    <NavigationScroll>
                        <Routes />
                    </NavigationScroll>
                </ThemeProvider>
            </StyledEngineProvider>
        </Context.Provider>
    );
};

export default App;
