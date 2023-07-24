<template>
    <div class="header-wrap">
        <div class="legend">
            <legend-battery
                v-for="stat of status"
                :key="stat"
                :status="stat"
            />
        </div>
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
            };
        },
    }
</script>

<style scoped>
.legend {
    width: 24rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.header-wrap {
    width: 40rem;
    display: flex;
    justify-content: space-between;
}
</style>