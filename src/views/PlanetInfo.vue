<script setup>
import { computed, ref, toRef, watch } from 'vue'
import PlanetViewSelector from '@/components/PlanetViewSelector.vue'
import { usePlanetStore } from '@/stores/planets'
import { useThemeStore } from '@/stores/theme'


const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const store = usePlanetStore()
const theme = useThemeStore()

const requestedName = toRef(props, 'name')

const planetKey = computed(() => (requestedName.value || '').toLowerCase())
const allPlanets = computed(() => store.planets || [])
const fallbackPlanet = computed(() => allPlanets.value[0] || null)

const planet = computed(() => store.byName(planetKey.value) || fallbackPlanet.value)

const currentView = ref('overview')

watch(planet, () => {
  currentView.value = 'overview'
}, { immediate: true })

watch(() => planet.value?.name, (name) => {
  if (name) {
    theme.setPlanet(name)
  }
}, { immediate: true })

const accent = computed(() => theme.accent)

const viewContent = computed(() => {
  const data = planet.value
  if (!data) {
    return { content: '', source: '#' }
  }

  if (currentView.value === 'structure') {
    return data.structure
  }

  if (currentView.value === 'geology') {
    return data.geology
  }

  return data.overview
})

const primaryImage = computed(() => {
  const data = planet.value
  if (!data) {
    return ''
  }

  return currentView.value === 'structure'
    ? data.images.internal
    : data.images.planet
})

const geologyOverlay = computed(() => {
  const data = planet.value
  if (!data || currentView.value !== 'geology') {
    return ''
  }

  return data.images.geology
})

const stats = computed(() => {
  const data = planet.value
  if (!data) {
    return []
  }

  return [
    { label: 'Rotation Time', value: data.rotation },
    { label: 'Revolution Time', value: data.revolution },
    { label: 'Radius', value: data.radius },
    { label: 'Average Temp.', value: data.temperature },
  ]
})

const planetSizes = {
  mercury: 111,
  venus: 154,
  earth: 173,
  mars: 129,
  jupiter: 224,
  saturn: 212,
  uranus: 176,
  neptune: 173,
}

const planetSize = computed(() => {
  const name = planet.value?.name?.toLowerCase()
  const size = name ? planetSizes[name] : null
  return size ? `${size}px` : '150px'
})
</script>

<template>
  <main v-if="planet" class="planet-info">
    <div class="planet-info__selector planet-info__selector--mobile">
      <PlanetViewSelector
        v-model="currentView"
        :accent="accent"
      />
    </div>

    <section class="planet-info__hero">
      <div
        class="planet-info__visual"
        :style="{ '--planet-size': planetSize }"
      >
        <img
          v-if="primaryImage"
          :src="primaryImage"
          class="planet-info__image"
          :alt="`${planet.name} illustration`"
        >

        <img
          v-if="geologyOverlay"
          :src="geologyOverlay"
          class="planet-info__geology"
          :alt="`${planet.name} geology overlay`"
        >
      </div>

      <article class="planet-info__summary">
        <h1 class="planet-info__name">
          {{ planet.name }}
        </h1>
        <p class="planet-info__description">
          {{ viewContent.content }}
        </p>
        <p class="planet-info__source">
          <span class="planet-info__source-label">Source :</span>
          <a
            class="planet-info__source-link"
            :href="viewContent.source"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia
          </a>
          <span class="wiki-icon"> <img src="/assets/icon-source.svg" alt="" /> </span>
        </p>
      </article>

      <div class="planet-info__selector planet-info__selector--desktop">
        <PlanetViewSelector
          v-model="currentView"
          :accent="accent"
        />
      </div>
    </section>

    <dl class="planet-info__stats">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="planet-info__stat"
      >
        <dt>{{ stat.label }}</dt>
        <dd>{{ stat.value }}</dd>
      </div>
    </dl>
  </main>

  <main v-else class="planet-info planet-info--empty">
    <p>Planet data not found.</p>
  </main>
</template>

<style scoped>
.planet-info {
  min-height: 100vh;
  width: min(100%, 1100px);
  margin-inline: auto;
  padding: calc(var(--header-h, 96px) + 24px) 24px 72px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  background: url('/assets/background-stars.svg') center / cover no-repeat;
  color: #fff;
  text-align: center;
}

.planet-info__selector {
  width: 100%;
}

.planet-info__selector--desktop {
  display: none;
  grid-area: selector;
}

.planet-info__hero {
  display: grid;
  gap: 32px;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-areas:
    "visual"
    "summary"
    "selector";
}

.planet-info__visual {
  position: relative;
  margin-inline: auto;
  width: var(--planet-size, 150px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  grid-area: visual;
}

.planet-info__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.planet-info__geology {
  position: absolute;
  width: 58%;
  max-width: 140px;
  bottom: -50%;
  left: 50%;
  transform: translateX(-50%);
}

.planet-info__summary {
  display: grid;
  gap: 16px;
  grid-area: summary;
  margin-top: 5rem;
}

.planet-info__name {
  font-size: clamp(2.5rem, 10vw, 4rem);
  margin: 0;
  text-transform: uppercase;
}

.planet-info__description {
  margin: 0;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.planet-info__source {
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  font-size: 0.95rem;
}

.planet-info__source-label {
  color: rgba(255, 255, 255, 0.6);
}

.planet-info__source-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.planet-info__stats {
  width: 100%;
  display: grid;
  gap: 12px;
  text-align: left;
}

.planet-info__stat {
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 16px 20px;
  text-transform: uppercase;
  display: grid;
  gap: 8px;
}

.planet-info__stat dt {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  letter-spacing: 1px;
}

.planet-info__stat dd {
  font-family: "Antonio", sans-serif;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px; 
}

.planet-info--empty {
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .planet-info {
    padding: calc(var(--header-h, 96px) + 48px) clamp(32px, 6vw, 64px) 96px;
    gap: 64px;
    text-align: left;
  }

  .planet-info__selector--mobile {
    display: none;
  }

  .planet-info__selector--desktop {
    display: block;
    width: 100%;
  }


  .planet-info__hero {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
    grid-template-areas:
      "visual visual"
      "summary selector";
    column-gap: clamp(32px, 6vw, 72px);
    row-gap: 5rem;
    align-items: center;
  }

  .planet-info__visual {
    width: calc(var(--planet-size, 150px) * 1.3);
    justify-self: center;
  }

  .planet-info__summary {
    gap: 20px;
    margin-top: 1rem;
  }

  .planet-info__name {
    font-size: clamp(3rem, 6vw, 5rem);
  }

  .planet-info__description {
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.75);
  }

  .planet-info__source {
    justify-content: flex-start;
  }

  .planet-info__stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }

  .planet-info__stat {
    padding: 20px 24px;
  }

  .planet-info__stat dt {
    font-size: 0.6rem;
  }

   .planet-info__stat dd {
    font-size: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .planet-info {
    gap: 72px;
  }

  .planet-info__hero {
    grid-template-columns: minmax(320px, 1fr) minmax(320px, 360px);
    grid-template-areas:
      "visual summary"
      "visual selector";
    column-gap: clamp(48px, 8vw, 96px);
    row-gap: 1.5rem;
  }

  .planet-info__visual {
    width: calc(var(--planet-size, 150px) * 1.6);
  }

  .planet-info__stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  .planet-info__stat {
    padding: 24px 28px;
  }

   .planet-info__stat dt {
    font-size: .75rem;
  }

  .planet-info__stat dd {
    font-size: 2rem;
  }
}
</style>
