import { create } from 'zustand'

// Global scene state. Kept tiny on purpose — grows as we add the
// password / zoom flow in later steps.
export const useStore = create((set) => ({
  // Intro + lamp. Starts off (dark room), auto-turns on after the intro delay.
  lampOn: false,
  setLampOn: (v) => set({ lampOn: v }),
  toggleLamp: () => set((s) => ({ lampOn: !s.lampOn })),

  // Notebook open/closed (wired for real in the interactions step).
  notebookOpen: true,
  toggleNotebook: () => set((s) => ({ notebookOpen: !s.notebookOpen })),
}))

// How long the room stays dark before the lamp clicks on (ms).
export const INTRO_LAMP_DELAY = 2000
