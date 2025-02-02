/* Login page */

import React, { useState } from 'react';
import Timer from './components/timer';
import { getPrompt, getInsult } from './utils/index';
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
    const [promptValue, setPromptValue] = useState('');
    const [insultValue, setInsultValue] = useState('I\'m a nice kitty, meow.');
    const [timeoutID, setTimeoutID] = useState(null);

    const handleChange = (e) => {
      const userInput = e.target.value;
      setInputValue(userInput);
      if (userInput === promptValue) {
        setButtonRole('button-enabled');
        setInputEnabled(false);
        setShowPrompt(false);
        setShowTimer(false);
        setInsultValue('purrr');
        setShowInsult(true);
        setInputValue('');
        clearTimeout(timeoutID);
      }
    };

    const handleClick = () => {
      setButtonRole('button-disabled');
      setPromptValue(getPrompt());
      setInputEnabled(true);
      setShowInsult(false);
      setShowPrompt(true);
      setShowTimer(true);
      
      const tID = setTimeout(() => {
        setButtonRole('button-enabled');
        setInputEnabled(false);
        setInputValue('');
        setShowPrompt(false);
        setShowTimer(false);
        setInsultValue(getInsult());
        setShowInsult(true);
      }, 5000);
      setTimeoutID(tID);
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
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h3">
              Mean Kitty
            </Typography>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              A dark and offensive typing game
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <img 
                src={ `/images/cat-face-2.png` }
                alt={ "Face of a cat" }
                style={{ width: '100%' }}
              />
              { showTimer
                ?<Box role="timer">
                  <Timer startingSeconds={ 5 } />
                </Box>
                :<></>
              }
              { showInsult ? <Typography role="insult" sx={{ my: 2 }}>Kitty says: { insultValue }</Typography> : <></> }
              { showPrompt ? <Typography role="prompt" sx={{ my: 2 }}>Type this: { promptValue }</Typography> : <></> }
              <TextField
                margin="normal"
                fullWidth
                id="typing-area"
                label="Type fast, bish"
                name="typing-area"
                value={ inputValue }
                onChange={ (e) => handleChange(e) }
                inputRef={input => input && input.focus()}
                disabled={ !inputEnabled }
              />
              <Button 
                variant="contained" 
                disabled={ buttonRole === 'button-enabled' ? false : true } 
                role={ buttonRole } 
                onClick={ handleClick }
              >
                Pet the kitty
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    )
  };
  
  export default MeanKitty;