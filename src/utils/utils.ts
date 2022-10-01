import { TileData, MoveDirection, IntermediateTileData, GameMode, GameBoardConfig } from "../types";
import { mergeTiles } from "./merger";
import { moveTiles } from "./mover";

/**
 *
 * @param code
 * @returns
 */
export const convertKeyCodeToDirection = (
  code: string
): MoveDirection | null => {
  switch (code) {
    case "ArrowLeft":
      return MoveDirection.LEFT;
    case "ArrowRight":
      return MoveDirection.RIGHT;
    case "ArrowUp":
      return MoveDirection.UP;
    case "ArrowDown":
      return MoveDirection.DOWN;
    default:
      return null;
  }
};

/**
 *
 * @returns
 */
export const initBoard = (config: GameBoardConfig): TileData[][] => {
  return Array.from(Array(config.numRows)).map((_, r) =>
    Array.from(Array(config.numCols)).map((_, c) => ({
      id: "",
      value: 0,
      isNew: false,
      isMerge: false,
    }))
  );
};

/**
 *
 * @returns
 */
export const initIntermediateBoard = (config: GameBoardConfig): IntermediateTileData[][] => {
  return Array.from(Array(config.numRows)).map((_, r) =>
    Array.from(Array(config.numCols)).map((_, c) => ({ tiles: [] }))
  );
};

/**
 *
 * @param board
 * @returns
 */
export const isGameOver = (board: TileData[][], config: GameBoardConfig): boolean => {
  const boardFull = isBoardFull(board, config);

  if (!boardFull) {
    return false;
  }

  const left = moveAndMerge(board, MoveDirection.LEFT, config);
  const right = moveAndMerge(board, MoveDirection.RIGHT, config);
  const up = moveAndMerge(board, MoveDirection.UP, config);
  const down = moveAndMerge(board, MoveDirection.DOWN, config);

  return [
    isSame(board, left, config),
    isSame(board, right, config),
    isSame(board, up, config),
    isSame(board, down, config),
  ].every((v) => v);
};

const moveAndMerge = (
  board: TileData[][],
  dir: MoveDirection,
  config: GameBoardConfig,
): TileData[][] => {
  const { intermediateBoard } = moveTiles(board, dir, config);
  return mergeTiles(intermediateBoard, config).board;
};

/**
 *
 * @param board
 * @returns
 */
const isBoardFull = (board: TileData[][], config: GameBoardConfig): boolean => {
  for (let row = 0; row < config.numRows; row++) {
    for (let col = 0; col < config.numCols; col++) {
      if (board[row][col].value === 0) {
        return false;
      }
    }
  }
  return true;
};

/**
 *
 * @param board1
 * @param board2
 * @returns
 */
const isSame = (board1: TileData[][], board2: TileData[][], config: GameBoardConfig): boolean => {
  for (let row = 0; row < config.numRows; row++) {
    for (let col = 0; col < config.numCols; col++) {
      if (board1[row][col].value !== board2[row][col].value) {
        return false;
      }
    }
  }
  return true;
};

/**
 * 
 * @param gameMode 
 * @returns 
 */
export const getBoardConfig = (gameMode: GameMode): GameBoardConfig => {
  switch (gameMode) {
    case GameMode.FOUR_BY_FOUR:
      return {
        numRows: 4,
        numCols: 4,
        tileSize: 60,
        tileSpacing: 10,
        startRow: 1,
        startCol: 1,
        tileWithBorder: 52,
        borderWidth: 4,
      };
    case GameMode.FIVE_BY_FIVE:
      return {
        numRows: 5,
        numCols: 5,
        tileSize: 50,
        tileSpacing: 5,
        startRow: 2,
        startCol: 2,
        tileWithBorder: 42,
        borderWidth: 4,
      };
    case GameMode.DAILY_CHALLENGE:
      return {
        numRows: 5,
        numCols: 5,
        tileSize: 50,
        tileSpacing: 5,
        startRow: 2,
        startCol: 2,
        tileWithBorder: 42,
        borderWidth: 4,
      };
  }
};