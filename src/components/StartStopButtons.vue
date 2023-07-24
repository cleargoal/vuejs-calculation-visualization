<template>
    <div class="buttons-wrap">
        <button
            class="ss-button butt-general"
            :class="{'start-color':ssButton, 'stop-color': !ssButton}"
            @click="start"
        >
            {{ buttName }}
        </button>
        <button
            class="butt-general reset-color"
            :disabled="!ssButton"
            @click="reset"
        >
            Reset
        </button>
    </div>
</template>

<script>
    import { mapActions } from 'pinia'
    import {useCounterStore} from "@/stores/counter";

    export default {
        name: "StartStopButtons",
        props: {
            ssButton: {  // StartStopButtons. true: Start able, false: Stop able;
                type: Boolean,
                default: true,
            },
        },
        emits: ['start'],
        data() {
            return {
                startDisable: false,
                stopDisable: true,

            };
        },
        computed: {
            buttName() {
                return this.ssButton ? 'Start' : 'Stop';
            },
        },
        methods: {
            start() {
                this.startDisable = true;
                this.stopDisable = false;
                this.$emit('start', this.ssButton);
            },
            reset() {
                this.stopDisable = true;
                this.startDisable = false;
                this.resetGeneral();
                // this.$emit('start', false);
            },
            ...mapActions(useCounterStore, {
                resetGeneral: 'resetGeneralCount',
                fullReset: 'fullReset',
            }),
        },
    }
</script>

<style scoped>
.buttons-wrap {
    display: flex;
    width: 30%;
}

.butt-general {
    border-radius: 5px;
    padding: 0 2rem;
    border: 1px solid violet;
    color: white;
    font-weight: bold;
    font-size: larger;
    cursor: pointer;
}

.ss-button {
    margin-right: .5rem;
}

.start-color {
    background-color: #0b0;
}
.stop-color {
    background-color: blue;
}
.reset-color {
    background-color: gray;
}
</style>