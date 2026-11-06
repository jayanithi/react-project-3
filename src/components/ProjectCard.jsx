import React from "react";
import { Avatar, AvatarGroup, Box, Button, Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { MoreHorizRounded, ArrowOutwardRounded } from "@mui/icons-material";

export default function ProjectCard({ project, onOpen }) {
  const statusColor = project.status === "Completed" ? "success" : project.status === "Planning" ? "warning" : "info";
  return (
    <Card sx={{ height: "100%", transition: "border-color .2s, transform .2s", "&:hover": { transform: "translateY(-2px)", borderColor: project.color } }}>
      <CardContent sx={{ p: 2.2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: `${project.color}22`, border: `1px solid ${project.color}55` }} />
          <IconButton size="small" aria-label="Project options"><MoreHorizRounded /></IconButton>
        </Box>
        <Typography fontWeight={750} mt={2} mb={0.6} sx={{ overflowWrap: "anywhere" }}>{project.name}</Typography>
        <Typography color="text.secondary" fontSize={12} sx={{ minHeight: 36 }}>{project.description}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mt: 2, mb: 1 }}>
          <Chip size="small" label={project.status} color={statusColor} variant="outlined" />
          <Typography variant="caption" color="text.secondary">{project.progress}%</Typography>
        </Box>
        <Box className="progress-track">
          <Box className="progress-fill" sx={{ width: `${Math.min(100, Math.max(0, project.progress || 0))}%`, background: project.color }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mt: 2 }}>
          <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 27, height: 27, fontSize: 10, borderColor: "#191e2b" } }}>
            {(project.members || []).map((member, index) => (
              <Avatar key={member} sx={{ bgcolor: ["#6255c5", "#278d79", "#b17b30"][index % 3] }}>{member}</Avatar>
            ))}
          </AvatarGroup>
          <Button size="small" endIcon={<ArrowOutwardRounded />} onClick={onOpen}>Details</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
