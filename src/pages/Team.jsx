import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { MailOutlineRounded } from "@mui/icons-material";
import { dummyTeam } from "../data/dummyData";
import { useProjects } from "../context/ProjectContext";

export default function Team() {
  const { tasks } = useProjects();

  return (
    <Box>
      <Box className="page-heading"><Box><Typography variant="h4">Team members</Typography><Typography>Meet the people behind your projects.</Typography></Box></Box>
      <Grid container spacing={2}>
        {dummyTeam.map((member) => {
          const assignedCount = tasks.filter((task) => task.assignee === member.id).length;
          return (
            <Grid item xs={12} sm={6} lg={3} key={member.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Avatar sx={{ width: 68, height: 68, mx: "auto", mb: 1.5, bgcolor: member.color, fontSize: 20 }}>{member.id}</Avatar>
                  <Typography fontWeight={750}>{member.name}</Typography>
                  <Typography color="text.secondary" variant="body2" mb={2}>{member.role}</Typography>
                 <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  gap={0.7}
  color="text.secondary"
>
                    <Typography variant="caption" sx={{ overflowWrap: "anywhere" }}>{member.email}</Typography>
                  </Box>
                  <Box mt={2} p={1.2} borderRadius={2} bgcolor="#222939">
                    <Typography fontWeight={800}>{assignedCount}</Typography>
                    <Typography variant="caption" color="text.secondary">Assigned tasks</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
