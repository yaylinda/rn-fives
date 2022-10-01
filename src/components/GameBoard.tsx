import useGameModeStore from "../stores/gameModeStore";
import useGameStore from "../stores/gameStore";
import { colors } from "../theme";
import Tile from "./Tile";
import { getBoardConfig } from "../utils/utils";
import { MoveDirection } from "../types";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function GameBoard() {
  const { tileLocations, lastMoveDirection, move } = useGameStore();
  const { gameMode } = useGameModeStore();
  const { numRows, numCols, tileSize, tileSpacing } = getBoardConfig(gameMode);
  const spacing = `${tileSpacing}px`;

  return (
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
                ></View>
              );
            })}
          </View>
        ))}
      </View>
      {Object.values(tileLocations)
        .reverse()
        .map((tile) => {
          return <Tile key={tile.tile.id} {...tile} />;
        })}
    </View>
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
