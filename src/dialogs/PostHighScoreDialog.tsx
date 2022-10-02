import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import useUserStore from "../stores/userStore";
import useGameStore from "../stores/gameStore";
import { HighScore } from "../types";
import useGameModeStore from "../stores/gameModeStore";
import { Dialog, IconButton, Text, TextInput } from "react-native-paper";
import { View } from "react-native";

function PostHighScoreDialog() {
  const { moves, score, merged, generated, currentGameId } = useGameStore();
  const {
    showPostScoreDialog,
    posting,
    closePostScoreDialog,
    startPosting,
    setPostedSuccess,
    setPostedFailed,
  } = useHighScoresStore();
  const { clientId, username, setUsername } = useUserStore();
  const { gameMode } = useGameModeStore();

  /**
   *
   */
  const postScore = async () => {
    const highScore: HighScore = {
      username: username ? username : clientId,
      clientId,
      gameId: currentGameId,
      score,
      moves,
      merged,
      generated,
      gameMode,
    };

    try {
      startPosting();
      // await postHighScore(highScore);
      setPostedSuccess(currentGameId);
    } catch (e) {
      setPostedFailed();
    }
  };

  /**
   *
   * @param event
   */
  const onUsernameChange = (value: string) => {
    setUsername(value);
  };

  return (
    <Dialog visible={showPostScoreDialog} onDismiss={closePostScoreDialog}>
      <Dialog.Title style={{ color: colors.LIGHT }}>Post score?</Dialog.Title>
      <Dialog.Content style={{ display: "flex", flexDirection: "column" }}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={onUsernameChange}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View>
            <Text style={{ color: colors.LIGHT }}>Score</Text>
            <Text style={{ textAlign: "center", color: colors.LIGHT }}>
              {score}
            </Text>
          </View>
          <View>
            <Text style={{ color: colors.LIGHT }}>Moves</Text>
            <Text style={{ textAlign: "center", color: colors.LIGHT }}>
              {moves}
            </Text>
          </View>
        </View>
      </Dialog.Content>
      <Dialog.Actions style={{ justifyContent: "space-between" }}>
        <IconButton
          icon="close"
          color="red"
          onPress={closePostScoreDialog}
          disabled={posting}
        />
        <IconButton
          icon="check"
          color="green"
          onPress={postScore}
          disabled={posting}
        />
      </Dialog.Actions>
    </Dialog>
  );
}

export default PostHighScoreDialog;
