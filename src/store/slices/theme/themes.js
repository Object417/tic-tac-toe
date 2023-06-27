import { createTheme } from "@mui/material"

const themes = {}

const commonTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained"
      }
    }
  }
})

;["light", "dark"].forEach((mode) => {
  themes[mode] = createTheme(
    Object.assign({}, commonTheme, {
      palette: { mode }
    })
  )
})

export default themes
