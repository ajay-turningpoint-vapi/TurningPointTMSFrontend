import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router";
import { PersistGate } from "redux-persist/integration/react";
import { baselightTheme } from "./theme/DefaultColors";
import setAuthToken from "./utils/setAuthToken";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {routing}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
