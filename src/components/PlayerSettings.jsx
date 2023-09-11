import React from "react"
import {
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  IconButton,
  Tooltip
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { playersSelector } from "@/store/slices/players/playersSelector"
import {
  setColorAvailability,
  setIconAvailability,
  updatePlayer
} from "@/store/slices/players/playersSlice"
import iconsTable from "@/store/slices/players/iconsTable"
import { Delete } from "@mui/icons-material"

function PlayerSettings({ player }) {
  const dispatch = useDispatch()
  const { colors, icons, players } = useSelector(playersSelector)

  function handleColorChange(e, player) {
    const newColor = e.target.value

    if (newColor === player.color) {
      return
    }

    dispatch(setColorAvailability({ color: player.color, available: true }))
    dispatch(setColorAvailability({ color: newColor, available: false }))
    dispatch(updatePlayer({ ...player, color: newColor }))
  }

  function handleIconChange(e) {
    const newIcon = e.target.value

    if (newIcon === player.icon) {
      return
    }

    dispatch(setIconAvailability({ icon: player.icon, available: true }))
    dispatch(setIconAvailability({ icon: newIcon, available: false }))
    dispatch(updatePlayer({ ...player, icon: newIcon }))
  }

  function handleNameChange(e) {
    dispatch(updatePlayer({ ...player, name: e.target.value }))
  }

  return (
    <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel>Icon</InputLabel>
        <Select
          value={player.icon}
          label="Icon"
          autoWidth
          onChange={handleIconChange}
        >
          {icons.map((icon) => (
            <MenuItem
              key={icon.name}
              value={icon.name}
              disabled={!icon.available}
            >
              <img src={iconsTable[icon.name]} width={36} height={36} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel>Color</InputLabel>
        <Select
          value={player.color}
          label="Color"
          autoWidth
          onChange={(e) => handleColorChange(e, player)}
        >
          {colors.map((color) => (
            <MenuItem
              key={color.name}
              value={color.name}
              disabled={!color.available}
            >
              <Box
                sx={{
                  borderRadius: "50rem",
                  bgcolor: color.name,
                  width: "36px",
                  height: "36px"
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Name" value={player.name} onChange={handleNameChange} />

      <Tooltip
        arrow
        title={
          players.length < 3
            ? "At least 2 players are required"
            : "Delete player"
        }
      >
        <Box component="span" sx={{ ml: "auto" }}>
          <IconButton disabled={players.length < 3}>
            <Delete />
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  )
}

export default PlayerSettings
