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
          color="white"
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
          color="#fff"
          noWrap
          variant="body2"
          href={"/create_twit"}
          sx={{ p: 1, flexShrink: 0 }}
        >
          Create twit
        </Link>

        <Link
          color="#fff"
          noWrap
          variant="body2"
          href={"/login"}
          sx={{ p: 1, flexShrink: 0 }}
        >
          login
        </Link>
        <Link
          color="#fff"
          noWrap
          variant="body2"
          href={"/register"}
          sx={{ p: 1, flexShrink: 0 }}
        >
          register
        </Link>
        <Link
          color="#fff"
          noWrap
          variant="body2"
          href={"/profile"}
          sx={{ p: 1, flexShrink: 0 }}
        >
          profile
        </Link>
      </Toolbar>
    </React.Fragment>
  );
}
