import ThemeToggle from "./ThemeToggle.vue"

export default {
  component: ThemeToggle,
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "auto"]
    }
  }
}

export const Template = (args) => ({
  components: { ThemeToggle },
  setup () {
    return { args }
  },
  template: '<ThemeToggle v-bind="args"/>'
})
