import create from "zustand";

import { GameMode } from "../types";
import { GAME_MODE } from "../utils/constants";

export const DEFAULT_GAME_MODE = GameMode.FIVE_BY_FIVE;

interface GameModeState {
  gameMode: GameMode,
  showNewGameModeSelectionDialog: boolean;
  init: () => void,
  updateMode: (mode: GameMode) => void,
  openNewGameModeSelectionDialog: () => void;
  closeNewGameModeSelectionDialog: () => void;
}

const useGameModeStore = create<GameModeState>()((set, get) => ({
  gameMode: DEFAULT_GAME_MODE,
  showNewGameModeSelectionDialog: false,

  /**
   * 
   * @param gameMode 
   * @returns 
   */
  updateMode: (gameMode: GameMode) => set((state) => {
    window.localStorage.setItem(GAME_MODE, gameMode);
    return { ...state, gameMode }
  }),

  /**
   * 
   * @returns 
   */
  init: () => set((state) => {
    const gameMode = window.localStorage.getItem(GAME_MODE);
    if (gameMode) {
      return {
        ...state,
        gameMode: GameMode[gameMode as keyof typeof GameMode]
      }
    }

    window.localStorage.setItem(GAME_MODE, DEFAULT_GAME_MODE);

    return {
      ...state,
      gameMode: DEFAULT_GAME_MODE,
    };
  }),

  /**
  *
  * @returns
  */
  openNewGameModeSelectionDialog: () =>
    set((state) => ({ ...state, showNewGameModeSelectionDialog: true })),

  /**
   *
   * @returns
   */
  closeNewGameModeSelectionDialog: () =>
    set((state) => ({ ...state, showNewGameModeSelectionDialog: false })),
}));

export default useGameModeStore;