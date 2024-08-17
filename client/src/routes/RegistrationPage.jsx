import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiPost, HttpRequestError } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/session";
import FlashMessage from "../components/FlashMessage";

const defaultTheme = createTheme();

export default function RegistrationPage() {
  const nav = useNavigate();
  const { session, setSession } = useSession();
  console.log(session); // dodělat!!!!

  const [successMessageState, setSuccessMessageState] = useState(null); //➡️ Nastavení úspěšné zprávy
  const [errorMessageState, setErrorMessageState] = useState(null); //➡️ Nastavení neúspěšné zprávy

  const [valuesState, setValuesState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valuesState.password !== valuesState.confirmPassword) {
      setErrorMessageState("Hesla se nerovnají");
      return;
    }
    const { confirmPassword, ...registrationData } = valuesState;
    apiPost("/api/user", registrationData)
      .then(() => {
        setSuccessMessageState("Registrace byla úspěšná!");
        setTimeout(() => {
          nav("/login");
        }, 2000); // Přesměrování po 2 sekundách
      })
      .catch((e) => {
        if (e instanceof HttpRequestError && e.response.status === 400) {
          e.response.text().then((message) => setErrorMessageState(message));
          return;
        }
        setErrorMessageState("Při komunikaci se serverem nastala chyba.");
      });
  };

  const handleChange = (e) => {
    const fieldName = e.target.name;
    setValuesState({ ...valuesState, [fieldName]: e.target.value });
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
            Registrace
          </Typography>
          {errorMessageState && (
            <FlashMessage theme="danger" text={errorMessageState} />
          )}
          {successMessageState && (
            <FlashMessage theme="success" text={successMessageState} />
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Jméno"
                  autoFocus
                  value={valuesState.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Příjmení"
                  name="lastName"
                  autoComplete="family-name"
                  value={valuesState.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-Mail"
                  name="email"
                  autoComplete="email"
                  value={valuesState.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Heslo"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={valuesState.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Potvrdit Heslo"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={valuesState.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Chci dostávat inspiraci, marketingové akce a aktualizace e-mailem."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrovat se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Již máte účet?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
