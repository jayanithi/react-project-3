import React from "react";
import { NavLink } from "react-router-dom";
import {
  DashboardRounded, FolderOpenRounded, CheckCircleRounded,
  ViewKanbanRounded, GroupsRounded, CalendarMonthRounded,
  BarChartRounded, SettingsRounded, CloseRounded, AutoAwesomeRounded
} from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";

const navigation = [
  { label: "Overview", path: "/", icon: <DashboardRounded /> },
  { label: "Projects", path: "/projects", icon: <FolderOpenRounded /> },
  { label: "My Tasks", path: "/tasks", icon: <CheckCircleRounded /> },
  { label: "Kanban Board", path: "/kanban", icon: <ViewKanbanRounded /> },
  { label: "Team", path: "/team", icon: <GroupsRounded /> },
  { label: "Calendar", path: "/calendar", icon: <CalendarMonthRounded /> },
  { label: "Reports", path: "/reports", icon: <BarChartRounded /> },
  { label: "Settings", path: "/settings", icon: <SettingsRounded /> }
];

function SidebarContent({ onNavigate }) {
  return (
    <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, px: 1, py: 1.5, mb: 3 }}>
        <Box sx={{ width: 38, height: 38, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "primary.main" }}>
          <AutoAwesomeRounded sx={{ color: "#fff" }} />
        </Box>
        <Box>
          <Typography fontWeight={800} fontSize={18}>orbit<span style={{ color: "#8b7cff" }}>.</span></Typography>
          <Typography variant="caption" color="text.secondary">WORKSPACE</Typography>
        </Box>
      </Box>

      <Typography variant="overline" color="text.secondary" sx={{ px: 1.5, mb: 1 }}>WORKSPACE</Typography>
      <Box sx={{ display: "grid", gap: 0.6 }}>
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 13,
              padding: "11px 13px", borderRadius: 10,
              color: isActive ? "#fff" : "#9ba3b7",
              background: isActive ? "rgba(139,124,255,.16)" : "transparent",
              borderLeft: isActive ? "3px solid #8b7cff" : "3px solid transparent",
              fontSize: 14, fontWeight: isActive ? 700 : 500
            })}
          >
            {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
            {item.label}
          </NavLink>
        ))}
      </Box>

      <Box sx={{ mt: "auto", p: 2, borderRadius: 3, bgcolor: "rgba(139,124,255,.10)", border: "1px solid rgba(139,124,255,.2)" }}>
        <Typography fontWeight={700} fontSize={13}>Keep your team aligned</Typography>
        <Typography variant="caption" color="text.secondary">Organize tasks and make progress together.</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, px: 1, pt: 2 }}>
        <Box sx={{ width: 34, height: 34, borderRadius: "50%", bgcolor: "#4d5572", display: "grid", placeItems: "center", fontWeight: 700 }}>JR</Box>
        <Box>
          <Typography fontSize={13} fontWeight={700}>Jayanithi R</Typography>
          <Typography variant="caption" color="text.secondary">Workspace admin</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      <Box sx={{ width: 252, flexShrink: 0, display: { xs: "none", md: "block" } }}>
        <Box sx={{ width: 252, height: "100vh", position: "fixed", top: 0, left: 0, bgcolor: "#151a26", borderRight: "1px solid #282e3d", overflowY: "auto" }}>
          <SidebarContent />
        </Box>
      </Box>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: 270, maxWidth: "85vw", bgcolor: "#151a26", borderRight: "1px solid #282e3d" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Close menu"><CloseRounded /></IconButton>
        </Box>
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>
    </>
  );
}
