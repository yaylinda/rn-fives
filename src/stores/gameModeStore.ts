import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";

import { GameMode } from "../types";
import { GAME_MODE } from "../utils/constants";

export const DEFAULT_GAME_MODE = GameMode.FIVE_BY_FIVE;

interface GameModeState {
  gameMode: GameMode;
  showNewGameModeSelectionDialog: boolean;
  init: () => void;
  updateMode: (mode: GameMode) => void;
  openNewGameModeSelectionDialog: () => void;
  closeNewGameModeSelectionDialog: () => void;
}

const useGameModeStore = create<GameModeState>()((set, get) => ({
  gameMode: DEFAULT_GAME_MODE,
  showNewGameModeSelectionDialog: false,

  /**
   *
   * @returns
   */
  init: async () => {
    const gameMode = await AsyncStorage.getItem(GAME_MODE);

    set((state) => {
      if (gameMode) {
        return {
          ...state,
          gameMode: GameMode[gameMode as keyof typeof GameMode],
        };
      }

      AsyncStorage.setItem(GAME_MODE, DEFAULT_GAME_MODE);

      return {
        ...state,
        gameMode: DEFAULT_GAME_MODE,
      };
    });
  },

  /**
   *
   * @param gameMode
   * @returns
   */
  updateMode: (gameMode: GameMode) =>
    set((state) => {
      AsyncStorage.setItem(GAME_MODE, gameMode);
      return { ...state, gameMode };
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
