import { sum } from "lodash";
import { GameBoardConfig, IntermediateTileData, TileData } from "../types";
import { initBoard } from "./utils";

/**
 *
 * @param intermediateBoard
 * @returns
 */
export const mergeTiles = (
  intermediateBoard: IntermediateTileData[][],
  config: GameBoardConfig,
): {
  board: TileData[][];
  merged: { [key in number]: number };
  score: number;
} => {
  let moveScore = 0;
  const merged: { [key in number]: number } = {};
  const newBoard = initBoard(config);
  for (let row = 0; row < config.numRows; row++) {
    for (let col = 0; col < config.numCols; col++) {
      const tiles = intermediateBoard[row][col].tiles.filter(
        (tile) => tile.value > 0
      );

      const totalValue = sum(tiles.map((t) => t.value));

      if (tiles.length >= 1) {
        newBoard[row][col].id = tiles[0].id;
        newBoard[row][col].value = totalValue;
      }
      if (tiles.length > 1) {
        moveScore += totalValue;
        if (!merged[totalValue]) {
          merged[totalValue] = 0;
        }
        merged[totalValue] = merged[totalValue] + 1;
        newBoard[row][col].isMerge = true;
      }
    }
  }

  return {
    board: newBoard,
    merged,
    score: moveScore,
  };
};
