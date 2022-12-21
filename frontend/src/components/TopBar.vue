<script>
import ThemeToggle from "@/components/ThemeToggle.vue";

export default {
  name: "TopBar",
  components: { ThemeToggle },
};
</script>

<template>
  <div class="block h-16" />
  <div class="fixed top-0 z-10 flex h-16 w-full items-center bg-gray-800 px-4 py-2">
    <span class="text-2xl flex-initial mr-4">Vue Music</span>
    <div class="flex">
      <div class="w-20 text-center select-none hover:font-bold hover:cursor-pointer">Home</div>
      <div class="w-20 text-center select-none hover:font-bold hover:cursor-pointer">Library</div>
      <div class="w-20 text-center select-none hover:font-bold hover:cursor-pointer">Admin</div>
    </div>
    <div class="flex-grow"/>
    <ThemeToggle/>
  </div>
</template>

<style scoped></style>
