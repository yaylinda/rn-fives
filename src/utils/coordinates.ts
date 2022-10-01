import { shuffle } from "lodash";
import { TileData, MoveDirection, Coordinates, GameBoardConfig } from "../types";

/**
 *
 * @param dir
 * @returns
 */
export const getCoordinatesForNewTile = (
  board: TileData[][],
  dir: MoveDirection,
  moved: { cols: number[]; rows: number[] },
  config: GameBoardConfig
): Coordinates | null => {
  switch (dir) {
    case MoveDirection.LEFT: {
      if (moved.rows.length === 0) {
        return null;
      }

      const values = [];
      for (let row = 0; row < config.numRows; row++) {
        values.push(board[row][config.numCols - 1].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.rows)[0];
      return { col: config.numCols - 1, row: index };
    }
    case MoveDirection.RIGHT: {
      if (moved.rows.length === 0) {
        return null;
      }

      const values = [];
      for (let row = 0; row < config.numRows; row++) {
        values.push(board[row][0].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.rows)[0];
      return { col: 0, row: index };
    }
    case MoveDirection.UP: {
      if (moved.cols.length === 0) {
        return null;
      }

      const values = [];
      for (let col = 0; col < config.numCols; col++) {
        values.push(board[config.numRows - 1][col].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.cols)[0];
      return { col: index, row: config.numRows - 1 };
    }
    case MoveDirection.DOWN: {
      if (moved.cols.length === 0) {
        return null;
      }

      const values = [];
      for (let col = 0; col < config.numCols; col++) {
        values.push(board[0][col].value);
      }

      const emptyIndices = getEmptyIndices(values);
      if (emptyIndices.length === 0) {
        return null;
      }

      const index = shuffle(moved.cols)[0];
      return { col: index, row: 0 };
    }
  }
};

/**
 *
 * @param values
 * @returns
 */
const getEmptyIndices = (values: number[]) => {
  return values.map((v, i) => (v === 0 ? i : -1)).filter((i) => i !== -1);
};
