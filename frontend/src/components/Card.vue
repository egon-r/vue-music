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
      shadow-xl shadow-slate-400
      dark:bg-slate-700 dark:shadow-slate-800
    "
  >
    <div>{{ header }}</div>
    <div>{{ content }}</div>
    <slot></slot>
  </div>
</template>