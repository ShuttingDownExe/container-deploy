import './index.css'
import xIcon from './assets/X.svg'
import oIcon from './assets/O.svg'
import { useState, useEffect } from 'react'


const Tile = ({value,enabled, onClick}) => {
  const icon = value === 'X' ? xIcon : value === 'O' ? oIcon : null

  return (
    <div className="grid-item">
      <button disabled={!enabled} onClick={onClick}>
        {icon ? <img src={icon} alt={value} className={value === 'X' ? 'x-tile-icon' : 'o-tile-icon'} /> : null}
      </button>
    </div>
  )
}

const checkWinner = (board) => {
  const winners = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  for (const [a,b,c] of winners){
    if(board[a]  && board[a] === board[b] && board[a] === board[c]){
      return board[a]
    }
  }
  return null
}

const Grid = () => {
  const players = ['X', 'O']
  const [xScore, setXScore] = useState(0)
  const [oScore, setOScore] = useState(0)
  const [board, setBoard] = useState([null,null,null,null,null,null,null,null,null])
  const [turn, setTurn] = useState(players[Math.floor(Math.random() * 2)])
  const winner = checkWinner(board)
  const isDraw = board.every(cell => cell !== null) && winner === null
  const status = winner ? `Winner: ${winner}` : isDraw ? 'Draw' : `Current player: ${turn}`

  useEffect(() => {
    if (winner === 'X') {
      setXScore(prev => prev + 1)
    } else if (winner === 'O') {
      setOScore(prev => prev + 1)
    }
  }, [winner])

  const handleClick = (i) => {
    if (board[i] == null && winner == null && !isDraw){
      const newBoard = [...board]
      newBoard[i] = turn
      setBoard(newBoard)
      setTurn(prev => prev === 'X' ? 'O' : 'X')
    }
  }

  const reset = () => {
    setBoard([null,null,null,null,null,null,null,null,null])
    setTurn(players[Math.floor(Math.random() * 2)])
  }

  return (
    <div className="game">
      <div className="board">
        <div className="grid-container">
          {board.map((cellValue, i) => (
            <Tile
              key={i}
              value={cellValue}
              enabled={cellValue === null && !winner && !isDraw}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
        <div className="horiz h1" />
        <div className="horiz h2" />
      </div>
      <div className="controls">
        <p className="status">{status}</p>
        <button className="reset" onClick={reset}>reset</button>
      </div>
      <div className="scores">
        <p className="score-label">X Wins</p>
        <p className="score">{xScore}</p>
        <p className="score-label">O Wins</p>
        <p className="score">{oScore}</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <Grid/>
    </>
  )
}

export default App
