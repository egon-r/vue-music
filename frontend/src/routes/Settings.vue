<script>
import { defineComponent } from "vue"
import {
  ApplyTheme,
  AppSettings,
  SaveAppSettings
} from "@/components/data/AppSettings"
import ThCard from "@/components/themed/ThCard.vue"
import ThComponentsTest from "@/components/themed/ThComponentsTest.vue"
import ThTextInput from "@/components/themed/ThTextInput.vue"
import RequestStatusIndicator from "@/components/RequestStatusIndicator.vue"

export default defineComponent({
  methods: { ApplyTheme },
  components: { RequestStatusIndicator, ThTextInput, ThComponentsTest, ThCard },
  data () {
    return {
      appSettings: AppSettings,
      saveTimeoutHandle: null
    }
  },
  watch: {
    appSettings: {
      deep: true,
      handler () {
        clearTimeout(this.saveTimeoutHandle)
        this.saveTimeoutHandle = setTimeout(() => {
          SaveAppSettings()
        }, 500)
      }
    }
  }
})
</script>

<template>
  <div class="p-4">
    <ThCard>
      <div>
        primary:
        <input type="range" v-model="appSettings.primaryHue" min="0" max="360"
               @input="ApplyTheme" />
      </div>
      <div>
        secondary:
        <input type="range" v-model="appSettings.secondaryHue" min="0" max="360"
               @input="ApplyTheme" />
      </div>
      <div class="flex items-center gap-2">
        Backend:
        <ThTextInput color="secondary" v-model="appSettings.backendHostPort" placeholder="host:port" />
        <RequestStatusIndicator :request-url="appSettings.backendHttpBase()" />
      </div>
    </ThCard>
    <ThComponentsTest />
  </div>
</template>

<style scoped></style>
