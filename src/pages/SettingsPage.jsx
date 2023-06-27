import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"

function SettingsPage() {
  return (
    <Link to="/game" component={RouterLink}>
      Play
    </Link>
  )
}

export default SettingsPage
