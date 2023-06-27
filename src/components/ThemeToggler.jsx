import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleThemeMode } from "@/store/slices/theme/themeSlice"
import { themeSelector } from "@/store/slices/theme/themeSelector"
import { Button } from "@mui/material"

function ThemeToggler() {
  const dispatch = useDispatch()
  const { mode } = useSelector(themeSelector)

  return <Button onClick={() => dispatch(toggleThemeMode())}>{mode}</Button>
}

export default ThemeToggler
