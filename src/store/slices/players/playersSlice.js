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
  initialState: [],
  reducers: {
    addPlayer(state, { payload }) {
      state.push(payload)
    },
    removePlayer(state, { payload }) {
      state.filter((player) => player.id === payload)
    },
    updatePlayer(state, { payload }) {
      const index = state.findIndex((player) => player.id === payload.id)
      state[index] = payload
    }
  }
})

export const { addPlayer, removePlayer, updatePlayer } = playersSlice.actions
export default playersSlice.reducer
