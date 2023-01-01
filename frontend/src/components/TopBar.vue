<script lang="ts">
import ThemeToggle from "@/components/ThemeToggle.vue"

export default {
  name: "TopBar",
  components: { ThemeToggle }
}
</script>

<template>
  <div class="block h-16" />
  <div
    class="
      fixed
      inset-x-0
      top-0
      z-10
      mx-auto
      flex
      h-16
      max-w-screen-xl
      items-center
      truncate
      border-b
      border-b-primary-300
      bg-secondary-800
      px-4
      py-2
      dark:bg-secondary-200
    "
  >
    <span class="mr-4 flex-initial whitespace-nowrap text-2xl">Vue Music</span>
    <div class="flex h-16">
      <router-link
        class="flex h-full items-center outline-none hover:font-bold"
        to="/"
      >
        <div class="w-20 select-none text-center">Home</div>
      </router-link>
      <router-link
        class="flex h-full items-center outline-none hover:font-bold"
        to="/library"
      >
        <div class="w-20 select-none text-center">Library</div>
      </router-link>
      <router-link
        class="flex h-full items-center outline-none hover:font-bold"
        to="/settings"
      >
        <div class="w-20 select-none text-center">Settings</div>
      </router-link>
    </div>
    <div class="grow" />
    <ThemeToggle />
  </div>
</template>

<style scoped>
.router-link-active {
  @apply cursor-default font-bold border-b-4 border-b-primary-600;
}
</style>
