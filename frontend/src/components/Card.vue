<script>
export default {
  name: "card",
  props: {
    header: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div
    class="
      rounded-xl
      border-2 border-slate-400
      bg-slate-500
      p-4
      dark:bg-black
    "
  >
    <div>{{ header }}</div>
    <div>{{ content }}</div>
    <slot></slot>
  </div>
</template>