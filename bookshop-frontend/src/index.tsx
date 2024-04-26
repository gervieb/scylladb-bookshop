import React from "react";
import ReactDOM from "react-dom/client";
import "src/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "src/redux/store";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { styled } from "@mui/material";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#f3eeea",
    color: "#627254",
  },
}));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={1500}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          Components={{
            success: StyledMaterialDesignContent,
          }}
        >
          <App />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
