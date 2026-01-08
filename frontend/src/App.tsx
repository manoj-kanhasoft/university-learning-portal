import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom';
import MySnackbar from "./components/snackbar";


import AppRoutes from "./routes";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <AppRoutes />
      <MySnackbar /> 
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
