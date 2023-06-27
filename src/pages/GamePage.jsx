import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Link } from "@mui/material"

function GamePage() {
  return (
    <Link to="/settings" component={RouterLink}>
      Settings
    </Link>
  )
}

export default GamePage
