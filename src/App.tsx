import './App.css'
import {Box} from "@mui/material";
import TimerManager from "./components/TimerManager.tsx";

const App = () => (
    <>
        <Box className="content">
            <TimerManager/>
        </Box>
    </>
);

export default App
