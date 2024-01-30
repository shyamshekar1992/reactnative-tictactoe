import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [player1Symbol, setPlayer1Symbol] = useState('X');
  const [player2Symbol, setPlayer2Symbol] = useState('O');

  const handlePress = (index) => {
    if (board[index] || winner) {
      // If the square is already filled or there's a winner, do nothing
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isPlayerX ? player1Symbol : player2Symbol;
    setBoard(newBoard);

    // Check for a winner after each move
    checkWinner(newBoard);
    setIsPlayerX(!isPlayerX);
  };

  const checkWinner = (currentBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return;
      }
    }

    // Check for a tie
    if (!currentBoard.includes(null)) {
      setWinner('Tie');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerX(true);
    setWinner(null);
  };

  const renderSquare = (index) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => handlePress(index)}
      disabled={winner !== null}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const renderStatus = () => {
    if (winner) {
      return winner === 'Tie' ? "It's a Tie!" : `${winner} wins!`;
    } else {
      return `Next player: ${isPlayerX ? 'Player 1' : 'Player 2'} (${
        isPlayerX ? player1Symbol : player2Symbol
      })`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tic-Tac-Toe</Text>

      <View style={styles.symbolSelection}>
        <View>
          <Text>Player 1 chooses:</Text>
          <Button
            title="X"
            onPress={() => {
              setPlayer1Symbol('X');
              setPlayer2Symbol('O');
            }}
            disabled={winner !== null}
          />
        </View>
        <View>
          <Text>Player 2 chooses:</Text>
          <Button
            title="O"
            onPress={() => {
              setPlayer1Symbol('O');
              setPlayer2Symbol('X');
            }}
            disabled={winner !== null}
          />
        </View>
      </View>

      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Text style={styles.status}>{renderStatus()}</Text>

      {winner && (
        <TouchableOpacity style={styles.refreshButton} onPress={resetGame}>
          <Text>Refresh Game</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Developed and Designed by Shyam © {new Date().getFullYear()}
        </Text>
        <Text style={styles.footerText}>&#x2122; All Rights Reserved</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  symbolSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  refreshButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#5cb85c',
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});
