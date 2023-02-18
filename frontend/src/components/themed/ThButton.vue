<script>
import { ThemedProps } from "@/components/themed/ThemedProps"

export default {
  props: {
    color: ThemedProps.color,
    variant: ThemedProps.variant
  },
  computed: {
    cssClasses () {
      const obj = {}
      obj[this.color] = true
      obj[this.variant] = true
      return obj
    }
  }
}
</script>

<template>
  <button :class="cssClasses">
    <slot />
  </button>
</template>

<style scoped>
button {
  @apply flex justify-center items-center truncate outline-none;
}

button.transparent {
  @apply border-2 border-transparent py-1 px-4;
}

button.flat {
  @apply border-2 py-1 px-4;
}

button.primary:not(.transparent) {
  @apply
  dark:border-primary-300 border-primary-400
  dark:bg-primary-200 bg-primary-900;
}

button.primary.transparent:hover {
  @apply border-primary-600;
}

button.primary:hover:not(.transparent) {
  @apply border-primary-600
  dark:bg-primary-300 bg-primary-800;
}

button.primary:active:not(.transparent) {
  @apply dark:bg-primary-400 bg-primary-600;
}

button.primary.transparent:active {
  @apply text-primary-600;
}

button.primary:focus {
    @apply shadow shadow-primary-600;
}

button.secondary:not(.transparent) {
  @apply
  dark:border-secondary-300 border-secondary-400
  dark:bg-secondary-200 bg-secondary-900;
}

button.secondary:hover:not(.transparent) {
  @apply border-secondary-600
  dark:bg-secondary-300 bg-secondary-800
  ;
}

button.secondary:active:not(.transparent) {
  @apply dark:bg-secondary-400 bg-secondary-600;
}

button.secondary.transparent:hover {
  @apply border-secondary-600;
}

button.secondary.transparent:active {
  @apply text-secondary-600;
}

button.secondary:focus {
    @apply shadow shadow-secondary-600;
}
</style>
