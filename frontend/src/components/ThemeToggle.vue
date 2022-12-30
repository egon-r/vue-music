<script lang="ts">
import ThButton from "./themed/ThButton.vue"

export default {
  name: "ThemeToggle",
  components: { ThButton },
  data () {
    const initialTheme = this.getCurrentTheme()
    return {
      theme: {
        type: String,
        default: "auto",
        validator: (value) => {
          return ["dark", "light", "auto"].indexOf(value) !== -1
        }
      }
    }
  },
  mounted () {
    this.theme = this.getCurrentTheme()
    this.setThemeColors()
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
    setThemeColors () {
      document.documentElement.style.setProperty(
        "--primary-hue",
        this.$refs.primaryColorSelect.value
      )
      document.documentElement.style.setProperty(
        "--secondary-hue",
        this.$refs.secondaryColorSelect.value
      )
    },
    onClick () {
      this.toggleTheme()
    }
  }
}
</script>

<template>
  <div>
    primary:
    <input type="range" value="120" min="0" max="360" ref="primaryColorSelect" @input="setThemeColors"/>
  </div>
  <div>
    secondary:
    <input type="range" value="240" min="0" max="360" ref="secondaryColorSelect" @input="setThemeColors"/>
  </div>
  <ThButton
    @click="onClick"
    variant="transparent"
    class="aspect-square h-12 w-12 rounded-full"
  >
    <span v-if="theme === 'dark'" class="material-icons">light_mode</span>
    <span v-if="theme === 'light'" class="material-icons">dark_mode</span>
    <span v-if="theme === 'auto'" class="material-icons">brightness_auto</span>
  </ThButton>
</template>
