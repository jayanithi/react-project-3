import React from "react";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { CalendarMonthRounded } from "@mui/icons-material";

export default function Calendar({ tasks, projects }) {
  const upcomingTasks = [...tasks].filter((task) => task.dueDate).sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const getProjectName = (id) => projects.find((project) => project.id === id)?.name || "Project";

  return (
    <Box>
      <Box className="page-heading"><Box><Typography variant="h4">Calendar</Typography><Typography>Upcoming task deadlines in chronological order.</Typography></Box></Box>
      <Card><CardContent>
        {upcomingTasks.length ? upcomingTasks.map((task, index) => (
          <Box key={task.id} display="flex" alignItems="center" gap={2} py={2} borderBottom={index === upcomingTasks.length - 1 ? 0 : "1px solid #282e3d"}>
            <Box sx={{ width: 46, height: 46, borderRadius: 2, bgcolor: "rgba(139,124,255,.15)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <CalendarMonthRounded color="primary" />
            </Box>
            <Box flex={1} minWidth={0}>
              <Typography fontWeight={700} sx={{ overflowWrap: "anywhere" }}>{task.title}</Typography>
              <Typography variant="caption" color="text.secondary">{getProjectName(task.projectId)} · Assigned to {task.assignee}</Typography>
            </Box>
            <Box textAlign="right" flexShrink={0}>
              <Typography fontSize={13} fontWeight={700}>{task.dueDate}</Typography>
              <Chip size="small" label={task.status} sx={{ mt: 0.5 }} />
            </Box>
          </Box>
        )) : <Typography color="text.secondary" textAlign="center" py={5}>No scheduled deadlines yet.</Typography>}
      </CardContent></Card>
    </Box>
  );
}
