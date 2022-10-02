import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import Game from "./src/components/Game";
import NewGameModeSelectionDialog from "./src/dialogs/NewGameModeSelectionDialog";
import useGameModeStore from "./src/stores/gameModeStore";
import useGameStore from "./src/stores/gameStore";
import useHighScoresStore from "./src/stores/highScoresStore";
import useUserStore from "./src/stores/userStore";
import { colors } from "./src/theme";
import { Snackbar } from "react-native-paper";
import HighScoresDialog from "./src/dialogs/HighScoresDialog";

export default function App() {
  const { hasStarted, isGameOver, move, restoreState } = useGameStore();
  const { init: initUserStore } = useUserStore();
  const {
    init: initHighScoresStore,
    openHighScoresDialog,
    resetPosting,
    successfullyPosted,
  } = useHighScoresStore();
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
      <NewGameModeSelectionDialog />
      <HighScoresDialog />
      <Snackbar
        visible={successfullyPosted}
        onDismiss={resetPosting}
        action={{
          label: "Scores",
          onPress: openHighScoresDialog,
        }}
      >
        Successfully posted high score!
      </Snackbar>
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
