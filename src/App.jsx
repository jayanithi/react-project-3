import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import TaskDialog from "./components/TaskDialog";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Kanban from "./pages/Kanban";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import { useProjects } from "./context/ProjectContext";

const emptyProject = { name: "", description: "", status: "Planning", dueDate: "", color: "#8b7cff" };

export default function App() {
  const {
    projects, tasks, addProject, deleteProject,
    addTask, updateTask, deleteTask
  } = useProjects();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [snackbar, setSnackbar] = useState("");

  const openCreateTask = () => {
    setEditingTask(null);
    setTaskDialogOpen(true);
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const saveTask = (task) => {
    if (editingTask) {
      updateTask(editingTask.id, task);
      setSnackbar("Task updated successfully");
    } else {
      addTask(task);
      setSnackbar("Task created successfully");
    }
  };

  const saveProject = (event) => {
    event.preventDefault();
    if (!projectForm.name.trim()) return;
    addProject({ ...projectForm, name: projectForm.name.trim() });
    setProjectForm(emptyProject);
    setProjectDialogOpen(false);
    setSnackbar("Project created successfully");
  };

  return (
    <Box className="app-shell">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <Box className="main-area">
        <Navbar onMenu={() => setMobileOpen(true)} search={search} setSearch={setSearch} />

        <Box className="page-content">
          <Routes>
            <Route path="/" element={
              <Dashboard
                projects={projects}
                tasks={tasks}
                onCreateProject={() => setProjectDialogOpen(true)}
                onOpenProject={setSelectedProject}
              />
            } />
            <Route path="/projects" element={
              <Projects
                projects={projects}
                onCreate={() => setProjectDialogOpen(true)}
                onOpen={setSelectedProject}
                search={search}
              />
            } />
            <Route path="/tasks" element={
              <Tasks
                tasks={tasks}
                projects={projects}
                onCreate={openCreateTask}
                onEdit={openEditTask}
                onDelete={(id) => { deleteTask(id); setSnackbar("Task deleted"); }}
                search={search}
              />
            } />
            <Route path="/kanban" element={
              <Kanban
                tasks={tasks}
                projects={projects}
                onCreate={openCreateTask}
                onStatusChange={(id, status) => { updateTask(id, { status }); setSnackbar("Task status updated"); }}
              />
            } />
            <Route path="/team" element={<Team />} />
            <Route path="/calendar" element={<Calendar tasks={tasks} projects={projects} />} />
            <Route path="/reports" element={<Reports projects={projects} tasks={tasks} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={5}>
            © 2026 Orbit Workspace · Built with React & Material UI
          </Typography>
        </Box>
      </Box>

      <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={saveProject}>
          <DialogTitle>Create a project</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <TextField label="Project name" value={projectForm.name} onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })} required fullWidth />
              <TextField label="Description" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} multiline minRows={2} fullWidth />
              <TextField select label="Status" value={projectForm.status} onChange={(event) => setProjectForm({ ...projectForm, status: event.target.value })} fullWidth>
                {["Planning", "In Progress", "Completed"].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
              </TextField>
              <TextField type="date" label="Due date" value={projectForm.dueDate} onChange={(event) => setProjectForm({ ...projectForm, dueDate: event.target.value })} InputLabelProps={{ shrink: true }} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setProjectDialogOpen(false)} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained">Create project</Button>
          </DialogActions>
        </form>
      </Dialog>

      <TaskDialog
        open={taskDialogOpen}
        onClose={() => setTaskDialogOpen(false)}
        onSave={saveTask}
        projects={projects}
        task={editingTask}
      />

      <Dialog open={Boolean(selectedProject)} onClose={() => setSelectedProject(null)} fullWidth maxWidth="sm">
        {selectedProject && <>
          <DialogTitle>{selectedProject.name}</DialogTitle>
          <DialogContent>
            <Typography color="text.secondary" mb={2}>{selectedProject.description || "No description provided."}</Typography>
            <Typography variant="body2" mb={1}>Status: {selectedProject.status}</Typography>
            <Typography variant="body2" mb={1}>Due date: {selectedProject.dueDate || "Not set"}</Typography>
            <Typography variant="body2" mb={2}>Progress: {selectedProject.progress}%</Typography>
            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteOutlineRounded />}
              onClick={() => {
                deleteProject(selectedProject.id);
                setSelectedProject(null);
                setSnackbar("Project and its tasks deleted");
              }}
            >
              Delete project
            </Button>
          </DialogContent>
          <DialogActions><Button onClick={() => setSelectedProject(null)}>Close</Button></DialogActions>
        </>}
      </Dialog>

      <Snackbar open={Boolean(snackbar)} autoHideDuration={2800} onClose={() => setSnackbar("")} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbar("")}>{snackbar}</Alert>
      </Snackbar>
    </Box>
  );
}
