import { Button, Typography } from "@mui/material"
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { counterSelector } from "@/store/slices/counter/counterSelector"
import { increment, decrement } from "@/store/slices/counter/counterSlice"

function CounterControls() {
  const counter = useSelector(counterSelector)
  const dispatch = useDispatch()

  return (
    <>
      <Typography>{counter}</Typography>
      <Button
        sx={{ mr: 1 }}
        variant="contained"
        onClick={() => dispatch(increment(2))}
      >
        +2
      </Button>
      <Button variant="contained" onClick={() => dispatch(decrement())}>
        -1
      </Button>
    </>
  )
}

export default CounterControls
