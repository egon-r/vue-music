<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "primary",
      validator: v => ["primary", "secondary"].indexOf(v) !== -1
    },
    variant: {
      type: String,
      required: false,
      default: "flat",
      validator: v => ["flat", "transparent"].indexOf(v) !== -1
    }
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
  @apply flex justify-center items-center truncate;
}

button.transparent {
  @apply border border-transparent py-1 px-4;
}

button.flat {
  @apply border-2 py-1 px-4;
}

button.primary:not(.transparent) {
  @apply
  dark:border-primary-300 border-primary-600
  dark:bg-primary-200 bg-primary-900;
}

button.primary.transparent:hover {
  @apply border-primary-400;
}

button.primary:hover:not(.transparent) {
  @apply border-primary-400
  dark:bg-primary-300 bg-primary-800;
}

button.primary:active:not(.transparent) {
  @apply dark:bg-primary-400 bg-primary-600;
}

button.primary:active {
    @apply text-primary-600;
}

button.secondary:not(.transparent) {
  @apply
  dark:border-secondary-300 border-secondary-600
  dark:bg-secondary-200 bg-secondary-900;
}

button.secondary:hover:not(.transparent) {
  @apply border-secondary-400
  dark:bg-secondary-300 bg-secondary-800
  ;
}

button.secondary:active:not(.transparent) {
  @apply dark:bg-secondary-400 bg-secondary-600;
}

button.secondary.transparent:hover {
    @apply border-secondary-400;
}

button.secondary:active {
    @apply text-secondary-600;
}
</style>
