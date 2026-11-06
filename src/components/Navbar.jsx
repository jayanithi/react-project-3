import React from "react";
import { AppBar, Avatar, Box, IconButton, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import { MenuRounded, NotificationsNoneRounded, SearchRounded } from "@mui/icons-material";

export default function Navbar({ onMenu, search, setSearch }) {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(16,19,28,.94)", backdropFilter: "blur(14px)", borderBottom: "1px solid #282e3d" }}>
      <Toolbar sx={{ minHeight: "72px !important", px: { xs: 1, sm: 2.5 }, gap: { xs: 1, sm: 2 } }}>
        <IconButton onClick={onMenu} aria-label="Open menu" sx={{ display: { xs: "inline-flex", md: "none" } }}>
          <MenuRounded />
        </IconButton>
        <TextField
          size="small"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search projects and tasks..."
          sx={{ width: { xs: "min(100%, 230px)", sm: 300 }, "& .MuiOutlinedInput-root": { bgcolor: "#191e2b" } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded fontSize="small" /></InputAdornment> }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }} />
        <IconButton aria-label="Notifications"><NotificationsNoneRounded /></IconButton>
        <Avatar sx={{ width: 34, height: 34, bgcolor: "#6456c8", fontSize: 13 }}>JR</Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography fontSize={13} fontWeight={700}>Jayanithi R</Typography>
          <Typography variant="caption" color="text.secondary">Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
