import React from "react";
import { Box, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import TaskCard from "../components/TaskCard";

const columns = ["To Do", "In Progress", "Done"];

export default function Kanban({ tasks, projects, onCreate, onStatusChange }) {
  const getProjectName = (id) => projects.find((project) => project.id === id)?.name || "Project";

  return (
    <Box>
      <Box className="page-heading">
        <Box><Typography variant="h4">Kanban Board</Typography><Typography>Visualize work as it moves through your workflow.</Typography></Box>
        <Box className="heading-actions"><Button variant="contained" startIcon={<AddRounded />} onClick={onCreate}>Add task</Button></Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(3, minmax(0, 1fr))" }, gap: 2, alignItems: "start" }}>
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column);
          const dotColor = column === "Done" ? "#35c9a5" : column === "In Progress" ? "#8b7cff" : "#f5b84b";
          return (
            <Box key={column} className="kanban-column">
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: dotColor }} />
                <Typography fontWeight={750}>{column}</Typography>
                <Typography variant="caption" color="text.secondary">({columnTasks.length})</Typography>
              </Box>
              <Box display="grid" gap={1.3}>
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} projectName={getProjectName(task.projectId)} onMove={onStatusChange} />
                ))}
                {!columnTasks.length && <Typography variant="caption" color="text.secondary" textAlign="center" py={3}>No tasks in this column.</Typography>}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
