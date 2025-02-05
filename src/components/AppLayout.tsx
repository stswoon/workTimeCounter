import { FC, memo, PropsWithChildren } from "react";
import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { strings } from "../constants/strings.ts";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar position="absolute" color="transparent">
        <Toolbar>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="subtitle1">{strings.appName}</Typography>
            <Typography variant="subtitle2">
              {strings.appV}
              {__APP_VERSION__}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minWidth: "340px",
          width: "100vw",
          padding: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:
            "radial-gradient(circle, rgba(246,154,13,0.9) 20%, rgba(255,255,255,1) 100%)",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default memo(AppLayout);
