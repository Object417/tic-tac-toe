import { createSlice } from "@reduxjs/toolkit"

/* 
  Player: {
    id: Number,
    name: "unique",
    icon: "ref name, unique",
    color: "unique color",
    score: Number
  }
*/

const playersSlice = createSlice({
  name: "players",
  initialState: {
    players: [
      {
        id: 1,
        name: "Player 1",
        icon: "xmark",
        color: "#42a5f5",
        score: 0
      },
      {
        id: 2,
        name: "Player 2",
        icon: "omark",
        color: "#ef5350",
        score: 0
      }
    ],
    colors: [
      { /* blue */ name: "#42a5f5", available: false },
      { /* violet */ name: "#ba68c8", available: true },
      { /* red */ name: "#ef5350", available: false },
      { /* orange */ name: "#ff9800", available: true },
      { /* brown */ name: "#795548", available: true },
      { /* green */ name: "#4caf50", available: true }
    ],
    icons: [
      { name: "xmark", available: false },
      { name: "omark", available: false },
      { name: "spade", available: true },
      { name: "heart", available: true },
      { name: "club", available: true },
      { name: "diamond", available: true }
    ]
  },
  reducers: {
    addPlayer(state, { payload }) {
      state.players.push(payload)
    },
    removePlayer(state, { payload }) {
      state.players.filter((player) => player.id === payload)
    },
    updatePlayer(state, { payload }) {
      const index = state.players.findIndex(
        (player) => player.id === payload.id
      )
      state.players[index] = payload
    },
    setColorAvailability(state, { payload }) {
      state.colors.find((color) => color.name === payload.color).available =
        payload.available
    },
    setIconAvailability(state, { payload }) {
      state.icons.find((icon) => icon.name === payload.icon).available =
        payload.available
    }
  }
})

export const {
  addPlayer,
  removePlayer,
  updatePlayer,
  setColorAvailability,
  setIconAvailability
} = playersSlice.actions
export default playersSlice.reducer
