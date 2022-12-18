<template>
    <div class="bg-slate-500 dark:bg-slate-700 rounded-xl p-4 shadow-slate-400 dark:shadow-slate-800 shadow-xl border-slate-400 border-2">
        <div>{{header}}</div>
        <div>{{content}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "card",
    props: {
        header: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>