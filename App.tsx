import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import Game from "./src/components/Game";
import useGameModeStore from "./src/stores/gameModeStore";
import useGameStore from "./src/stores/gameStore";
import useHighScoresStore from "./src/stores/highScoresStore";
import useUserStore from "./src/stores/userStore";
import { colors } from "./src/theme";

export default function App() {
  const { hasStarted, isGameOver, move, restoreState } = useGameStore();
  const { init: initUserStore } = useUserStore();
  const { init: initHighScoresStore, openHighScoresDialog } =
    useHighScoresStore();
  const {
    gameMode,
    init: initModeStore,
    openNewGameModeSelectionDialog,
  } = useGameModeStore();

  useEffect(() => {
    initModeStore();
    restoreState();
    initUserStore();
    initHighScoresStore();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Game />
      <View style={styles.buttonBar}>
        <Button title="New Game" onPress={openNewGameModeSelectionDialog} />
        <Button title="See High Scores" onPress={openHighScoresDialog} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
