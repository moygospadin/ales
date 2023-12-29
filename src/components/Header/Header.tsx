import Toolbar from "@mui/material/Toolbar";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

export function Header() {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {"Microblog"}
        </Typography>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        <Link
          color="inherit"
          noWrap
          variant="body2"
          href={"/create_twit"}
          sx={{ p: 1, flexShrink: 0 }}
        >
          create twit
        </Link>

        <Link
          color="inherit"
          noWrap
          variant="body2"
          href={"/login"}
          sx={{ p: 1, flexShrink: 0 }}
        >
          login
        </Link>
        <Link
          color="inherit"
          noWrap
          variant="body2"
          href={"/register"}
          sx={{ p: 1, flexShrink: 0 }}
        >
          register
        </Link>
      </Toolbar>
    </React.Fragment>
  );
}
