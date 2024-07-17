/* Login page */

import React, { useState } from 'react';
import {
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import Countdown from 'react-countdown';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://jonathan-woodruff.github.io/">
        Jonathan Woodruff
      </Link>{' '} 
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: indigo
  }
});

const MeanKitty = () => {
    const [values, setValues] = useState({
      email: '',
      password: ''
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //check if the user signed up. If so, show the snackbar and update local storage so the snackbar won't show again upon page refresh
    const justSignedUp = localStorage.getItem('justSignedUp');
    const [openSnack, setOpenSnack] = useState(justSignedUp && JSON.parse(justSignedUp) === true ? true : false);
    localStorage.removeItem('justSignedUp');

    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value});
      setEmailError('');
      setPasswordError('');
    };

    const handleClose = () => {
      setOpenSnack(false);
    };

    //helper function to make a field show it is in an error state
    const showError = errorMessage => {
      const regMessage = errorMessage.toLowerCase();
      const regEmail = /email/;
      let reArray = regEmail.exec(regMessage);
      if (reArray !== null) { //errorMessage contains email
        setEmailError(errorMessage);
        return;
      }
      const regPassword = /password/;
      reArray = regPassword.exec(regMessage);
      if (reArray !== null) { //errorMessage contains password
        setPasswordError(errorMessage);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setEmailError('');
      setPasswordError('');
      try {
        localStorage.setItem('isAuth', 'true');
      } catch(error) {
        const errorMessage = error.response.data.errors[0].msg; //error from axios
        showError(errorMessage);
      }
    };

    const renderer = ({ seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <span>{'hi'}</span>
      } else {
        // Render a countdown
        return <span>{seconds}</span>;
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h2">
              Mean Kitty
            </Typography>
            <Box component="form" onSubmit={ (e) => handleSubmit(e) } noValidate sx={{ mt: 1 }}>
              <img 
                src={ `/images/cat-face-2.png` }
                alt={ "Face of a cat" }
                style={{ width: '100%' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="typing-area"
                label="Type what Mean Kitty says before the time runs out!"
                name="typing-area"
                value={ 'hi' }
                onChange={ (e) => handleChange(e) }
                autoFocus
              />
              <Countdown 
                date={Date.now() + 10000} 
                renderer={ renderer }
              />
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
  };
  
  export default MeanKitty;