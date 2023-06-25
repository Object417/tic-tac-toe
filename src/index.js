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

function testForVictory(checkedCells, cell, player, score, relation) {
  let x = cell.x
  let y = cell.y

  ;[
    { x: x - 1, y: y, relation: "h" },
    { x: x + 1, y: y, relation: "h" },
    { x: x, y: y + 1, relation: "v" },
    { x: x, y: y - 1, relation: "v" },
    { x: x + 1, y: y + 1, relation: "ld" },
    { x: x - 1, y: y - 1, relation: "ld" },
    { x: x - 1, y: y + 1, relation: "rd" },
    { x: x + 1, y: y - 1, relation: "rd" }
  ].forEach((el) => {
    const nearbyCell = getCellByCoordinates(el.x, el.y)

    if (
      nearbyCell === undefined ||
      nearbyCell.val !== player.val ||
      checkedCells.includes(nearbyCell.id) ||
      (relation && el.relation !== relation)
    ) {
      return
    }

    score[el.relation] += 1
    checkedCells.push(cell.id)

    if (
      score.h === SCORE_FOR_VICTORY ||
      score.v === SCORE_FOR_VICTORY ||
      score.rd === SCORE_FOR_VICTORY ||
      score.ld === SCORE_FOR_VICTORY
    ) {
      return
    }

    testForVictory(checkedCells, nearbyCell, player, score, el.relation)
  })
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

  const score = { h: 1, v: 1, rd: 1, ld: 1 }

  testForVictory([cell.id], cell, player, score)

  if (
    score.h === SCORE_FOR_VICTORY ||
    score.v === SCORE_FOR_VICTORY ||
    score.rd === SCORE_FOR_VICTORY ||
    score.ld === SCORE_FOR_VICTORY
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
