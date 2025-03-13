import { create } from 'zustand';

export const useRefreshStore = create((set) => ({
  shouldRefresh: false,
  triggerRefresh: () =>
    set((state) => ({ shouldRefresh: !state.shouldRefresh })),
}));
