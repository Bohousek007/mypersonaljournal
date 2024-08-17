import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FlashMessage from "../components/FlashMessage";
import { useSession } from "../contexts/session";
import { useNavigate } from "react-router-dom";
import { apiPost, HttpRequestError } from "../utils/api";

const defaultTheme = createTheme();

export const LoginPage = () => {
  const [valuesState, setValuesState] = useState({ email: "", password: "" });
  const [errorMessageState, setErrorMessageState] = useState(null);
  const { session, setSession } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.data) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    setValuesState({ ...valuesState, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiPost("/api/auth", valuesState)
      .then((data) => setSession({ data, status: "authenticated" }))
      .catch((e) => {
        if (e instanceof HttpRequestError) {
          e.response
            .text()
            .then((message) => setErrorMessageState(message));
          return;
        }
        setErrorMessageState("Při komunikaci se serverem nastala chyba.");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Přihlášení
          </Typography>
          {errorMessageState ? (
            <FlashMessage theme={"danger"} text={errorMessageState} />
          ) : null}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={valuesState.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Heslo"
              type="password"
              id="password"
              autoComplete="current-password"
              value={valuesState.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamatuj si mě"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Přihlásit se
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Nemáte účet? Zaregistrujte se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};