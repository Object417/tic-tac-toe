import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Link,
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Button
} from "@mui/material"
import NavigationBar from "@/components/NavigationBar"
import { useDispatch, useSelector } from "react-redux"
import { playersSelector } from "@/store/slices/players/playersSelector"
import { ExpandMore } from "@mui/icons-material"
import {
  setColorAvailability,
  updatePlayer
} from "@/store/slices/players/playersSlice"
import PlayerSettings from "@/components/PlayerSettings"
import RulesSettings from "@/components/RulesSettings"

function SettingsPage() {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [fields, setFields] = useState([])
  const { players, colors, icons } = useSelector(playersSelector)

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <Box component="main">
      <Container sx={{ maxWidth: "768px !important" }}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Players</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {players.map((player) => (
                  <PlayerSettings key={player.id} player={player} />
                ))}
                <Button disabled={players.length >= icons.length}>
                  Add player
                </Button>
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Rules</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RulesSettings />
              </AccordionDetails>
            </Accordion>
          </Box>
        </form>
      </Container>
    </Box>
  )
}

export default SettingsPage
