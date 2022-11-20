import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRef } from "react";
import "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { createDoc } from "./NavBar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        ERROR 404
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function NewUser() {
  const imePrezimeRef = useRef("");
  const emailRef = useRef("");
  const opravdaniRef = useRef("");
  const neopravdaniRef = useRef("");
  const permisijaRef = useRef("");
  const predmet1Ref = useRef("");
  const predmet2Ref = useRef("");
  const predmet3Ref = useRef("");
  const predmet4Ref = useRef("");
  const predmet5Ref = useRef("");
  const vladanjeRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const predmet1 = predmet1Ref.current.value + ",";
    const predmet2 = predmet2Ref.current.value + ",";
    const predmet3 = predmet3Ref.current.value + ",";
    const predmet4 = predmet4Ref.current.value + ",";
    const predmet5 = predmet5Ref.current.value + ",";
    const ocjene = [predmet1, predmet2, predmet3, predmet4, predmet5];
    let emailInput = emailRef.current.value;
    let passwordInput = passwordRef.current.value;

    console.log(passwordRef.current.value);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApi8lyZo32hpuecVE7PCXW7UgLBRTSEoI",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
          console.log("succes");
          createDoc(
            {
              Ime_Prezime: imePrezimeRef.current.value,
              Izostanci_Opravdani: opravdaniRef.current.value,
              Izostanci_nepravdani: neopravdaniRef.current.value,
              Permisija: permisijaRef.current.value,
              Predmeti_Ocjene: ocjene,
              vladanje: vladanjeRef.current.value,
              email: emailRef.current.value,
            },
            emailRef.current.value
          );
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentification failed";
            console.log(data);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="Ime i Prezime"
                  inputRef={imePrezimeRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Adresa"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Lozinka"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Opravdani Izostanci"
                  inputRef={opravdaniRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Neopravdani Izostanci"
                  inputRef={neopravdaniRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Permisija"
                  inputRef={permisijaRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Predmet br 1."
                  inputRef={predmet1Ref}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Predmet br 2."
                  inputRef={predmet2Ref}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Predmet br 3."
                  inputRef={predmet3Ref}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Predmet br 4."
                  inputRef={predmet4Ref}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Predmet br 5."
                  inputRef={predmet5Ref}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Vladanje"
                  inputRef={vladanjeRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
