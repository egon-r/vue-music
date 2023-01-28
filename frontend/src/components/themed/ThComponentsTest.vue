<script>
import ThProgress from "@/components/themed/ThProgress.vue"
import ThButton from "@/components/themed/ThButton.vue"
import ThCard from "@/components/themed/ThCard.vue"
import ThTextInput from "@/components/themed/ThTextInput.vue"
import ThSlider from "@/components/themed/ThSlider.vue"
import ThModal from "@/components/themed/ThModal.vue"

export default {
  name: "ThComponentsTest",
  components: { ThModal, ThSlider, ThTextInput, ThCard, ThButton, ThProgress },
  methods: {
    primaryClicked (e) {
      this.$refs.modal.show()
    }
  }
}
</script>

<template>
  <ThCard class="grid grid-cols-2 gap-4">
    <ThButton ref="buttonPrimary" color="primary" @click="primaryClicked">Primary</ThButton>
    <ThButton color="secondary">Secondary</ThButton>
    <ThProgress :progress=60></ThProgress>
    <ThProgress :progress=20 color="secondary"></ThProgress>
    <ThProgress :progress=-1></ThProgress>
    <ThProgress :progress=-1 color="secondary"></ThProgress>
    <ThButton color="primary" variant="transparent" class="material-icons">play_arrow</ThButton>
    <ThButton color="secondary" variant="transparent" class="material-icons">play_arrow</ThButton>
    <ThTextInput/>
    <ThTextInput color="secondary"/>
    <ThSlider/>
    <ThSlider/>
    <ThModal ref="modal">
      Popover Test
      <ThButton @click="this.$refs.modal.hide()">Popover Button</ThButton>
    </ThModal>
  </ThCard>
</template>

<style scoped>

</style>
