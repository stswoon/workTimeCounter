import TimerManager from "./components/TimerManager.tsx";
import AppLayout from "./components/AppLayout.tsx";
import {ThemeProvider} from "@mui/material";
import theme from "./constants/theme.ts";

const App = () => (
    <ThemeProvider theme={theme}>
        <AppLayout>
            <TimerManager/>
        </AppLayout>
    </ThemeProvider>
);

export default App
