<template>
    <div class="absolute flex w-full h-18 bottom-0 bg-red-800">
        <div class="flex-initial bg-blue-600 m-1 flex-row">
            <div>
                Artist
            </div>
            <div>
                Title
            </div>
        </div>
        <div class="flex-1"></div>
        <div class="flex-initial bg-blue-600 m-1">
            Previous, Play/Pause, Next --------------o-------
        </div>
        <div class="flex-1"></div>
        <div class="flex-initial bg-blue-600 m-1">
            Volume, Current Queue
        </div>
    </div>
</template>

<script>
export default {
    name: "bottom-bar"
}
</script>