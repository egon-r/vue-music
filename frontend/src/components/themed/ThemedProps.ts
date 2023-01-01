
export const ThemedProps = {
  color: {
    type: String,
    required: false,
    default: "primary",
    validator: v => ["primary", "secondary"].indexOf(v) !== -1
  },
  variant: {
    type: String,
    required: false,
    default: "flat",
    validator: v => ["flat", "transparent"].indexOf(v) !== -1
  }
}
