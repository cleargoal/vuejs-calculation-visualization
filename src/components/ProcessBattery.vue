<template>
    <div class="block">
        <div>{{status.name}}</div>
        <div
            :style="{width: step+'px'}"
            class="battery"
            :class="this.status.name"
        ></div>
        <div>step: {{step}}</div>
        <div>statusSteps: {{status.steps}}</div>
    </div>
</template>

<script>
export default {
    name: "ProcessBattery",
    props: {
        status: {},
    },
    expose: ['step','getTic'],
    data() {
        return {
            step: 1,
            statusSteps: null,
        }
    },
    computed: {
        setChangeStatus() {
            // return this.step === this.statusSteps ? this.changeStatus() : false;
        },
    },
    watch: {
        status(val) {
            console.log('status', val);
        },
        step(val) {
            return this.step === this.statusSteps ? this.changeStatus() : false;
        },
    },
    mounted() {
        this.statusSteps = this.status.steps;
        console.log('mounted status', this.status);
    },
    methods: {
        getTic() {
            if (this.statusSteps === this.status.steps) {
                this.step++;
            }
        },
        changeStatus() {
            alert('change status');

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