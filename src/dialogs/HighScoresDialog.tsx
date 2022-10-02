import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import { GameMode, HighScoreDoc } from "../types";
import useGameModeStore from "../stores/gameModeStore";
import moment from "moment";
import { Dialog, IconButton, Text, ToggleButton } from "react-native-paper";
import { View } from "react-native";

/**
 *
 * @param param0
 * @returns
 */
const HighScoreRow = ({
  highScore,
  index,
}: {
  highScore: HighScoreDoc;
  index: number;
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
      <Text style={{ display: "flex", color: colors.LIGHT }}>
        {`${index + 1}.`}
      </Text>
      <Text style={{ display: "flex", color: colors.LIGHT }}>
        {highScore.username}
      </Text>
      <Text
        style={{
          display: "flex",
          justifyContent: "flex-end",
          color: colors.LIGHT,
        }}
      >
        {highScore.score}
      </Text>
      <Text
        style={{
          display: "flex",
          justifyContent: "flex-end",
          color: colors.LIGHT,
        }}
      >
        {moment(highScore.timestamp, "X").fromNow()}
      </Text>
    </View>
  );
};

/**
 *
 * @returns
 */
function HighScoresDialog() {
  const { gameMode } = useGameModeStore();
  const {
    showHighScoresDialog,
    fetching,
    highScores,
    closeHighScoresDialog,
    setHighScores,
    startFetchingHighScores,
  } = useHighScoresStore();
  const [gameModeTab, setGameModeTab] = useState<GameMode>(gameMode);

  useEffect(() => {
    if (showHighScoresDialog) {
      // startFetchingHighScores();
      // fetchHighScores().then((highScores) => {
      //   setHighScores(orderBy(highScores, ["score"], ["desc"]));
      // });
    }
  }, [showHighScoresDialog]);

  useEffect(() => {
    setGameModeTab(gameMode);
  }, [gameMode]);

  /**
   *
   * @returns
   */
  const renderHighScoresList = () => {
    const scores = highScores.filter((hs) => hs.gameMode === gameModeTab);
    if (scores.length === 0) {
      return <Text style={{ color: colors.LIGHT }}>No scores yet</Text>;
    }

    return scores.map((highScore, i) => (
      <HighScoreRow key={highScore.gameId} highScore={highScore} index={i} />
    ));
  };

  return (
    <Dialog visible={showHighScoresDialog} onDismiss={closeHighScoresDialog}>
      <Dialog.Title style={{ color: colors.ACCENT }}>High Scores</Dialog.Title>
      <Dialog.Content>
        <View style={{ borderColor: "divider" }}>
          <ToggleButton.Row
            value={gameModeTab}
            onValueChange={(value) => setGameModeTab(value as GameMode)}
          >
            <ToggleButton
              icon="calendar-today"
              value={GameMode.DAILY_CHALLENGE}
            />
            <ToggleButton icon="numeric-4-box" value={GameMode.FOUR_BY_FOUR} />
            <ToggleButton icon="numeric-5-box" value={GameMode.FIVE_BY_FIVE} />
          </ToggleButton.Row>
        </View>
        {renderHighScoresList()}
      </Dialog.Content>
      <Dialog.Actions style={{ justifyContent: "center" }}>
        <IconButton icon="close" color="red" onPress={closeHighScoresDialog} />
      </Dialog.Actions>
    </Dialog>
  );
}

export default HighScoresDialog;
