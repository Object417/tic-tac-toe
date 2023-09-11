import { gameSelector } from "@/store/slices/game/gameSelector"
import {
  FormControl,
  Slider,
  TextField,
  Typography,
  Box,
  Alert
} from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"

function RulesSettings() {
  const {
    field: { cols, rows },
    winCombo
  } = useSelector(gameSelector)

  return (
    <>
      <Alert severity="warning">
        Changing these values will restart the game
      </Alert>
      <FormControl fullWidth>
        <Typography>Rows</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField value={rows} type="number" />
          <Slider marks value={rows} max={50} valueLabelDisplay="auto" />
        </Box>
      </FormControl>
    </>
  )
}

export default RulesSettings
