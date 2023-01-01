<script lang="ts">
import ThButton from "./themed/ThButton.vue"
import { ApplyTheme, AppSettings, Themes } from "./data/AppSettings"

export default {
  name: "ThemeToggle",
  components: { ThButton },
  data () {
    return {
      themesEnum: Themes,
      appSettings: AppSettings
    }
  },
  methods: {
    toggleTheme () {
      if (this.appSettings.theme === Themes.DARK) {
        this.appSettings.theme = Themes.LIGHT
      } else {
        this.appSettings.theme = Themes.DARK
      }
      ApplyTheme()
    }
  }
}
</script>

<template>
  <ThButton
    @click="toggleTheme"
    variant="transparent"
    class="aspect-square h-12 w-12 rounded-full"
  >
    <span v-if="appSettings.theme === themesEnum.LIGHT" class="material-icons">dark_mode</span>
    <span v-if="appSettings.theme === themesEnum.DARK" class="material-icons">light_mode</span>
  </ThButton>
</template>
