import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, Container, Box, TextField, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
    },
  },
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  async function generateAnswer() {
    if (!searchQuery) {
      setGeneratedText('Please enter a query.');
      return;
    }

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAw8-oESSJ2RoUoeZ7okIj-J9M3R8IdFQQ",
        method: "post",
        data: {
          contents: [{ parts: [{ text: searchQuery }] }],
        },
      });
      setGeneratedText(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating text:", error);
      setGeneratedText('Error generating text.');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#fff' }}>
            <Typography variant="h4" gutterBottom>Chat AI</Typography>
            <TextField
              label="Enter your query"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={generateAnswer}>
              Generate Answer
            </Button>
            {generatedText && (
              <Box mt={3}>
                <Typography variant="body1" style={{ color: '#333' }}>{generatedText}</Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
