<template>
    <div class="header-wrap">
        <div class="legend">
            <legend-battery
                    v-for="stat of status"
                    :status="stat"/>
        </div>
        <div class="buttons-wrap">
            <button
                    class="ss-button butt-general"
                    :class="{'but-color':startDisable === false}"
                    :disabled="startDisable"
                    @click="generator"
            >Start</button>
            <button
                    class="butt-general"
                    :class="{'but-color':startDisable === true && stopDisable === false}"
                    :disabled="stopDisable"
                    @click="stopLoop">Stop</button>
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
            startDisable: false,
            stopDisable: true,
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
.buttons-wrap {
    display: flex;
    width: 30%;
}
.butt-general {
    border-radius: 5px;
    padding: 0 2rem;
    border: 1px solid violet;
}
.ss-button {
    margin-right: .5rem;
}
.but-color {
    background-color: chartreuse;
}
</style>