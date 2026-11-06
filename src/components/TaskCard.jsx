import React from "react";
import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import { CalendarTodayRounded } from "@mui/icons-material";

const priorityColor = { High: "error", Medium: "warning", Low: "success" };

export default function TaskCard({ task, projectName, onMove }) {
  const nextStatus = task.status === "To Do" ? "In Progress" : task.status === "In Progress" ? "Done" : "To Do";

  return (
    <Box className="task-card">
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
        <Chip size="small" label={task.priority} color={priorityColor[task.priority] || "default"} variant="outlined" />
        <Avatar sx={{ width: 27, height: 27, fontSize: 10, bgcolor: "#6255c5" }}>{task.assignee}</Avatar>
      </Box>
      <Typography fontWeight={700} mt={1.4} mb={0.7}>{task.title}</Typography>
      <Typography variant="caption" color="text.secondary">{projectName}</Typography>
      <Box display="flex" alignItems="center" gap={0.6} mt={1.5} color="text.secondary">
        <CalendarTodayRounded sx={{ fontSize: 14 }} />
        <Typography variant="caption">{task.dueDate || "No due date"}</Typography>
      </Box>
      {onMove && <Button size="small" fullWidth sx={{ mt: 1.5 }} variant="outlined" onClick={() => onMove(task.id, nextStatus)}>Move to {nextStatus}</Button>}
    </Box>
  );
}
