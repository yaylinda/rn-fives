import React, { useEffect, useState } from "react";
import { Dialog, IconButton, ToggleButton } from "react-native-paper";
import useGameModeStore from "../stores/gameModeStore";
import useGameStore from "../stores/gameStore";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import { GameMode } from "../types";

const styles = {
  toggleButtonStyle: {
    width: "100%",
    justifyContent: "flex-start",
    gap: 2,
    border: "none",
  },
};

const NewGameModeSelectionDialog = () => {
  const {
    gameMode,
    showNewGameModeSelectionDialog,
    closeNewGameModeSelectionDialog,
    updateMode,
  } = useGameModeStore();
  const { newGame } = useGameStore();
  const { resetPosting } = useHighScoresStore();
  const [selectedMode, setSelectedMode] = useState<GameMode>(gameMode);

  useEffect(() => {
    setSelectedMode(gameMode);
  }, [gameMode]);

  const startNewGame = () => {
    updateMode(selectedMode);
    newGame();
    resetPosting();
    closeNewGameModeSelectionDialog();
  };

  return (
    <Dialog
      visible={showNewGameModeSelectionDialog}
      onDismiss={closeNewGameModeSelectionDialog}
    >
      <Dialog.Title style={{ color: colors.ACCENT }}>New Game?</Dialog.Title>
      <Dialog.Content>
        <ToggleButton.Group
          value={selectedMode}
          onValueChange={(newGameMode) =>
            setSelectedMode(newGameMode as GameMode)
          }
        >
          <ToggleButton
            icon="calendar-today"
            value={GameMode.DAILY_CHALLENGE}
          />
          <ToggleButton icon="numeric-4-box" value={GameMode.FOUR_BY_FOUR} />
          <ToggleButton icon="numeric-5-box" value={GameMode.FIVE_BY_FIVE} />
        </ToggleButton.Group>
      </Dialog.Content>
      <Dialog.Actions style={{ justifyContent: "space-between" }}>
        <IconButton
          icon="close"
          color="red"
          onPress={closeNewGameModeSelectionDialog}
        />
        <IconButton icon="check" color="green" onPress={startNewGame} />
      </Dialog.Actions>
    </Dialog>
  );
};

export default NewGameModeSelectionDialog;
