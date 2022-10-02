import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import { fetchHighScores } from "../api/highScores";
import DialogTransition from "./DialogTransition";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import { GameMode, HighScoreDoc } from "../types";
import useGameModeStore from "../stores/gameModeStore";
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from "moment";

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
    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: 'nowrap', gap: 3 }}>
      <DialogContentText
        sx={{ display: "flex", color: colors.LIGHT }}
      >{`${index + 1}.`}</DialogContentText>
      <DialogContentText sx={{ display: "flex", color: colors.LIGHT }}>
        {highScore.username}
      </DialogContentText>
      <DialogContentText
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          color: colors.LIGHT,
        }}>
        {highScore.score}
      </DialogContentText>
      <DialogContentText
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          color: colors.LIGHT,
        }}
      >
        {moment(highScore.timestamp.seconds, 'X').fromNow()}
      </DialogContentText>
    </Box>
  );
};

/**
 * 
 * @returns 
 */
function HighScoresDialog() {
  const { gameMode } = useGameModeStore();
  const { showHighScoresDialog, fetching, highScores, closeHighScoresDialog, setHighScores, startFetchingHighScores } = useHighScoresStore();
  const [gameModeTab, setGameModeTab] = useState<GameMode>(gameMode);

  useEffect(() => {
    if (showHighScoresDialog) {
      startFetchingHighScores();
      fetchHighScores().then((highScores) => {
        setHighScores(orderBy(highScores, ["score"], ["desc"]));
      });
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
      return (<DialogContentText sx={{ color: colors.LIGHT }}>No scores yet</DialogContentText>);
    }

    return scores.map((highScore, i) => (
      <HighScoreRow
        key={highScore.gameId}
        highScore={highScore}
        index={i}
      />))
  }

  return (
    <Dialog
      open={showHighScoresDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeHighScoresDialog}
    >
      <DialogTitle sx={{ color: colors.ACCENT }}>High Scores</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={gameModeTab}
            onChange={(event, newTab) => setGameModeTab(newTab)}
            sx={{
              '& .MuiSvgIcon-fontSizeMedium': { color: colors.LIGHT },
              '& .Mui-selected .MuiSvgIcon-fontSizeMedium': { color: colors.BRAND },
              marginBottom: 2,
            }}>
            <Tab icon={<AccessTimeIcon />} value={GameMode.DAILY_CHALLENGE} />
            <Tab icon={<Filter4Icon />} value={GameMode.FOUR_BY_FOUR} />
            <Tab icon={<Filter5Icon />} value={GameMode.FIVE_BY_FIVE} />
          </Tabs>
        </Box>
        {renderHighScoresList()}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end" }}>
        <Button onClick={closeHighScoresDialog}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default HighScoresDialog;
