<template>
    <div class="row">
        <span class="rowNum">Batt.: {{rowNumber}}.</span>
        <process-battery
            v-for="unit of units"
            :key="unit.number"
            ref="units"
            :status="unit.status"
            @unit-finish="getUnitFinish"
        />
    </div>
</template>

<script>
import ProcessBattery from "@/components/ProcessBattery.vue";
import { useCounterStore } from '@/stores/counter';
import { mapState, mapActions } from 'pinia'

export default {
    name: "ProcessRow",
    components: {ProcessBattery},
    props: {
        rowNum: {
            type: Number,
            default: 0,
        },
    },
    expose: ['getTic', 'addUnit', 'changeStatus', 'actualStatus', 'rowNumber'],
    emits: ['row-unit-finish'],
    data() {
        return {
            rowNumber: 0,
            counter: 0,
            units: [],
            newStatusInd: 'ready',
            actualStatus: 'ready',
            statuses: {
                ready: {
                    name: 'ready',
                    steps: null,
                    step: 1,
                    charged: 100,
                    next: 'worker',
                    optional: 'charger',
                    number: 0,
                    allowTics: true,
                    rowNumber: 0,
                },
                empty: {
                    name: 'empty',
                    steps: null,
                    step: 1,
                    charged: 0,
                    next: 'in-charge',
                    optional: '',
                    number: 0,
                    allowTics: true,
                    rowNumber: 0,
                },
                incharge: {
                    name: 'incharge',
                    steps: 115,
                    step: 1,
                    charged: 0,
                    next: 'ready',
                    optional: 'worker',
                    number: 0,
                    allowTics: true,
                    rowNumber: 0,
                },
                worker: {
                    name: 'worker',
                    steps: 100,
                    step: 1,
                    charged: 100,
                    next: 'empty',
                    optional: '',
                    number: 0,
                    allowTics: true,
                    rowNumber: 0,
                },
                charger: {
                    name: 'charger',
                    steps: 140,
                    step: 1,
                    charged: 100,
                    next: 'empty',
                    optional: '',
                    number: 0,
                    allowTics: true,
                    rowNumber: 0,
                },
                trans: {
                    name: 'transparent',
                    steps: 0,
                    step: 1,
                    charged: 0,
                    next: 'ready',
                    optional: '',
                    number: 0,
                    allowTics: false,
                    rowNumber: 0,
                },
            },
        }
    },
    computed: {
        // note we are not passing an array, just one store after the other
        // each store will be accessible as its id + 'Store'
        ...mapState(useCounterStore, ['activeRowNum', 'generalCount']),
    },
    async mounted() {
        this.rowNumber = this.rowNum;
        this.setRowNum(this.rowNumber);
        await this.addUnit('trans', true);
        // console.log('Row.mounted.after_addUnit.units/rowNumber', this.units, this.rowNumber);
    },
    methods: {
        getTic() {
            if (this.$refs.units.length > 0) {
                this.$refs.units[this.$refs.units.length - 1].getTic();
            }
        },
        addUnit(status = 'ready', start = false) {
            this.setRowNum(this.rowNumber);
            this.counter++;
            let addStat = this.statuses[status];
            addStat.number = this.counter;
            addStat.rowNumber = this.rowNumber;
            if (start === true) {
                addStat.step = this.generalCount;
            }
            this.units.push({
                status: addStat,
            });
        },
        async changeStatus(newStatus) {
            this.setRowNum(this.rowNumber);
            this.setRowStatus(newStatus);
            await this.addUnit(newStatus);
            this.actualStatus = newStatus;
        },
        getUnitFinish(event) {
            this.setRowNum(this.rowNumber);
            this.$emit('row-unit-finish', event);
        },
        ...mapActions(useCounterStore, {
                setRowNum: 'setActiveRow',
                setRowStatus: 'setActualStatus',
            }),
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