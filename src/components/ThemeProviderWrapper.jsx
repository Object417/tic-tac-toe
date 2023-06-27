import React from "react"
import themes from "@/store/slices/theme/themes"
import { themeSelector } from "@/store/slices/theme/themeSelector"
import { useSelector } from "react-redux"
import { ThemeProvider } from "@mui/material"

function ThemeProviderWrapper({ children }) {
  const { mode } = useSelector(themeSelector)
  const theme = themes[mode]

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderWrapper
