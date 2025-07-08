// src/components/Header.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AffordMed URL Shortener
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Shorten
        </Button>
        <Button color="inherit" component={Link} to="/stats">
          Stats
        </Button>
      </Toolbar>
    </AppBar>
  );
}
