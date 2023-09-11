import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slices/counter/counterSlice"
import themeReducer from "./slices/theme/themeSlice"
import gameReducer from "./slices/game/gameSlice"
import playersReducer from "./slices/players/playersSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    game: gameReducer,
    players: playersReducer
  }
})

export default store
