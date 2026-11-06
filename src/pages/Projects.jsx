import React, { useMemo, useState } from "react";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import ProjectCard from "../components/ProjectCard";

export default function Projects({ projects, onCreate, onOpen, search }) {
  const [status, setStatus] = useState("All");

  const filteredProjects = useMemo(() => projects.filter((project) => {
    const matchesStatus = status === "All" || project.status === status;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${project.name} ${project.description}`.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  }), [projects, status, search]);

  return (
    <Box>
      <Box className="page-heading">
        <Box><Typography variant="h4">Projects</Typography><Typography>Manage and track all your team projects.</Typography></Box>
        <Box className="heading-actions"><Button variant="contained" startIcon={<AddRounded />} onClick={onCreate}>New project</Button></Box>
      </Box>
      <Box mb={3}>
        <TextField select size="small" label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} sx={{ width: { xs: "100%", sm: 220 } }}>
          {["All", "Planning", "In Progress", "Completed"].map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
        </TextField>
      </Box>
      <Grid container spacing={2}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={project.id}>
            <ProjectCard project={project} onOpen={() => onOpen(project)} />
          </Grid>
        ))}
        {!filteredProjects.length && <Grid item xs={12}><Typography color="text.secondary" textAlign="center" py={6}>No projects found. Try another search or filter.</Typography></Grid>}
      </Grid>
    </Box>
  );
}
