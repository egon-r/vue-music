<script>
import { ThemedProps } from "@/components/themed/ThemedProps"

export default {
  props: {
    modelValue: {
      type: String
    },
    color: ThemedProps.color
  },
  emits: ["update:modelValue"],
  computed: {
    cssClasses () {
      const obj = {}
      obj[this.color] = true
      return obj
    }
  }
}
</script>

<template>
  <input type="text" placeholder="..." :class="cssClasses"
         :value="modelValue"
         @input="$emit('update:modelValue', $event.target.value)" />
</template>

<style scoped>
input {
  @apply border-2 px-2 py-1 outline-none;
}

input.primary {
  @apply dark:border-primary-300 border-primary-400
  dark:bg-primary-200 bg-primary-900;
}

input.primary:hover {
  @apply dark:border-primary-400 dark:bg-primary-200;
}

input.primary:focus {
  @apply shadow shadow-primary-600;
}

input.secondary {
  @apply border-secondary-300 bg-secondary-100;
}

input.secondary:hover {
  @apply dark:border-secondary-400 dark:bg-secondary-200;
}

input.secondary:focus {
  @apply shadow shadow-secondary-600;
}
</style>
