/* A timer component that accepts an integer and counts down to zero */

import React, { useState, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Typography,
    Container
  } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: indigo
    }
});

const Timer = ({ startingSeconds }) => {
    const [secondsLeft, setSecondsLeft] = useState(startingSeconds);

    useEffect(() => {
        if (secondsLeft > 0) {
            setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000)
        }
    }, [secondsLeft]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ border: 1, borderRadius: '50%', borderColor: 'gray', width: '50px', backgroundColor: '#222222', textAlign: 'center' }}>
                    <Typography paragraph variant="h4" sx={{ color: 'white' }}>{ secondsLeft }</Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Timer;