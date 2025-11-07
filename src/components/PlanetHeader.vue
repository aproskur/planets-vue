<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlanetStore } from '@/stores/planets'

const store = usePlanetStore()
const { names } = storeToRefs(store)
const isOpen = ref(false)
const toggle = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <header class="nav">
        <div class="nav__bar">
            <h1 class="nav__brand">the planets</h1>
            <nav
                class="nav-desktop"
                aria-labelledby="planet-nav-desktop-label"
            >
                    <span id="planet-nav-desktop-label" class="sr-only">Planet navigation desktop</span>
                    <ul>
                        <li v-for="planet in names"
                            :key="planet"
                            :data-planet="planet.toLowerCase()">
                        <RouterLink
                            :to="{ name: 'planet', params: { name: planet.toLowerCase() } }"
                            v-slot="{ href, navigate, isActive }"
                        >
                            <a :href="href" @click="navigate" :class="['nav-link', { active: isActive }]">
                            {{ planet }}
                            </a>
                        </RouterLink>
                        </li>
                    </ul>
            </nav>
                <button
                        class="nav__toggle burger"
                        :class="{ 'is-active': isOpen }"
                        @click="toggle"
                        aria-label="Toggle menu"
                        :aria-expanded="isOpen"
                        aria-controls="mobile-menu"
                >
                    <span></span>
                </button>
        </div>


         <nav class="nav-mobile"
             aria-labelledby="planet-nav-mobile-label"
             id="mobile-menu"
             :class="{ 'nav-mobile--open': isOpen }"
         >
            <span id="planet-nav-mobile-label" class="sr-only">Planet navigation mobile</span>
            <ul>
                <li v-for="planet in names" :key="planet">
                    <RouterLink
                        :to="`/planet/${planet.toLowerCase()}`"
                        @click="isOpen = false" 
                        
                    >
                   <span class="nav-mobile__dot" :data-planet="planet.toLowerCase()"></span>
                   <span class="nav-mobile__name"> {{ planet }}</span>
                   <span class="nav-mobile__chevron">›</span>
                    </RouterLink>
                </li>
            </ul>
         </nav>
    </header>
</template>

<style scoped>
    .nav {
        position: fixed;
        width: 100%;
        display: flex;
        padding: 1rem 1rem;
        justify-content: space-between;
        border-bottom: 1px solid rgba(56, 56, 79, 0.5);
        z-index: 200;
        
    }

    .nav-desktop {
        display: none;
    }

    .nav__bar {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav__brand {
        text-transform: uppercase;
        color: #fff;
    }

    .nav__toggle {
        all: unset;
    }


    .nav-mobile {
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: var(--header-h, 100px);
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background: var(--dark);

    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0.25s ease;
    }

    .nav-mobile--open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.nav-mobile ul,
.nav-mobile ul li {
  background: var(--dark); 
}

    .nav-mobile ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
    }


    .nav-mobile ul li {
        border-bottom: 1px solid rgba(56, 56, 79, 0.5);
        text-transform: uppercase;
        color: #fff;
        padding: 2rem 2rem;
    }

    .nav-mobile ul li a {
        text-decoration: none;
        align-items: space-between;
        display: flex;
        color: #fff;
    }

    .nav-mobile__dot {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .nav-mobile__name { flex: 1; margin-left: 3rem;}
    .nav-mobile__chevron { opacity: .6; }


.nav-mobile__dot {
  background-color: var(--planet-color);
}


.burger {
  all: unset;
  cursor: pointer;
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger span {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #fff;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.burger span::before,
.burger span::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #fff;
  border-radius: 1px;
  transition: all 0.3s ease;
}

.burger span::before {
  transform: translateY(-8px);
}

.burger span::after {
  transform: translateY(8px);
}

.burger.is-active span {
  background-color: transparent;
}
.burger.is-active span::before {
  transform: rotate(45deg);
}
.burger.is-active span::after {
  transform: rotate(-45deg);
}



.nav-desktop ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    text-transform: uppercase;
}

nav {
    margin-top: 1rem;
}

.nav-desktop ul li a {
    all: unset;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

@media (min-width: 768px){
     .nav__toggle {
            display: none
        }

    .nav__bar {
        flex-direction: column;
    }

      .nav-desktop {
            display: flex;
            
        }

        .nav-link.active {
    border-top: none;             
    color: var(--planet-color);    
    opacity: 1;                    
  }

}


@media (min-width: 1000px){
    .nav__bar {
        flex-direction: row;     
    }

    .nav-link.active {
  position: relative;
  border-top: 4px solid var(--planet-color);
  padding-top: 1.82rem;
  opacity: 1;
}

nav {
    margin-top: 0;
}
}
    
</style>
