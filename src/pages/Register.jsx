import {
  TableRow, Grid, TableContainer, TableHead, TableCell, Paper, Table, TableBody,
  TextField, Stack, Button, Checkbox, FormControlLabel, FormGroup, Typography, InputLabel, OutlinedInput,
  InputAdornment, IconButton
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === cPassword) {
      try {
        const res = await axios.post(`https://todoapi-aj2q.onrender.com/auth/register`, {
          userName,
          password
        });
        alert(res.data.message);
        setUserName("");
        setPassword("");
        setCPassword("");
        nav("/login");

        localStorage.setItem("token", res.data.token);
      }
      catch (err) {
        if(err.status == 400){
          alert("User already exists!")
        }
        console.log(err);
      }
    }
    else {
      alert("Password missmatch?")
    }
  }


  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        <Grid size={12} sx={{ maxWidth: "500px", margin: "auto" }} >
          <Stack direction="column" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3" align="center" sx={{ textAlign: "center" }}>SignUp</Typography>

            <Grid >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid size={12}>
                    <Stack sx={{ gap: 1 }}>
                      <InputLabel htmlFor="email-login">User Address</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="text"
                        required
                        value={userName}
                        name="email"
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter user address"
                        fullWidth
                      />
                    </Stack>
                  </Grid>
                  <Grid size={12}>
                    <Stack sx={{ gap: 1 }}>
                      <InputLabel htmlFor="password-login1">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="-password-login1"
                        value={password}
                        name="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </Stack>
                  </Grid>
                  <Grid size={12}>
                    <Stack sx={{ gap: 1 }}>
                      <InputLabel htmlFor="password-login2">Password</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="-password-login2"
                        value={cPassword}
                        name="password"
                        required
                        onChange={(e) => setCPassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </Stack>
                  </Grid>

                  <Grid size={12}>
                    <Button fullWidth size="large" variant="contained" color="primary" type='submit'>
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

            <Typography component={Link} to={'/login'} variant="body1" sx={{ textDecoration: 'none', marginTop: "10px" }} color="primary">
              I have an account?
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default Register