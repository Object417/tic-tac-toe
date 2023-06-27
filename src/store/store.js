import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slices/counter/counterSlice"
import themeReducer from "./slices/theme/themeSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer
  }
})

export default store
