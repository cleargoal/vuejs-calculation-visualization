import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
    state: () => ({
        activeRowNum: 0,
        generalCount: 0,
        actualRowStatus: 'ready',
        procBatts: [],
        storeComplete: 0,
        storeCompleteLog: [],
    }),
    getters: {
        doubleCount: (state) => state.activeRowNum,
    },
    actions: {
        setActiveRow(newRow) {
            this.activeRowNum = newRow;
        },
        setGeneralCount() {
            this.generalCount++;
        },
        setActualStatus(status) {
            this.actualRowStatus = status;
        },
        setProcBatteryRow(rowNum, status, operation) {
            if (operation === 'add') {
                this.procBatts.push(status);
            }
            else {
                this.procBatts[rowNum] = status;
            }
        },
        setStoreComplete(newVal) {
            this.storeComplete = newVal;
            this.storeCompleteLog.push({
                newVal: newVal,
                gStep: this.generalCount,
                procState: this.procBatts,
            });
        }
    },
})