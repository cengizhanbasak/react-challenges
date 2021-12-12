import React, { useCallback, useEffect, useState } from 'react';

const boardInitial = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(Math.random() < 0.5 ? 'X' : 'O');
  const [board, setBoard] = useState<(('X' | 'O' | '')[])[]>(JSON.parse(JSON.stringify(boardInitial)));
  const [winner, setWinner] = useState<'X' | 'O' | ''>('');
  const [plays, setPlays] = useState(0);

  const handleWinner = useCallback((winner: 'X' | 'O' | '') => {
    if (winner === '') return;
    setWinner(winner);
    setTimeout(() => {
      setWinner('');
      setBoard(JSON.parse(JSON.stringify(boardInitial)));
      setPlays(0);
    }, 3000);
  }, []);

  const checkWinner = useCallback(() => {
    // diagonals
    if (((board[0][0] === board[1][1]) && (board[0][0] === board[2][2])) ||
    ((board[0][2] === board[1][1]) && (board[2][0] === board[1][1]))) {
      handleWinner(board[1][1]);
    }
    // horizontal
    for(let i = 0; i < 3; i++) {
      if ((board[i][0] === board[i][1]) && (board[i][0] === board[i][2])) {
        handleWinner(board[i][0]);
      }
    }
    // vertical
    for(let i = 0; i < 3; i++) {
      if ((board[0][i] === board[1][i]) && (board[0][i] === board[2][i])) {
        handleWinner(board[0][i]);
      }
    }
  }, [board, handleWinner]);

  const play = useCallback((i, j) => {
    if (board[i][j] === '') {
      const newBoard = JSON.parse(JSON.stringify(board))
      newBoard[i][j] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
    setPlays(plays+1);
  }, [board, currentPlayer, plays]);

  useEffect(() => {
    checkWinner();
  }, [checkWinner]);

  useEffect(() => {
    if (plays === 9 && winner === '') {
      setPlays(0);
      setTimeout(() => setBoard(JSON.parse(JSON.stringify(boardInitial))), 1000);
    }
  }, [plays, winner])

  return (
      <div>
        {winner === '' ? (
          <div>Current player: {currentPlayer}</div>
        ) : (
          <div>Winner: {winner}</div>
        )}
        <div className="board">
          <table>
            {board.map((row, i)=> (
              <tr>
                {row.map((col, j) => (
                  <td onClick={() => play(i,j)}>{col}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
  );
}

export default TicTacToe;
