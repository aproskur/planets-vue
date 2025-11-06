import { defineStore } from 'pinia'

const planetColors = {
  mercury: '#419EBB',
  venus:   '#EDA249',
  earth:   '#6D2ED5',
  mars:    '#D14C32',
  jupiter: '#D83A34',
  saturn:  '#CD5120',
  uranus:  '#1EC1A2',
  neptune: '#2D68F0',
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentPlanet: 'earth',
  }),
  getters: {
    accent(state) {
      return planetColors[state.currentPlanet] || '#EDA249'
    },
  },
  actions: {
    setPlanet(name) {
      this.currentPlanet = (name || '').toLowerCase()
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--planet-color', this.accent)
      }
    },
  },
})
