import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";

const emptyTask = { title: "", projectId: "", status: "To Do", priority: "Medium", dueDate: "", assignee: "AJ" };

export default function TaskDialog({ open, onClose, onSave, projects, task }) {
  const [form, setForm] = useState(emptyTask);

  useEffect(() => {
    setForm(task ? { ...task } : { ...emptyTask, projectId: projects[0]?.id || "" });
  }, [task, open, projects]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.projectId) return;
    onSave({ ...form, title: form.title.trim() });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{task ? "Edit task" : "Create new task"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Task title" value={form.title} onChange={handleChange("title")} required fullWidth />
            <TextField select label="Project" value={form.projectId} onChange={handleChange("projectId")} required fullWidth>
              {projects.map((project) => <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>)}
            </TextField>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField select label="Status" value={form.status} onChange={handleChange("status")} fullWidth>
                {["To Do", "In Progress", "Done"].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
              </TextField>
              <TextField select label="Priority" value={form.priority} onChange={handleChange("priority")} fullWidth>
                {["Low", "Medium", "High"].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
              </TextField>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField type="date" label="Due date" value={form.dueDate} onChange={handleChange("dueDate")} InputLabelProps={{ shrink: true }} fullWidth />
              <TextField select label="Assignee" value={form.assignee} onChange={handleChange("assignee")} fullWidth>
                {["AJ", "MK", "SR", "JD"].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
              </TextField>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained" disabled={!projects.length}>{task ? "Save changes" : "Create task"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
