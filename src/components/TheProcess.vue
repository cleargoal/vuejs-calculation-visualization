<template>
    <div class="process">
        <div class="buttons-wrap">
            <button
                class="ss-button"
                :class="{'but-color':startDisable === false}"
                :disabled="startDisable"
                @click="generator"
            >Start</button>
            <button
                :class="{'but-color':startDisable === true && stopDisable === false}"
                :disabled="stopDisable"
                @click="stopLoop">Stop</button>
        </div>
        <process-row
            v-for="row of batteries"
            :key="row.number"
            ref="rows"
            :row-num="batteryRow"
        />
    </div>
</template>

<script>
import ProcessRow from "@/components/ProcessRow.vue";
export default {
    name: "TheProcess",
    components: {ProcessRow},
    data() {
        return {
            interval: false,
            batteryRow: 0,
            batteries: [],
            startStatus: 'ready',
            rowObj: {
                number: 0,
                status: 'ready',
            },
            startDisable: false,
            stopDisable: true,
        }
    },
    computed: {

    },
    mounted() {
        // console.log('mounted');
    },
    methods: {
        async generator() {
            this.startDisable = true;
            this.stopDisable = false;
            this.interval = true;
            await this.loop();
        },
        async loop() {
            setTimeout(() => {
                if (this.interval) {
                    this.loop();
                }
            }, 200);

            await this.processing();

            for (let eachRow of this.$refs.rows) {
                eachRow.getTic();
            }
        },
        stopLoop() {
            this.interval = false;
            this.stopDisable = true;
        },
        addBatteryRow() {
            this.batteryRow++;
            this.rowObj.number = this.batteryRow;
            console.log('addBatteryRow.rowObj', this.rowObj);
            this.batteries.push(this.rowObj);
        },
        async processing() {
            const worker = this.batteries.find(row => row.status === 'worker');
            const ready = this.batteries.find(row => row.status === 'ready');
            const charger = this.batteries.find(row => row.status === 'charger');
            const empty = this.batteries.find(row => row.status === 'empty');
            const incharge = this.batteries.find(row => row.status === 'incharge');

            if (ready && !worker) {
                this.changeRowStatus(ready, 'worker');
            }
            if (!worker && !ready) {
                await this.addBatteryRow();
                console.log('processing.addBatteryRow', this.$refs.rows);
                // for (let eachRow of this.$refs.rows) {
                //     eachRow.addUnit();
                // }
            }
        },
        changeRowStatus(batteriesRow, newStatus) {
            console.log(this.$refs.rows);
            const rowCurrent = this.$refs.rows.find(row => row.actualStatus === 'ready');
            console.log('rowCurrent', rowCurrent);
            // rowCurrent.changeStatus(newStatus);
            // batteriesRow.status = newStatus;
        },
    },
}
</script>

<style scoped>
.process {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.buttons-wrap {
    display: flex;
    width: 30%;

}
.ss-button {
    padding: .5rem;
    margin-right: .5rem;
}
.but-color {
    background-color: chartreuse;
}
</style>