<template>
    <div class="block">
        <div
            :style="{width: step+'px'}"
            class="battery"
            :class="name"
        >{{startStep}}/{{ step }}</div>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter';
import { mapState } from 'pinia'

export default {
    name: "ProcessBattery",
    props: {
        status: {},
    },
    expose: ['step','getTic', 'allowTics'],
    emits: ['unit-finish'],
    data() {
        return {
            localStatus: {},
            allowTics: true,
            name: 'trans',
            steps: null,
            step: 1,
            charged: 0,
            next: 'worker',
            optional: 'charger',
            number: 0,
            rowNumber: 0,
            startStep: 0,
        }
    },
    computed: {
        // note we are not passing an array, just one store after the other
        // each store will be accessible as its id + 'Store'
        ...mapState(useCounterStore, {getGeneralCount:'generalCount'}),
    },
    watch: {
        allowTics(nVal) {
            // console.log('Unit.watch.allowTics.nVal/number', nVal, this.number);
        },
    },
    mounted() {
        this.localStatus = this.status;
        this.name = this.status.name;
        this.steps = this.status.steps;
        this.step = this.status.step;
        this.next = this.status.next;
        this.optional = this.status.optional;
        this.number = this.status.number;
        this.allowTics = this.status.allowTics;
        this.rowNumber = this.status.rowNumber;
        this.startStep = this.getGeneralCount;
        this.charged = this.status.charged;
    },
    methods: {
        getTic() {
            if (this.allowTics) {
                if (this.steps === null || this.steps > this.step) {
                    this.step++;
                }
            }
            if (this.allowTics) {
                if (this.name === 'worker' || this.name === 'charger') {
                    this.charged--;
                }
                if (this.name === 'incharge') {
                    this.charged++;
                }
            }
            if(
                (this.name === 'worker' || this.name === 'charger' || this.name === 'incharge')
                && this.step >= this.steps) {
                this.$emit('unit-finish', {next: this.next, parentNum: this.rowNumber});
            }
        },
    },
}
</script>

<style scoped>
.block {
    display: flex;
    flex-direction: column;
}
.battery {
    min-height: 1.5rem;
    margin-right: 0;
    overflow-x: hidden;
}
</style>