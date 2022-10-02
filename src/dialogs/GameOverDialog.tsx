import useGameStore from "../stores/gameStore";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import { Dialog, Button, Text } from "react-native-paper";
import { View } from "react-native";

function GameOverDialog() {
  const {
    moves,
    score,
    currentGameId,
    showGameOverDialog,
    newGame,
    closeGameOverDialog,
  } = useGameStore();

  const {
    posting,
    lastPostedGameId,
    successfullyPosted,
    openPostScoreDialog,
    openHighScoresDialog,
    resetPosting,
  } = useHighScoresStore();

  const canPostHighScore = lastPostedGameId !== currentGameId;

  // TOOD (bug) - dialog pops up on refresh of page
  // TODO - show bar chart or some cool visualization of merged/generated
  return (
    <Dialog visible={showGameOverDialog} onDismiss={closeGameOverDialog}>
      <Dialog.Title style={{ color: colors.ACCENT }}>New Game?</Dialog.Title>
      <Dialog.Content
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text style={{ color: colors.LIGHT }}>You scored</Text>
        <Text style={{ color: colors.ACCENT }}>{score}</Text>
        <Text style={{ color: colors.LIGHT }}>points</Text>
        <Text style={{ color: colors.LIGHT }}>in</Text>
        <Text style={{ color: colors.ACCENT }}>{moves}</Text>
        <Text style={{ color: colors.LIGHT }}>moves</Text>
      </Dialog.Content>
      <Dialog.Actions style={{ justifyContent: "space-between" }}>
        <Button
          loading={posting}
          onPress={() => {
            canPostHighScore ? openPostScoreDialog() : closeGameOverDialog();
          }}
        >
          {canPostHighScore ? "Post" : "Close"}
        </Button>
        <Button
          onPress={() => {
            resetPosting();
            newGame();
          }}
        >
          New Game
        </Button>
        <Button
          onPress={() => {
            /* TODO - implement */
          }}
        >
          Share
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

export default GameOverDialog;
