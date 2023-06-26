import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment(state, { payload }) {
      return typeof payload === "number" ? state + payload : state + 1
    },
    decrement(state, { payload }) {
      return typeof payload === "number" ? state - payload : state - 1
    }
  }
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
