import {
  Coordinates,
  GameBoardConfig,
  IntermediateTileData,
  TileData,
  TileLocations,
} from "../types";

/**
 *
 * @param previousBoard
 * @param currentBoard
 * @returns
 */
export const convertBoardToLocations = (
  currentBoard: TileData[][],
  intermediateBoard: IntermediateTileData[][],
  config: GameBoardConfig,
): TileLocations => {
  let tileLocations: TileLocations = {};

  for (let row = 0; row < config.numRows; row++) {
    for (let col = 0; col < config.numCols; col++) {
      const coords: Coordinates = { row, col };

      for (let tile of intermediateBoard[row][col].tiles) {
        tileLocations = addTileLocation(coords, tile, tileLocations);
      }

      tileLocations = addTileLocation(
        coords,
        currentBoard[row][col],
        tileLocations
      );
    }
  }

  return tileLocations;
};

/**
 *
 * @param coordinates
 * @param tile
 * @param tileLocations
 * @returns
 */
const addTileLocation = (
  coordinates: Coordinates,
  tile: TileData,
  tileLocations: TileLocations
): TileLocations => {
  if (!tile.id || !tile.value) {
    return tileLocations;
  }

  tileLocations[tile.id] = {
    tile,
    coordinates,
  };

  return tileLocations;
};
