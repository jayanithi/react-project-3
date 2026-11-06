import React, { useMemo, useState } from "react";
import { Box, Button, Chip, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { AddRounded, DeleteOutlineRounded, EditRounded } from "@mui/icons-material";

const priorityColor = { High: "error", Medium: "warning", Low: "success" };

export default function Tasks({ tasks, projects, onCreate, onEdit, onDelete, search }) {
  const [filter, setFilter] = useState("All");
  const rows = useMemo(() => tasks.filter((task) => {
    const statusMatches = filter === "All" || task.status === filter;
    const query = search.trim().toLowerCase();
    const searchMatches = !query || `${task.title} ${task.assignee}`.toLowerCase().includes(query);
    return statusMatches && searchMatches;
  }), [tasks, filter, search]);

  const projectName = (id) => projects.find((project) => project.id === id)?.name || "Unknown project";

  return (
    <Box>
      <Box className="page-heading">
        <Box><Typography variant="h4">My Tasks</Typography><Typography>Keep track of work and deadlines.</Typography></Box>
        <Box className="heading-actions"><Button variant="contained" startIcon={<AddRounded />} onClick={onCreate}>Add task</Button></Box>
      </Box>
      <Box mb={2}>
        <TextField select size="small" label="Filter by status" value={filter} onChange={(event) => setFilter(event.target.value)} sx={{ width: { xs: "100%", sm: 220 } }}>
          {["All", "To Do", "In Progress", "Done"].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
        </TextField>
      </Box>
      <TableContainer component={Paper} sx={{ border: "1px solid #282e3d", borderRadius: 3 }}>
        <Box className="table-wrap">
          <Table>
            <TableHead><TableRow>{["Task", "Project", "Assignee", "Priority", "Due date", "Status", "Actions"].map((heading) => <TableCell key={heading} sx={{ color: "text.secondary", fontWeight: 700 }}>{heading}</TableCell>)}</TableRow></TableHead>
            <TableBody>
              {rows.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell sx={{ fontWeight: 650 }}>{task.title}</TableCell>
                  <TableCell>{projectName(task.projectId)}</TableCell>
                  <TableCell><Chip label={task.assignee} size="small" /></TableCell>
                  <TableCell><Chip label={task.priority} size="small" color={priorityColor[task.priority] || "default"} variant="outlined" /></TableCell>
                  <TableCell>{task.dueDate || "—"}</TableCell>
                  <TableCell><Chip label={task.status} size="small" color={task.status === "Done" ? "success" : task.status === "In Progress" ? "info" : "default"} /></TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => onEdit(task)} aria-label="Edit task"><EditRounded fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => onDelete(task.id)} aria-label="Delete task"><DeleteOutlineRounded fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && <TableRow><TableCell colSpan={7} align="center" sx={{ py: 5, color: "text.secondary" }}>No tasks found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </Box>
  );
}
