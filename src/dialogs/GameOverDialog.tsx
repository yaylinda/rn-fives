import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DialogTransition from "./DialogTransition";
import useGameStore from "../stores/gameStore";
import useHighScoresStore from "../stores/highScoresStore";
import { colors } from "../theme";
import LoadingButton from "@mui/lab/LoadingButton";

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
    <Dialog
      open={showGameOverDialog}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={closeGameOverDialog}
    >
      <DialogTitle sx={{ color: colors.LIGHT }}>Game Over</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            color: colors.LIGHT,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <DialogContentText sx={{ color: colors.LIGHT }}>
            You scored
          </DialogContentText>
          <DialogContentText sx={{ color: colors.ACCENT }}>
            {score}
          </DialogContentText>
          <DialogContentText sx={{ color: colors.LIGHT }}>
            points
          </DialogContentText>
          <DialogContentText sx={{ color: colors.LIGHT }}>in</DialogContentText>
          <DialogContentText sx={{ color: colors.ACCENT }}>
            {moves}
          </DialogContentText>
          <DialogContentText sx={{ color: colors.LIGHT }}>
            moves
          </DialogContentText>
        </Box>
        {successfullyPosted && (
          <Alert
            sx={{ marginTop: 3 }}
            action={
              <Button
                onClick={openHighScoresDialog}
                color="inherit"
                size="small"
              >
                Scores
              </Button>
            }
          >
            Success!
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <LoadingButton
          loading={posting}
          onClick={() => {
            canPostHighScore ? openPostScoreDialog() : closeGameOverDialog();
          }}
        >
          {canPostHighScore ? "Post" : "Close"}
        </LoadingButton>
        <Button
          onClick={() => {
            resetPosting();
            newGame();
          }}
        >
          New Game
        </Button>
        <Button
          onClick={() => {
            /* TODO - implement */
          }}
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameOverDialog;
