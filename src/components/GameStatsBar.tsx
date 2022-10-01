import React from "react";
import { View, StyleSheet, Text } from "react-native";
import useGameStore from "../stores/gameStore";
import { PreviewTile } from "./Tile";

export default function GameStatsBar() {
  const { hasStarted, moves, score, nextValue: nextValue } = useGameStore();

  if (!hasStarted) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Score</Text>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
      <View style={styles.nextContainer}>
        <Text style={styles.nextText}>Next</Text>
        <PreviewTile value={nextValue} />
      </View>
      <View>
        <Text>Moves</Text>
        <Text style={styles.movesText}>{moves}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  scoreText: {
    textAlign: "center",
    fontSize: 20,
  },
  nextContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nextText: {
    marginBottom: 1,
  },
  movesText: {
    textAlign: "center",
    fontSize: 20,
  },
});
