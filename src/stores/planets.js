import { defineStore } from 'pinia'
import planetsRaw from '@/data/data.json'

export const usePlanetStore = defineStore('planets', {
    state: () => ({
      planets: planetsRaw.map(p => ({
                                    ...p, 
                                    images: {
                                    planet: new URL(p.images.planet, import.meta.url).href,
                                    internal: new URL(p.images.internal, import.meta.url).href,
                                    geology: new URL(p.images.geology, import.meta.url).href
                                      }
                                    }))                                    
  }),
  getters: {
    names: (state) => state.planets.map(p=>p.name),
    byName: (state) => (name) => state.planets.find(p=>p.name.toLowerCase() === String(name).toLowerCase())
  }


})
