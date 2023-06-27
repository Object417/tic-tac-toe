import React from "react"
import { CssBaseline } from "@mui/material"
import { Outlet } from "react-router-dom"

function DefaultLayout() {
  return (
    <>
      <Outlet />
      <CssBaseline />
    </>
  )
}

export default DefaultLayout
