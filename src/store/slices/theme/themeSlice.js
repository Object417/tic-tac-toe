import { createSlice } from "@reduxjs/toolkit"

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" },
  reducers: {
    toggleThemeMode(state, { payload }) {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setThemeMode(state, { payload }) {
      state.mode = payload
    }
  }
})

export const { toggleThemeMode, setThemeMode } = themeSlice.actions
export default themeSlice.reducer
