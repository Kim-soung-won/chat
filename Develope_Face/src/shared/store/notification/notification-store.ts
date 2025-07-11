import { create } from "zustand";
import { NotificationType, TopNotification } from "./notification-store.types";

type State = {
  notification: TopNotification;
  setMessage: (message: string, type: NotificationType) => void;
  close: () => void;
};

export const useTopNotificationStore = create<State>((set) => ({
  notification: {
    message: "",
    type: "info",
    active: false,
  },

  setMessage: (message: string, type: NotificationType) => set({ notification: {
    message: message,
    type: type,
    active: true,
  } }),

  close: () =>
    set({
      notification: {
        message: "",
        type: "info",
        active: false,
      },
    }),
}));
