import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import useGameModeStore from "../stores/gameModeStore";
import useGameStore from "../stores/gameStore";
import { colors } from "../theme";
import { MoveDirection } from "../types";
import { getBoardConfig } from "../utils/utils";
import Tile from "./Tile";

export default function GameBoard() {
  const { tileLocations, prevTileLocations, move } = useGameStore();
  const { gameMode } = useGameModeStore();
  const { numRows, numCols, tileSize, tileSpacing } = getBoardConfig(gameMode);
  const spacing = `${tileSpacing}px`;

  console.log(`tileLocations=${JSON.stringify(tileLocations)}`);
  console.log(`prevTileLocations=${JSON.stringify(prevTileLocations)}`);

  const gestures = useMemo(() => {
    const up = Gesture.Fling()
      .direction(Directions.UP)
      .runOnJS(true)
      .onStart(() => {
        move(MoveDirection.UP);
      });

    const down = Gesture.Fling()
      .direction(Directions.DOWN)
      .runOnJS(true)
      .onStart(() => {
        move(MoveDirection.DOWN);
      });

    const left = Gesture.Fling()
      .direction(Directions.LEFT)
      .runOnJS(true)
      .onStart(() => {
        move(MoveDirection.LEFT);
      });

    const right = Gesture.Fling()
      .direction(Directions.RIGHT)
      .runOnJS(true)
      .onStart(() => {
        move(MoveDirection.RIGHT);
      });

    return [up, down, left, right];
  }, []);

  return (
    <GestureDetector gesture={Gesture.Race(...gestures)}>
      <View style={styles.container}>
        <View style={styles.grid}>
          {Array.from(Array(numRows)).map((_, r) => (
            <View key={`row_${r}`} style={styles.row}>
              {Array.from(Array(numCols)).map((_, c) => {
                const isLastRow = r === numRows - 1;
                const isLastCol = c === numCols - 1;
                return (
                  <View
                    key={`row_${r}_col_${c}`}
                    style={[
                      styles.cell,
                      {
                        height: tileSize,
                        width: tileSize,
                        marginRight: isLastCol ? 0 : tileSpacing,
                        marginBottom: isLastRow ? 0 : tileSpacing,
                      },
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </View>
        {Object.values(tileLocations)
          .reverse()
          .map((tile) => (
            <Tile
              key={tile.tile.id}
              {...tile}
              previousCoordinates={prevTileLocations[tile.tile.id]?.coordinates}
            />
          ))}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  cell: {
    backgroundColor: colors.DARK,
    borderRadius: 50,
  },
});
