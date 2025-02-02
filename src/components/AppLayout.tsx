import {FC, memo, PropsWithChildren} from 'react'
import {Box} from "@mui/material";

const AppLayout: FC<PropsWithChildren> = ({children}) => {
    return <Box sx={{
        minWidth: "340px",
        width: "100vw",
        padding: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "radial-gradient(circle, rgba(246,154,13,0.9) 20%, rgba(255,255,255,1) 100%)"
    }}>
        {children}
    </Box>
}

export default memo(AppLayout);