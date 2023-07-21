<template>
    <div class="widget">
        <div><span>General Count: </span><span>{{getGeneralCount}}</span></div>
<!--        <div><span>Active Row: </span><span>{{getActiveRowNum}}</span></div>-->
<!--        <div><span>Row Status: </span><span>{{getActualStatus}}</span></div>-->
<!--        <div><span><b>Full Complete</b>: </span><span>{{getStoreComplete}}</span></div>-->
<!--        <div><span><b>Full Complete Log</b>:</span></div>-->
<!--        <div v-for="log of getStoreCompleteLog"><span>{{log}}</span></div>-->
<!--        <div><span>Process. Batteries: </span></div>-->
<!--        <div v-for="b of getBatteries"><span>Row Status: </span><span>{{b}}</span></div>-->
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useCounterStore } from '@/stores/counter';

export default {
    name: "ViewWidget",
    computed: {
        ...mapState(useCounterStore, {
            getActiveRowNum: 'activeRowNum',
            getGeneralCount: 'generalCount',
            getActualStatus: 'actualRowStatus',
            getBatteries: 'procBatts',
            getStoreComplete: 'storeComplete',
            getStoreCompleteLog: 'storeCompleteLog',
        }),
    },
}
</script>

<style scoped>
.widget {
    position: fixed;
    top: 0;
    right: 0;
    height: min-content;
    width: 11rem;
    padding: .3rem;
    border-bottom: #282828 1px solid;
    border-right: #282828 1px solid;
}
</style>