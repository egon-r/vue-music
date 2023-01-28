<script lang="ts">
import { ThemedProps } from "./ThemedProps"

export default {
  props: {
    color: ThemedProps.color
  },
  computed: {
    colorClass () {
      const obj = {}
      obj[this.color] = true
      return obj
    }
  }
}
</script>

<template>
  <div :class="colorClass">
    <slot></slot>
  </div>
</template>

<style scoped>
div.primary {
    @apply rounded-xl border p-4 m-4 truncate
        dark:border-primary-300 border-primary-800
        dark:bg-primary-100 bg-primary-900
    ;
}

div.secondary {
  @apply rounded-xl border p-4 m-4 truncate
  dark:border-secondary-300 border-secondary-800
  dark:bg-secondary-100 bg-secondary-900
  ;
}
</style>
