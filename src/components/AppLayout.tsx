import {FC, PropsWithChildren, ReactElement} from 'react'
import {Box} from "@mui/material";

interface AppLayoutProps extends PropsWithChildren {
    children: ReactElement
}

export const AppLayout: FC<AppLayoutProps> = ({children}) => {
    return <Box sx={{
        minWidth: "400px",
        width: "100vw",
        maxWidth: "1200px",
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