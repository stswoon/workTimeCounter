import { FC, memo, PropsWithChildren } from "react";
import { AppBar, Box, Link, Stack, Toolbar, Typography } from "@mui/material";
import { strings } from "../constants/strings.ts";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar position="absolute" color="transparent">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {strings.header.appName}
            </Typography>
            <Typography variant="subtitle2">
              {strings.header.appV}
              {__APP_VERSION__}
            </Typography>
          </Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {strings.header.seeAlso}
            </Typography>
            <Link variant="subtitle2" href={strings.header.link}>
              {strings.header.link}
            </Link>
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
