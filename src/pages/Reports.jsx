import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function Reports({ projects, tasks }) {
  const data = ["To Do", "In Progress", "Done"].map((status) => ({
    name: status,
    value: tasks.filter((task) => task.status === status).length
  }));
  const colors = ["#f5b84b", "#8b7cff", "#35c9a5"];
  const completedPercent = tasks.length
    ? Math.round(tasks.filter((task) => task.status === "Done").length / tasks.length * 100)
    : 0;

  return (
    <Box>
      <Box className="page-heading"><Box><Typography variant="h4">Reports</Typography><Typography>Understand your team's project and task performance.</Typography></Box></Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350 }}><CardContent>
            <Typography fontWeight={750}>Task status distribution</Typography>
            <Box className="responsive-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                    {data.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#202636", border: "1px solid #343c50", borderRadius: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 350 }}><CardContent>
            <Typography fontWeight={750} mb={3}>Workspace summary</Typography>
            {[
              ["Total projects", projects.length],
              ["Total tasks", tasks.length],
              ["Completed tasks", tasks.filter((task) => task.status === "Done").length],
              ["Task completion", `${completedPercent}%`]
            ].map(([label, value]) => (
              <Box key={label} display="flex" justifyContent="space-between" gap={2} py={1.7} borderBottom="1px solid #282e3d">
                <Typography color="text.secondary">{label}</Typography>
                <Typography fontWeight={750}>{value}</Typography>
              </Box>
            ))}
          </CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  );
}
