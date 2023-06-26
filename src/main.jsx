import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider as StoreProvider, useSelector } from "react-redux"
import { Typography, ThemeProvider, createTheme } from "@mui/material"
import store from "./store/store"
import CounterControls from "./components/CounterControls"

function ThemeWrapper({ children }) {
  // const theme = useSelector()
  const theme = createTheme({
    palette: {
      mode: "light"
    }
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const root = createRoot(document.getElementById("app"))
root.render(
  <StrictMode>
    <StoreProvider store={store}>
      <ThemeWrapper>
        <Typography>Hello, React!</Typography>
        <CounterControls />
      </ThemeWrapper>
    </StoreProvider>
  </StrictMode>
)
