
'use client';
import React, { useState, useEffect } from 'react';
import styles from './puzzle.module.css';

const PuzzleGame: React.FC = () => {
  const [tiles, setTiles] = useState<(string | null)[]>([]);
  const [emptyTileIndex, setEmptyTileIndex] = useState<number | null>(null);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const alphabets = 'ABCDEFGHIJKLMNO'.split(''); // Alphabet tiles
    let initialTiles = alphabets.concat([null]); // Add the empty tile
    initialTiles = shuffleTiles(initialTiles);
    setTiles(initialTiles);
    setEmptyTileIndex(initialTiles.indexOf(null));
  };

  const shuffleTiles = (array: (string | null)[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const canMoveTile = (index: number) => {
    if (emptyTileIndex === null) return false;
    const rowDiff = Math.abs(Math.floor(index / 4) - Math.floor(emptyTileIndex / 4));
    const colDiff = Math.abs(index % 4 - emptyTileIndex % 4);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  };

  //     if (canMove) {
//       const newImages = [...images];
//       newImages[blankIndex] = newImages[index];
//       newImages[index] = null;
//       setImages(newImages);
//     }
//   };

  const moveTile = (index: number) => {
    if (canMoveTile(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyTileIndex!]] = [newTiles[emptyTileIndex!], newTiles[index]];
      setTiles(newTiles);
      setEmptyTileIndex(index);
    }
  };

  const checkPuzzleSolved = () => {
    const correctTiles = 'ABCDEFGHIJKLMNO'.split('').concat([null]);
    return JSON.stringify(tiles) === JSON.stringify(correctTiles);
  };

  return (
    <div className={styles.puzzleContainer}>
      <h1 className={styles.title}>Puzzle Game</h1>

      <div className={styles.grid}>
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={tile === null ? styles.emptyTile : styles.tile}
            onClick={() => moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      {checkPuzzleSolved() && <p className={styles.solvedMessage}>Puzzle Solved!</p>}
      <button onClick={initGame} className={styles.resetButton}>Reset</button>
    </div>
  );
};

export default PuzzleGame;



