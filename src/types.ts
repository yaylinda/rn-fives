export enum GameMode {
  FOUR_BY_FOUR = "FOUR_BY_FOUR",
  FIVE_BY_FIVE = "FIVE_BY_FIVE",
  DAILY_CHALLENGE = "DAILY_CHALLENGE",
}

export enum MoveDirection {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export interface TileData {
  id: string;
  value: number;
  isNew: boolean;
  isMerge: boolean;
}

export interface IntermediateTileData {
  tiles: TileData[];
}

export type TileLocations = {
  [tileId in string]: {
    tile: TileData;
    coordinates: Coordinates;
  };
};

export interface Coordinates {
  row: number;
  col: number;
}

export interface User {
  userId: string;
  username: string;
}

export interface HighScore {
  username: string;
  clientId: string;
  gameId: string;
  score: number;
  moves: number;
  merged: { [key in number]: number };
  generated: { [key in number]: number };
  gameMode: GameMode;
}

export interface HighScoreDoc extends HighScore {
}

export interface GameBoardConfig {
  numRows: number;
  numCols: number;
  tileSize: number;
  tileSpacing: number;
  startRow: number;
  startCol: number;
  tileWithBorder: number;
  borderWidth: number;
}
