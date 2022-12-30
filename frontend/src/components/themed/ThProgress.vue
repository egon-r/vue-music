<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true,
      default: 0
    },
    color: {
      type: String,
      required: false,
      default: "primary"
    }
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
  <div class="wrapper h-4 w-full truncate rounded-md border"
       :class="colorClass">
    <div v-if="progress >= 0" :class="color"
         class="bar h-full rounded-md"
         :style="{width: progress+'%'}"></div>
    <div v-else :class="colorClass" class="bar-indeterminate h-full"></div>
  </div>
</template>

<style scoped>
.wrapper.primary {
  @apply border-primary-600;
}

.wrapper.secondary {
  @apply border-secondary-600;
}

.bar.primary {
  @apply bg-primary-600;
}

.bar.secondary {
  @apply bg-secondary-600;
}

@keyframes indeterminate-anim {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}

.bar-indeterminate {
  @apply w-1/4;
  position: relative;
  left: -30%;
  animation: indeterminate-anim;
  animation-duration: 2s;
  animation-play-state: running;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.bar-indeterminate.primary {
  @apply bg-gradient-to-r from-transparent via-primary-600 to-transparent;
}

.bar-indeterminate.secondary {
  @apply bg-gradient-to-r from-transparent via-secondary-600 to-transparent;
}
</style>
