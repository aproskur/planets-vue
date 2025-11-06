<script setup>
import { usePlanetStore } from '@/stores/planets'
import { ref } from 'vue'
const store = usePlanetStore() 
const names = store.names
const isOpen = ref(false)
const toggle = () => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <header class="nav">
        <div class="nav__bar">
            <h1 class="nav__brand">the planets</h1>
          <nav class="nav-desktop">
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


            <button class="nav__toggle burger"
                    @click="toggle"
                    aria-label="Toggle menu"
                    :aria-expanded="isOpen"
                    aria-controls="mobile-menu"
            >
            <span></span>
        </button>
        </div>
        <!-- desktop nav -->
        <nav>

        </nav>

        <!-- TODO mobile nav -->
         <nav class="nav-mobile"
             :class="{ 'nav-mobile--open': isOpen }"
         >
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
    z-index: 10;
    top: 100px;
    left: 0;
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

/* middle bar */
.burger span {
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #fff;
  border-radius: 1px;
  transition: all 0.3s ease;
}

/* top & bottom bars via pseudo-elements */
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

/* "open" state */
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
.nav-link.active {
  position: relative;
  border-top: 4px solid var(--planet-color);
  padding-top: 1.82rem;
  opacity: 1;
}

.nav-desktop ul li a {
    all: unset;
}


@media (min-width: 768px){
        .nav__toggle {
            display: none
        }

        .nav-desktop {
            display: flex;
        }
    }
    
</style>