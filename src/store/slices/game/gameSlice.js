import { createSlice } from "@reduxjs/toolkit"

/* 
  Cell: {
    x: x > 0 && x < field.cols,
    y: y > 0 && y < field.rows,
    value: player.value
  }
*/

const gameSlice = createSlice({
  name: "game",
  initialState: {
    field: {
      cols: 3,
      rows: 3
    },
    cells: [],
    winCombo: 3
  },
  reducers: {
    setWinCombo(state, { payload }) {
      state.winCombo = payload
    },
    setFieldSizes(state, { payload }) {
      state.field.cols = payload.cols
      state.field.rows = payload.rows
    },
    setCells(state, { payload }) {
      state.cells = payload
    }
  }
})

export const { setWinCombo, setFieldSizes, setCells } = gameSlice.actions
export default gameSlice.reducer
