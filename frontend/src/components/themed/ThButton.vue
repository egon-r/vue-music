<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
      default: "primary"
    }
  }
}
</script>

<template>
  <button :class="color" @click="$emit('click')">
    <slot/>
  </button>
</template>

<style scoped>
button {
    @apply border py-1 px-4
      dark:border-primary-300 border-primary-300
      dark:bg-primary-200 bg-primary-900
    ;
}
button:hover {
    @apply border border-primary-400
      dark:bg-primary-300 bg-primary-800
    ;
}
button:active {
    @apply border
      dark:bg-primary-400 bg-primary-600
    ;
}

button.secondary {
    @apply border py-1 px-4
      dark:border-secondary-300 border-secondary-300
      dark:bg-secondary-200 bg-secondary-900
    ;
}
button.secondary:hover {
    @apply border border-secondary-400
    dark:bg-secondary-300 bg-secondary-800
    ;
}
button.secondary:active {
    @apply border
      dark:bg-secondary-400 bg-secondary-600
    ;
}
</style>
