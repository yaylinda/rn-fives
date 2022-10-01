import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import {
  LOCAL_STORAGE_CLIENT_ID,
  LOCAL_STORAGE_USERNAME,
} from "../utils/constants";
import uuid from "react-native-uuid";

interface UserState {
  username: string;
  clientId: string;
  init: () => void;
  setUsername: (username: string) => void;
}

const useUserStore = create<UserState>()((set, get) => ({
  username: "",
  clientId: "",

  /**
   *
   * @returns
   */
  init: async () => {
    let clientId = await AsyncStorage.getItem(LOCAL_STORAGE_CLIENT_ID);
    const username = (await AsyncStorage.getItem(LOCAL_STORAGE_USERNAME)) ?? "";
    set(() => {
      if (!clientId) {
        clientId = uuid.v4() as string;
        AsyncStorage.setItem(LOCAL_STORAGE_CLIENT_ID, clientId);
      }
      return { clientId, username };
    });
  },

  /**
   *
   * @param username
   * @returns
   */
  setUsername: (username: string) =>
    set((state) => {
      AsyncStorage.setItem(LOCAL_STORAGE_USERNAME, username);
      return { ...state, username };
    }),
}));

export default useUserStore;
