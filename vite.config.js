import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  base: "/tic-tac-toe/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/")
    }
  }
})
