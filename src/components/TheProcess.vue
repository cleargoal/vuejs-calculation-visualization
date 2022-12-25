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
            @row-unit-finish="getRowUnitFinish"
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
            }, 10);

            await this.processing();

            for (let eachRow of this.$refs.rows) {
                eachRow.getTic();
            }

            if (this.batteries.length > 17) {
                this.stopLoop();
            }
        },
        stopLoop() {
            this.interval = false;
            this.stopDisable = true;
        },
        addBatteryRow() {
            this.batteryRow++;
            this.batteries.push({
                number: this.batteryRow,
                status: 'ready',
            });
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
                console.log('processing: created Ready');
                this.processAddUnit();
            }
            if (empty && ready) {
                this.changeRowStatus(empty, 'incharge');
                this.changeRowStatus(ready, 'charger');
            }
            if (empty && !charger) {
                await this.addBatteryRow();
                console.log('processing: create Charger');
                this.processAddUnit();
            }
        },
        processAddUnit() {
            for (let eachRow of this.$refs.rows) {
                if (!eachRow.$refs.units) {
                    eachRow.addUnit();
                }
            }
        },
        changeRowStatus(batteriesRow, newStatus) {
            console.log('batteriesRow', batteriesRow);
            let rowCurrent = null;
            if (batteriesRow.status) {
                // console.log('batteriesRow.status');
                rowCurrent = this.$refs.rows.find(row => row.actualStatus === batteriesRow.status);
                console.log('Process.changeRowStatus.rowCurrent.status', rowCurrent);
            }
            if (batteriesRow.actualStatus) {
                // console.log('batteriesRow.actualStatus');
                rowCurrent = this.$refs.rows.find(row => row.actualStatus === batteriesRow.actualStatus);
                console.log('Process.changeRowStatus.rowCurrent.actualStatus', rowCurrent);
            }
            if (rowCurrent !== undefined && rowCurrent !== null) {
                rowCurrent.changeStatus(newStatus);
                batteriesRow.status = newStatus;
            }
        },
        getRowUnitFinish(event) {
            const rowCurrent = this.batteries.find(elem => elem.number === event.rowNum);
            console.log('Process. UnitFinish: rowCurrent, rowCurrent.status, event.nextStatus', rowCurrent, rowCurrent.status, event.nextStatus);
            rowCurrent.status = event.nextStatus;
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
    margin-bottom: 1rem;
}
.ss-button {
    padding: .5rem;
    margin-right: .5rem;
}
.but-color {
    background-color: chartreuse;
}
</style>