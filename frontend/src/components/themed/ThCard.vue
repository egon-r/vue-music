<script lang="ts">
export default {}
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
    @apply rounded-xl border p-4 m-4
        dark:border-secondary-300 border-secondary-800
        dark:bg-secondary-100 bg-secondary-900
    ;
}
</style>
