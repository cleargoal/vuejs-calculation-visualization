<template>
    <div class="flex mb-4">
        <div>
            <h2>Legend: </h2>
            <the-legend />
        </div>
        <start-stop-buttons
            :ss-button="isStart"
            @start="startStop"
        />
    </div>
    <div class="process">
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
    import TheLegend from "@/components/TheLegend.vue";
    import StartStopButtons from "@/components/StartStopButtons.vue";
    import { useCounterStore } from '@/stores/counter';
    import { mapState, mapActions } from 'pinia'

    export default {
        name: "TheProcess",
        components: {ProcessRow, TheLegend, StartStopButtons},
        data() {
            return {
                interval: false,
                batteryRow: 0,
                batteries: [],
                startStatus: 'ready',
                startDisable: false,
                stopDisable: true,
                fullComplete: 0,
                charging: [],
                isStart: true, // StartStopButtons. true: Start able, false: Stop able;
            }
        },
        computed: {
            ...mapState(useCounterStore, {
                getActiveRowNum:'activeRowNum',
                getGeneralCount: 'generalCount',
            }),

        },
        methods: {
            ...mapActions(useCounterStore, {
                setGeneral: 'setGeneralCount',
                setBatteries: 'setProcBatteryRow',
                setFullComplete: 'setStoreComplete',
                resetGeneral: 'resetGeneralCount',
                fullReset: 'fullReset',
            }),
            startStop(ev) {
                if (ev) {
                    this.fullReset();
                    this.generator();
                }
                else {
                    this.stopLoop();
                }
            },
            async generator() {
                this.interval = true;
                this.isStart = false;
                await this.loop();
            },
            async loop() {
                setTimeout(() => {
                    if (this.interval) {
                        this.loop();
                    }
                }, 10);

                this.setGeneral();
                await this.processing();

                for (let eachRow of this.$refs.rows) {
                    eachRow.getTic();
                }

                if (this.batteries.length > 11) {
                    this.stopLoop();
                }
            },
            stopLoop() {
                this.interval = false;
                this.resetGeneral();
                this.isStart = true;
                // console.log(this.charging);
            },
            addBatteryRow() {
                this.batteryRow++;
                this.batteries.push({
                    number: this.batteryRow,
                    status: 'ready',
                });
                this.setBatteries(this.batteryRow, 'ready', 'add');
            },
            async processing() {
                const worker = this.$refs.rows ? this.$refs.rows.find(row => row.actualStatus === 'worker') : null;
                const ready = this.$refs.rows ? this.$refs.rows.find(row => row.actualStatus === 'ready') : null;
                const empty = this.$refs.rows ? this.$refs.rows.find(row => row.actualStatus === 'empty') : null;
                const incharge = this.$refs.rows ? this.$refs.rows.find(row => row.actualStatus === 'incharge') : null;
                const charger = this.$refs.rows ? this.$refs.rows.find(row => row.actualStatus === 'charger') : null;

                if (!worker && !ready) {
                    await this.addBatteryRow();
                }
                if (!worker && ready) {
                    await this.changeRowStatus(ready, 'worker');
                }
                if (empty && !ready && !charger) {
                    await this.addBatteryRow();
                }

                // let countChargers = 0;
                let countEmpties = [];
                this.$refs.rows.forEach((item) => {
                    //     item.actualStatus === 'charger' ? countChargers++ : 0;
                    item.actualStatus === 'empty' ? countEmpties.push(item) : null;
                });

                if (empty && ready) {
                    // if (countChargers < countEmpties) {
                    countEmpties.forEach(item => {
                        this.callCheckCharging(item, ready);
                    });
                // }
                }

                if (empty && charger && !incharge) {
                    const scalp = {
                        genStep: this.getGeneralCount,
                        first: this.$refs.rows[0],
                        sec: this.$refs.rows[1],
                        third: this.$refs.rows[2],
                        forth: this.$refs.rows[3],
                    };
                    console.log(scalp);
                    await this.changeRowStatus(empty, 'incharge');
                }

                if (ready && worker && incharge && charger) {
                    this.fullComplete++;
                    this.setFullComplete(this.fullComplete);
                    if (this.fullComplete > 4) {
                    // this.stopLoop();
                    }
                }
            },
            async changeRowStatus(batteriesRow, newStatus) {
                this.batteries[batteriesRow.rowNumber - 1].status = newStatus;
                this.setBatteries(batteriesRow.rowNumber - 1, newStatus, 'che');
                // console.log('Process.async changeRowStatus.batteriesRow: rowNumber/actualStatus', batteriesRow.rowNumber, batteriesRow.actualStatus);
                if (batteriesRow.actualStatus === 'incharge' || batteriesRow.actualStatus === 'charger') {
                    this.removeFromCharging(batteriesRow.actualStatus, batteriesRow.rowNumber);
                }
                await this.$refs.rows[batteriesRow.rowNumber - 1].changeStatus(newStatus);
            },
            async getRowUnitFinish(event) {
                if (event.next === 'ready' || event.next === 'empty') {
                    this.batteries[event.parentNum - 1].status = event.next;
                    await this.$refs.rows[event.parentNum - 1].changeStatus(event.next);
                }
            },
            async callCheckCharging(empty, ready) {
                if (!this.checkCharging(empty.rowNumber)) {
                    await this.changeRowStatus(ready, 'charger');
                    await this.changeRowStatus(empty, 'incharge');
                    this.addToCharging(empty.rowNumber, ready.rowNumber);
                // console.log('charging:empty/ready', empty.rowNumber, ready.rowNumber);
                }
            },
            addToCharging(empty, ready) {
                this.charging.push({empty: empty, ready: ready});
            },
            checkCharging(empty) {
                return this.charging.find(item =>  item.empty === empty);
            },
            removeFromCharging(key, value) { // key: 'empty'(incharge status) or 'ready'(charger status), value: 'rowNumber'
                this.charging.splice(this.charging.findIndex(item => item[key] === value), 1);
                console.log('charging.length, removeFromCharging(key, value)', this.charging.length, key, value);
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
.flex {display: flex;}
.mb-4 {margin-bottom: 1rem;}
</style>