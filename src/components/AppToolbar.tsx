import { FC, memo } from "react";
import { AppBar, Grid2, Link, Stack, Toolbar, Typography } from "@mui/material";
import { strings } from "../constants/strings.ts";

const AppToolbar: FC = () => (
  <AppBar position="absolute" color="transparent">
    <Toolbar>
      <Grid2
        width="100%"
        container
        spacing={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid2 size={{ mobile: 12, tablet: 6 }}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="subtitle1" noWrap>
              {strings.header.appName}
            </Typography>

            <Typography variant="subtitle2" noWrap>
              {strings.header.appV}
              {__APP_VERSION__}
            </Typography>
          </Stack>
        </Grid2>

        <Grid2 size={{ mobile: 12, tablet: 6 }}>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="right"
          >
            <Typography variant="subtitle1" noWrap>
              {strings.header.seeAlso}
            </Typography>

            <Link variant="subtitle2" href={strings.header.link}>
              {strings.header.link}
            </Link>
          </Stack>
        </Grid2>
      </Grid2>
    </Toolbar>
  </AppBar>
);

export default memo(AppToolbar);
