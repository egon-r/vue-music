<script>
import { ThemedProps } from "@/components/themed/ThemedProps"

export default {
  props: {
    color: ThemedProps.color
  }
}
</script>

<template>
  <input type="range" />
</template>

<style scoped>
input[type=range] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}
input[type=range]:hover {
  @apply cursor-pointer;
}

/* Firefox */
input[type=range]::-moz-range-progress {
  -webkit-appearance: none;
  appearance: none;
  @apply bg-primary-600;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
  @apply bg-primary-600 border-0 h-4 w-4 rounded-full;
}

input[type=range]:hover::-moz-range-thumb {
  @apply h-5 w-5;
}

input[type=range]::-moz-range-track {
  -webkit-appearance: none;
  appearance: none;
  @apply bg-secondary-600 h-1 rounded;
}

/* Webkit */
input[type=range]::-webkit-progress-value {
  -webkit-appearance: none;
  appearance: none;
  @apply bg-primary-600;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
  @apply bg-primary-600 border-0 h-4 w-4 rounded-full;
}

input[type=range]:hover::-webkit-slider-thumb {
  @apply h-5 w-5;
}

input[type=range]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  appearance: none;
  @apply bg-secondary-600 h-1 rounded;
}
</style>
