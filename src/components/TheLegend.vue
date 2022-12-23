<template>
    <div class="legend">
        <legend-battery
            v-for="stat of status"
            :status="stat"/>
    </div>
</template>

<script>
import LegendBattery from "@/components/LegendBattery.vue";

export default {
    name: "TheLegend",
    components: {LegendBattery},
    data() {
        return{
            status: ['ready', 'worker', 'empty', 'incharge', 'charger',],
        }
    },
}
</script>

<style scoped>
.legend {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>