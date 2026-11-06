import React, { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { SaveRounded } from "@mui/icons-material";

export default function Settings() {
  const [name, setName] = useState(() => localStorage.getItem("orbit_profile_name") || "Jayanithi R");
  const [email, setEmail] = useState(() => localStorage.getItem("orbit_profile_email") || "jayanithi@example.com");
  const [saved, setSaved] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem("orbit_profile_name", name.trim());
    localStorage.setItem("orbit_profile_email", email.trim());
    setSaved(true);
  };

  return (
    <Box>
      <Box className="page-heading"><Box><Typography variant="h4">Settings</Typography><Typography>Manage your workspace profile.</Typography></Box></Box>
      <Card sx={{ maxWidth: 650 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h6" mb={0.5}>Profile information</Typography>
          <Typography color="text.secondary" variant="body2" mb={3}>Update the details displayed in your workspace.</Typography>
          {saved && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaved(false)}>Profile settings saved successfully.</Alert>}
          <Stack component="form" spacing={2} onSubmit={handleSave}>
            <TextField label="Full name" value={name} onChange={(event) => setName(event.target.value)} required fullWidth />
            <TextField label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required fullWidth />
            <Box><Button type="submit" variant="contained" startIcon={<SaveRounded />}>Save changes</Button></Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
