import React from "react";
import { BrowserRouter} from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { rtlCache } from "./components/rtlCatch";
import { CacheProvider } from "@emotion/react";
import { STORE } from './redux/store';

// Styles
import "./components/design.css";
import theme from "./components/theme.jsx";
import { Routing } from "./components/routing.jsx";

function App() {
  return (
    <CacheProvider value={rtlCache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={STORE}>
            <BrowserRouter>
              <Routing></Routing>
            </BrowserRouter>
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default App;
