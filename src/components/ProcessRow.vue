<template>
    <div class="row">
        <span class="rowNum">{{rowNum}}.</span>
        <process-battery
            v-for="unit of units"
            :key="unit"
            ref="units"
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
        actualStatus: {
            type: String,
            default: 'ready'
        },
    },
    expose: ['getTic', 'addUnit', 'changeStatus', 'changeStatus'],
    data() {
        return {
            counter: 0,
            units: [],
            newStatusInd: 'ready',
            unit: {
                number: 0,
                status: 'ready',
            },
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
    methods: {
        getTic() {
            if (this.$refs.units) {
                for(let unit of this.$refs.units) {
                    unit.getTic();
                }}
        },
        addUnit(status) {
            // console.log('Row addUnit');
            this.counter++;
            this.unit.number = this.counter;
            this.unit.status = status;
            this.units.push(this.unit);
        },
        changeStatus(newStatus) {

        },
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

</style>