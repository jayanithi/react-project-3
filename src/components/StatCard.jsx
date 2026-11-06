import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ title, value, note, icon, color = "#8b7cff" }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2.3, "&:last-child": { pb: 2.3 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography color="text.secondary" fontSize={13} fontWeight={600}>{title}</Typography>
          <Avatar sx={{ bgcolor: `${color}22`, color, width: 40, height: 40 }}>{icon}</Avatar>
        </Box>
        <Typography className="stat-value">{value}</Typography>
        <Typography variant="caption" color="text.secondary">{note}</Typography>
      </CardContent>
    </Card>
  );
}
