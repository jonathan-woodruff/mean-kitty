/* Login page */

import React, { useState } from 'react';
import {
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Button
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
    const [showInsult, setShowInsult] = useState(true);
    const [buttonRole, setButtonRole] = useState('button-enabled');
    const [showPrompt, setShowPrompt] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [inputEnabled, setInputEnabled] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [promptValue, setPromptValue] = useState('prompt bishhhhh');
    const [insultValue, setInsultValue] = useState('offensive insult');

    const handleChange = (e) => {
      const userInput = e.target.value;
      setInputValue(userInput);
      if (userInput === promptValue) {
        setButtonRole('button-enabled');
        setShowPrompt(false);
        setShowTimer(false);
        setInsultValue('purrr');
        setShowInsult(true);
      }
    };

    const handleClick = () => {
      setButtonRole('button-disabled');
      setShowInsult(false);
      setShowPrompt(true);
      setShowTimer(true);

      setTimeout(() => {
        setButtonRole('button-enabled');
        setShowPrompt(false);
        setShowTimer(false);
        setShowInsult(true);
      }, 5000)
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <img 
                src={ `/images/cat-face-2.png` }
                alt={ "Face of a cat" }
                style={{ width: '100%' }}
              />
              { showInsult ? <Typography role="insult">{ insultValue }</Typography> : <></> }
              { showPrompt ? <Typography role="prompt">{ promptValue }</Typography> : <></> }
              { showTimer
                ?<Box role="timer">
                  <Countdown 
                    date={Date.now() + 5000} 
                    renderer={ renderer }
                  />
                </Box>
                :<></>
              }
              <TextField
                margin="normal"
                required
                fullWidth
                id="typing-area"
                label="Type what Mean Kitty says before the time runs out!"
                name="typing-area"
                value={ inputValue }
                onChange={ (e) => handleChange(e) }
                autoFocus
                disabled={ !inputEnabled }
              />
              <Button variant="contained" disabled={ buttonRole === 'button-enabled' ? false : true } role={ buttonRole } onClick={ handleClick }>Pet the kitty</Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
  };
  
  export default MeanKitty;