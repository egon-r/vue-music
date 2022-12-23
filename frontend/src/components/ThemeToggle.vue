<script lang="ts">
export default {
  name: "ThemeToggle",

  props: {
    theme: {
      type: String,
      default: "auto",
      validator: (value) => {
        return ["dark", "light", "auto"].indexOf(value) !== -1
      }
    }
  },

  methods: {
    getCurrentTheme () {
      if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark")
          return "dark"
        } else {
          return "light"
        }
      } else {
        console.log("window.matchMedia() not supported!")
      }
      return "auto"
    },

    toggleTheme () {
      if (this.theme === "dark") {
        this.theme = "light"
        document.documentElement.classList.remove("dark")
      } else {
        this.theme = "dark"
        document.documentElement.classList.add("dark")
      }
    },

    onClick () {
      this.toggleTheme()
    }
  },

  data () {
    const initialTheme = this.getCurrentTheme()
    return {
      theme: initialTheme
    }
  }
}
</script>

<template>
  <button
    @click="onClick"
    class="
      aspect-square
      h-12
      w-12
      rounded-full
      border-2 border-slate-900
      bg-slate-600
      pt-1
      hover:bg-slate-500
      active:bg-slate-700
      dark:border-slate-300
    "
  >
    <span v-if="theme === 'dark'" class="material-icons">light_mode</span>
    <span v-if="theme === 'light'" class="material-icons">dark_mode</span>
    <span v-if="theme === 'auto'" class="material-icons">brightness_auto</span>
  </button>
</template>
