import { Tab, Tabs } from "@mui/material"
import React from "react"
import { useLocation } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"

function NavigationBar() {
  const location = useLocation()

  return (
    <Tabs value={location.pathname} centered>
      <Tab
        value="/settings"
        to="/settings"
        component={RouterLink}
        label="Settings"
      />
      <Tab value="/game" to="/game" component={RouterLink} label="Game" />
    </Tabs>
  )
}

export default NavigationBar
