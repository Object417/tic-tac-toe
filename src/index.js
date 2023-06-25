import "./styles/index.css"

// FIXME: Import SVG as a string and embed it as HTML...
// FIXME: There must a better way
import { xMarkSVG, oMarkSVG } from "./icons/icons.js"

const $board = document.getElementById("board")
const $playerMove = document.getElementById("playerMove")
const $btnRestart = document.getElementById("btnRestart")

// FIXME: Maybe, use indexes instead of ids
// FIXME: Or at least, object instead of array
const players = [
  { id: 0, val: "X", html: xMarkSVG },
  { id: 1, val: "O", html: oMarkSVG }
]

// Player with id = 0 goes first
let playerMove = 0
let moveNo = 0

let fieldSize = prompt("Field size (x, y)", "3, 3")
  .split(",")
  .map((el) => Number(el))
const SCORE_FOR_VICTORY = Number(prompt("Number of marks for victory", 3))

console.log(fieldSize)
console.log(SCORE_FOR_VICTORY)

let cells = createCells(...fieldSize)
function createCells(nOfRows, nOfCols) {
  const nOfCells = nOfRows * nOfCols

  $board.style.display = "grid"
  $board.style.gridTemplate = `repeat(${nOfRows}, 5rem) / repeat(${nOfCols}, 5rem)`

  return Array.from({ length: nOfCells }).map(($cell, index) => {
    $cell = document.createElement("div")
    $cell.classList.add("cell")
    $cell.setAttribute("id", "cell" + index)
    $board.append($cell)

    return {
      id: index,
      elem: $cell,
      val: null,
      x: index - Math.floor(index / nOfCols) * nOfCols,
      y: Math.floor(index / nOfCols)
    }
  })
}

console.log(cells)

function getCell(id) {
  return cells.find((cell) => cell.id === id)
}

function getCellByCoordinates(x, y) {
  return cells.find((cell) => cell.x === x && cell.y === y)
}

function setCellValue(cell, player) {
  // Do nothing if this cell is already taken
  if (cell.val) {
    return
  }

  cell.val = player.val
  cell.elem.innerHTML = player.html

  moveNo++
  playerMove++
  if (!getPlayer(playerMove)) {
    playerMove = 0
  }
  updateTitle(getPlayer(playerMove))
  if (moveNo >= fieldSize[0] * fieldSize[1]) {
    $playerMove.textContent = "Draw"
    $btnRestart.style.visibility = "visible"
    $btnRestart.toggleAttribute("disabled", false)
  }
}

function getPlayer(id) {
  return players.find((player) => player.id === id)
}

function updateTitle(player) {
  if (gameOver) {
    $playerMove.textContent = `Player ${player.val} has won`
  } else {
    $playerMove.textContent = `Player ${player.val} move`
  }
}

function setGameOver(gameOver, player) {
  if (!gameOver) {
    return
  }

  updateTitle(player)
  $btnRestart.style.visibility = "visible"
  $btnRestart.toggleAttribute("disabled", false)
}

function testForVictory(cellsToCheck, player, score) {
  const newCellsToCheck = []

  if (cellsToCheck.length === 0) {
    return
  }

  for (const { x, y, step, relation } of cellsToCheck) {
    const cell = getCellByCoordinates(x, y)

    if (cell !== undefined && cell.val === player.val) {
      score[relation].push(cell)

      if (score[relation].length >= SCORE_FOR_VICTORY) {
        for (const winCell of score[relation]) {
          winCell.elem.style.backgroundColor = "green"
        }
        return
      }

      // instead of this I can use relation object {
      //   name: "h" | "v" | "ld" | "rd",
      //   xMultiplier: 1,
      //   yMultiplier: 0,
      // }
      // newCellsToCheck.push({
      //   x: x + step * relation.xMultiplier,
      //   y: y + step * relation.yMultiplier
      // })
      // e.g., for horizontal, relation.yMultiplier is 0;
      // for right diagonal xMultiplier is 1, yMultiplier is -1
      if (relation === "h") {
        newCellsToCheck.push({
          x: x + step,
          y,
          step,
          relation
        })
      } else if (relation === "v") {
        newCellsToCheck.push({
          x,
          y: y + step,
          step,
          relation
        })
      } else if (relation === "ld") {
        newCellsToCheck.push({
          x: x + step,
          y: y + step,
          step,
          relation
        })
      } else if (relation === "rd") {
        newCellsToCheck.push({
          x: x + step,
          y: y - step,
          step,
          relation
        })
      }
    }
  }

  testForVictory(newCellsToCheck, player, score)
}

let gameOver = false
let playerWon = null

$board.onclick = (e) => {
  if (
    e.target === null ||
    e.target.closest(".cell") === null ||
    gameOver === true
  ) {
    return
  }
  const $cell = e.target.closest(".cell")
  const cellId = Number($cell.id.replace("cell", ""))
  const cell = getCell(cellId)

  const player = getPlayer(playerMove)
  setCellValue(cell, player)

  const score = { h: [cell], v: [cell], rd: [cell], ld: [cell] }
  const { x, y } = cell

  const cellsToCheck = [
    { x: x - 1, y: y, step: -1, relation: "h" },
    { x: x + 1, y: y, step: +1, relation: "h" },
    { x: x, y: y - 1, step: -1, relation: "v" },
    { x: x, y: y + 1, step: +1, relation: "v" },
    { x: x - 1, y: y - 1, step: -1, relation: "ld" },
    { x: x + 1, y: y + 1, step: +1, relation: "ld" },
    { x: x - 1, y: y + 1, step: -1, relation: "rd" },
    { x: x + 1, y: y - 1, step: +1, relation: "rd" }
  ]

  testForVictory(cellsToCheck, player, score)

  if (
    score.h.length >= SCORE_FOR_VICTORY ||
    score.v.length >= SCORE_FOR_VICTORY ||
    score.rd.length >= SCORE_FOR_VICTORY ||
    score.ld.length >= SCORE_FOR_VICTORY
  ) {
    gameOver = true
    playerWon = player
    setGameOver(gameOver, playerWon)
    return
  }
}

$btnRestart.onclick = () => {
  $board.innerHTML = ""
  cells = createCells(...fieldSize)
  gameOver = false
  playerMove = 0
  moveNo = 0
  updateTitle(getPlayer(playerMove))
  $btnRestart.style.visibility = "hidden"
  $btnRestart.toggleAttribute("disabled", true)
}
