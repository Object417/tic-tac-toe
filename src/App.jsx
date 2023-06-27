import React from "react"
import { Provider as StoreProvider } from "react-redux"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import NotFoundPage from "./pages/NotFoundPage"
import GamePage from "./pages/GamePage"
import SettingsPage from "./pages/SettingsPage"

import DefaultLayout from "./components/DefaultLayout"
import ThemeProviderWrapper from "./components/ThemeProviderWrapper"

import store from "./store/store"

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProviderWrapper>
        <BrowserRouter basename="/tic-tac-toe">
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/game" element={<GamePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/"
                element={<Navigate to="/settings" replace={true} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProviderWrapper>
    </StoreProvider>
  )
}

export default App
