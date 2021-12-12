import { createTheme } from '@mui/material/styles';
import { colors } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.blue[700],
      contrastText: '#fff'
    },
    secondary: {
      main: colors.green[700],
      contrastText: '#000'
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.blueGrey[500]
    }
  },
  typography: {
    h6: {
      fontWeight: 500
    }
  }
});

export default theme;
