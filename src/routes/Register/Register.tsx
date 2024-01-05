import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared";

export function Register() {
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const body = {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        sex: "M",
        country: data.get("country"),
        age: data.get("age"),
        date_of_birthday: data.get("date_of_birthday"),
        first_name: data.get("first_name"),
        last_name: data.get("last_name"),
        about: data.get("about"),
      };

      await httpClient.post<string>("register/", body);

      navigate("/login");
    } catch (error: any) {}
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="first_name"
            label="first name"
            id="first_name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="last_name"
            label="second name"
            id="last_name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="country"
            label="country"
            name="country"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="user name"
            id="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="about"
            label="about"
            id="about"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="date_of_birthday"
            label="birth date"
            id="date_of_birthday"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="age"
            label="age"
            id="age"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
