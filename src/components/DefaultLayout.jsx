import React from "react"
import { CssBaseline } from "@mui/material"
import { Outlet } from "react-router-dom"
import NavigationBar from "./NavigationBar"

function DefaultLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <CssBaseline />
    </>
  )
}

export default DefaultLayout
