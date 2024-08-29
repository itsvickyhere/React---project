// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Light blue shade for primary elements
    },
    secondary: {
      main: '#0d47a1', // Darker blue for secondary elements
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#0d47a1',
    },
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    },
  },
  shape: {
    borderRadius: 10, // Rounded corners for all components
  },
});

export default theme;
