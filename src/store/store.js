import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slices/counter/counterSlice"
import themeReducer from "./slices/theme/themeSlice"
import gameReducer from "./slices/game/gameSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    game: gameReducer
  }
})

export default store
