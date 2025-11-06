<script setup>
const { modelValue, accent } = defineProps({
  modelValue: {
    type: String,
    default: 'overview' 
  },
  accent: {
    type: String,
    default: '#EDA249' 
  }
})

const emit = defineEmits(['update:modelValue'])

const items = [
  { id: 'overview',  num: '01', label: 'OVERVIEW',            short: 'OVERVIEW' },
  { id: 'structure', num: '02', label: 'INTERNAL STRUCTURE',  short: 'STRUCTURE' },
  { id: 'geology',   num: '03', label: 'SURFACE GEOLOGY',     short: 'SURFACE' }
]
</script>

<template>
  <nav class="view-selector" :style="{ '--accent': accent }">
    <button
      v-for="it in items"
      :key="it.id"
      type="button"
      class="view-btn"
      :class="{ active: it.id === modelValue }"
      @click="emit('update:modelValue', it.id)"
    >
      <span class="num">{{ it.num }}</span>
      <span class="label-full">{{ it.label }}</span>
      <span class="label-short">{{ it.short }}</span>
    </button>
  </nav>
</template>

<style scoped>
/* ========== MOBILE ========== */
/* Mobile: horizontal tabs with short labels */
.view-selector {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.view-btn {
  all: unset;
  flex: 1 1 0;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  text-align: center;
  padding: 12px 8px;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  color: #fff;
  letter-spacing: 1px;
  font-weight: 700;
}

.num { display: none; }              
.label-full { display: none; }       
.label-short { display: inline; }    

.view-btn.active {
  border-bottom-color: var(--accent, #EDA249);
}

@media (hover: hover) {
  .view-btn:not(.active):hover {
    background: rgba(255,255,255,0.06);
  }
}

/* ========== DESKTOP (≥768px) ========== */
/* Desktop: vertical stack with numbers + full labels */
@media (min-width: 768px) {
  .selector {
    grid-area: selector;     
    justify-self: stretch;   
    align-self: start;      
    width: 100%;
  }

    .view-selector {
    display: flex;            
    flex-direction: column;   
    align-items: stretch;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    max-width: none;
  }


  .view-btn {
    grid-template-columns: auto 1fr;
    justify-items: start;
    gap: 18px;
    padding: 14px 18px;
    border: 1px solid rgba(255,255,255,0.25);
    border-bottom: 1px solid rgba(255,255,255,0.25); 
    background: transparent;
  }


  .num { 
    display: inline; 
    opacity: 0.6; 
    font-size: 0.9rem; 
  }

  .label-full { display: inline; }  
  .label-short { display: none; }    

  .view-btn.active {
    background: var(--accent, #EDA249);
    border-color: var(--accent, #EDA249);
    color: #0b0d17;
    border-bottom-color: var(--accent, #EDA249);
  }
}
</style>
