<template>
    <div class="battery" :class="this.status">{{status}}</div>
</template>

<script>
export default {
    name: "LegendBattery",
    props: {
        status: null,
    },
}
</script>

<style scoped>
.battery {
    min-height: 1.5rem;
    min-width: 3rem;
    border: gray 1px solid;
    border-radius: 3px;
    padding: .5rem;
    font-size: medium;
}
</style>