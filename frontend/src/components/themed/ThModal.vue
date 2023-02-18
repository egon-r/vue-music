<script>
export default {
  props: {
    hideOnFocusLoss: {
      default: true
    }
  },
  data () {
    return {
      visible: false,
      minShowDurationMs: 200,
      minShowTimeoutHandle: null
    }
  },
  mounted () {
    document.addEventListener("click", this.documentClicked)
  },
  unmounted () {
    document.removeEventListener("click", this.documentClicked)
  },
  methods: {
    documentClicked (e) {
      if (this.visible === true && this.hideOnFocusLoss === true) {
        const popoverClicked = this.$refs.popoverRoot.contains(e.target)
        if (!popoverClicked) {
          this.hide()
        }
      }
    },
    toggle () {
      if (this.visible) {
        this.hide()
      } else {
        this.show()
      }
    },
    show () {
      this.$refs.popoverRoot.style.display = "block"
      clearTimeout(this.minShowTimeoutHandle)
      this.minShowTimeoutHandle = setTimeout(() => {
        this.visible = true
      }, this.minShowDurationMs)
    },
    hide () {
      this.$refs.popoverRoot.style.display = "none"
      this.visible = false
    }
  }
}
</script>

<template>
  <div ref="popoverRoot" class="fixed z-50 hidden">
    <slot/>
  </div>
</template>

<style scoped>
</style>
