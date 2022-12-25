<template>
    <div class="row">
        <span class="rowNum">Batt.: {{rowNumber}}.</span>
        <process-battery
            v-for="unit of units"
            :key="unit"
            ref="units"
            :status="statuses[actualStatus]"
            @unit-finish="getUnitFinish"
        />
    </div>
</template>

<script>
import ProcessBattery from "@/components/ProcessBattery.vue";
export default {
    name: "ProcessRow",
    components: {ProcessBattery},
    props: {
        rowNum: {
            type: Number,
            default: 0,
        },
    },
    expose: ['getTic', 'addUnit', 'changeStatus', 'actualStatus', 'rowNum'],
    emits: ['row-unit-finish'],
    data() {
        return {
            rowNumber: 0,
            counter: 0,
            units: [],
            newStatusInd: 'ready',
            unit: {
                number: 0,
                status: 'ready',
            },
            actualStatus: 'ready',
            statuses: {
                ready: {
                    name: 'ready',
                    steps: false,
                    next: 'worker',
                    optional: 'charger',
                },
                empty: {
                    name: 'empty',
                    steps: false,
                    next: 'in-charge',
                    optional: '',
                },
                incharge: {
                    name: 'incharge',
                    steps: 115,
                    next: 'ready',
                    optional: 'worker',
                },
                worker: {
                    name: 'worker',
                    steps: 100,
                    next: 'empty',
                    optional: '',
                },
                charger: {
                    name: 'charger',
                    steps: 140,
                    next: 'empty',
                    optional: '',
                },
            },
        }
    },
    mounted() {
        this.rowNumber = this.rowNum;
    },
    methods: {
        getTic() {
            if (this.$refs.units) {
                for(let unit of this.$refs.units) {
                    unit.getTic();
                }}
        },
        addUnit(status) {
            console.log('Row addUnit');
            this.counter++;
            this.unit.number = this.counter;
            this.unit.status = status;
            this.units.push(this.unit);
        },
        async changeStatus(newStatus) {
            console.log('Row. newStatus', newStatus);
            this.actualStatus = newStatus;
            await this.addUnit(newStatus);
        },
        getUnitFinish(nextStatus) {
            this.$emit('row-unit-finish', {nextStatus: nextStatus, rowNum: this.rowNum});
        }
    },
}
</script>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
}
.rowNum {
    margin-right: .2rem;
    font-weight: bold;
}
.labels {
    display: flex;
    flex-direction: column;
    margin-left: -6rem;
    margin-top: -4rem;
}
</style>