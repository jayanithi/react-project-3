import React from "react";
import { Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import { AddRounded, AssignmentTurnedInRounded, FolderOpenRounded, GroupsRounded, ScheduleRounded } from "@mui/icons-material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";

const chartData = [
  { month: "Jun", completed: 12, created: 18 },
  { month: "Jul", completed: 18, created: 23 },
  { month: "Aug", completed: 22, created: 25 },
  { month: "Sep", completed: 17, created: 20 },
  { month: "Oct", completed: 28, created: 30 },
  { month: "Nov", completed: 24, created: 27 }
];

export default function Dashboard({ projects, tasks, onCreateProject, onOpenProject }) {
  const done = tasks.filter((task) => task.status === "Done").length;
  const active = projects.filter((project) => project.status === "In Progress").length;
  const open = tasks.filter((task) => task.status !== "Done").length;

  return (
    <Box>
      <Box className="page-heading">
        <Box minWidth={0}><Typography variant="h4">Good evening, Jayanithi 👋</Typography><Typography>Here’s what’s happening in your workspace today.</Typography></Box>
        <Box className="heading-actions"><Button variant="contained" startIcon={<AddRounded />} onClick={onCreateProject}>New project</Button></Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} xl={3}><StatCard title="Total projects" value={projects.length} note="Across your workspace" icon={<FolderOpenRounded />} color="#8b7cff" /></Grid>
        <Grid item xs={12} sm={6} xl={3}><StatCard title="Active projects" value={active} note="Currently in progress" icon={<ScheduleRounded />} color="#35c9a5" /></Grid>
        <Grid item xs={12} sm={6} xl={3}><StatCard title="Completed tasks" value={done} note="Tasks marked as done" icon={<AssignmentTurnedInRounded />} color="#f5b84b" /></Grid>
        <Grid item xs={12} sm={6} xl={3}><StatCard title="Open tasks" value={open} note="Still need attention" icon={<GroupsRounded />} color="#ff7185" /></Grid>

        <Grid item xs={12} lg={8}>
          <Card sx={{ height: "100%", minHeight: 330 }}><CardContent>
            <Typography fontWeight={750} mb={0.5}>Task activity</Typography>
            <Typography variant="caption" color="text.secondary">Tasks created vs completed</Typography>
            <Box className="responsive-chart" mt={2}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#2b3140" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="#8992a8" tickLine={false} axisLine={false} />
                  <YAxis stroke="#8992a8" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#202636", border: "1px solid #343c50", borderRadius: 10 }} />
                  <Bar dataKey="created" name="Created" fill="#6255c5" radius={[5, 5, 0, 0]} />
                  <Bar dataKey="completed" name="Completed" fill="#35c9a5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent></Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ height: "100%", minHeight: 330 }}><CardContent>
            <Typography fontWeight={750} mb={2}>Task overview</Typography>
            {["To Do", "In Progress", "Done"].map((status, index) => {
              const count = tasks.filter((task) => task.status === status).length;
              const color = ["#f5b84b", "#8b7cff", "#35c9a5"][index];
              return <Box key={status} mb={2.6}>
                <Box display="flex" justifyContent="space-between" mb={0.8}><Typography fontSize={13}>{status}</Typography><Typography fontSize={13} fontWeight={700}>{count}</Typography></Box>
                <Box className="progress-track"><Box className="progress-fill" sx={{ width: `${tasks.length ? count / tasks.length * 100 : 0}%`, background: color }} /></Box>
              </Box>;
            })}
            <Chip label={`${tasks.length} tasks in total`} size="small" variant="outlined" />
          </CardContent></Card>
        </Grid>

        <Grid item xs={12}>
          <Box mb={2}><Typography variant="h6">Projects</Typography><Typography variant="caption" color="text.secondary">Your recently updated projects</Typography></Box>
          <Grid container spacing={2}>
            {projects.slice(0, 4).map((project) => (
              <Grid item xs={12} sm={6} lg={3} key={project.id}>
                <ProjectCard project={project} onOpen={() => onOpenProject(project)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
