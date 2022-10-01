import { TileData, MoveDirection, IntermediateTileData, GameBoardConfig } from "../types";
import { START_NUM_2, START_NUM_3 } from "./constants";
import { initIntermediateBoard } from "./utils";

/**
 *
 * @param board
 * @param dir
 * @returns
 */
export const moveTiles = (
  board: TileData[][],
  dir: MoveDirection,
  config: GameBoardConfig,
): {
  intermediateBoard: IntermediateTileData[][];
  moved: { rows: number[]; cols: number[] };
} => {
  const intermediateBoard: IntermediateTileData[][] = initIntermediateBoard(config);

  const movedRows = [];
  const movedCols = [];

  switch (dir) {
    case MoveDirection.LEFT:
      // Put all cells from the first column into the intermediate board
      for (let row = 0; row < config.numRows; row++) {
        intermediateBoard[row][0].tiles.push(board[row][0]);
      }

      // Combine or move all the cells to the left
      for (let row = 0; row < config.numRows; row++) {
        for (let col = 1; col < config.numCols; col++) {
          const cellValue = board[row][col];
          const leftCellValue = board[row][col - 1];

          if (canCombine(cellValue, leftCellValue)) {
            intermediateBoard[row][col - 1].tiles.push({ ...cellValue });
            if (board[row][col].value) {
              movedRows.push(row);
            }
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
    case MoveDirection.RIGHT:
      // Put all cells from the last column into the intermediate board
      for (let row = 0; row < config.numRows; row++) {
        intermediateBoard[row][config.numCols - 1].tiles.push(
          board[row][config.numCols - 1]
        );
      }

      // Combine or move all the cells to the right
      for (let row = 0; row < config.numRows; row++) {
        for (let col = config.numCols - 2; col >= 0; col--) {
          const cellValue = board[row][col];
          const rightCellValue = board[row][col + 1];

          if (canCombine(cellValue, rightCellValue)) {
            intermediateBoard[row][col + 1].tiles.push({ ...cellValue });
            if (board[row][col].value) {
              movedRows.push(row);
            }
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
    case MoveDirection.UP:
      // Put all cells from the first row into the intermediate board
      for (let col = 0; col < config.numCols; col++) {
        intermediateBoard[0][col].tiles.push(board[0][col]);
      }

      // Combine or move all the cells to the top
      for (let row = 1; row < config.numRows; row++) {
        for (let col = 0; col < config.numCols; col++) {
          const cellValue = board[row][col];
          const upCellValue = board[row - 1][col];

          if (canCombine(cellValue, upCellValue)) {
            intermediateBoard[row - 1][col].tiles.push({ ...cellValue });
            if (board[row][col].value) {
              movedCols.push(col);
            }
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
    case MoveDirection.DOWN:
      // Put all cells from the last row into the intermediate board
      for (let col = 0; col < config.numCols; col++) {
        intermediateBoard[config.numCols - 1][col].tiles.push(
          board[config.numCols - 1][col]
        );
      }

      // Combine or move all the cells to the bottom
      for (let row = config.numRows - 2; row >= 0; row--) {
        for (let col = 0; col < config.numCols; col++) {
          const cellValue = board[row][col];
          const downCellValue = board[row + 1][col];

          if (canCombine(cellValue, downCellValue)) {
            intermediateBoard[row + 1][col].tiles.push({ ...cellValue });
            if (board[row][col].value) {
              movedCols.push(col);
            }
            board[row][col].value = 0;
          } else {
            intermediateBoard[row][col].tiles.push({ ...cellValue });
          }
        }
      }
      break;
  }

  return {
    intermediateBoard,
    moved: { cols: movedCols, rows: movedRows },
  };
};

/**
 *
 * @param curTile
 * @param destTile
 * @returns
 */
const canCombine = (curTile: TileData, destTile: TileData): boolean => {
  const curVal = curTile.value;
  const destVal = destTile.value;

  if (destVal === 0) {
    return true;
  }

  if (
    (curVal === START_NUM_2 && destVal === START_NUM_3) ||
    (curVal === START_NUM_3 && destVal === START_NUM_2)
  ) {
    return true;
  }

  return curVal > START_NUM_3 && destVal > START_NUM_3 && curVal === destVal;
};
