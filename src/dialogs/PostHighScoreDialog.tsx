import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import DialogTransition from "./DialogTransition";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useUserStore from "../stores/userStore";
import useGameStore from "../stores/gameStore";
import { HighScore } from "../types";
import { postHighScore } from "../api/highScores";
import useGameModeStore from "../stores/gameModeStore";

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
      await postHighScore(highScore);
      setPostedSuccess(currentGameId);
    } catch (e) {
      setPostedFailed();
    }
  };

  /**
   * 
   * @param event 
   */
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Dialog
      open={showPostScoreDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closePostScoreDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>Post score?</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Username"
          variant="standard"
          focused
          value={username}
          onChange={onUsernameChange}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Box>
            <DialogContentText sx={{ color: colors.LIGHT }}>
              Score
            </DialogContentText>
            <DialogContentText
              sx={{ textAlign: "center", color: colors.LIGHT }}
            >
              {score}
            </DialogContentText>
          </Box>
          <Box>
            <DialogContentText sx={{ color: colors.LIGHT }}>
              Moves
            </DialogContentText>
            <DialogContentText
              sx={{ textAlign: "center", color: colors.LIGHT }}
            >
              {moves}
            </DialogContentText>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <IconButton
          sx={{ color: "red" }}
          onClick={closePostScoreDialog}
          disabled={posting}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <LoadingButton
          sx={{ color: "green" }}
          onClick={postScore}
          disabled={posting}
          loading={posting}
        >
          <CheckIcon fontSize="large" />
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default PostHighScoreDialog;
