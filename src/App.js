import './App.css';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import Main from './pages/Main';
import MainBar from './components/MainBar';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainBar />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
