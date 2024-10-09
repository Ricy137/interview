import {sendRequest} from "./utils";

export class EventLogger {
    constructor() {
        this.eventsQueue = [];
        this.timeout = null;
        this.interval = 1000;
        this.isSending = false;
    }

    setNewInterval = (newInterval) => {
        this.interval = newInterval;
    };

    // Simple version
    // logEvent(eventName, data) {
    //     this.eventsQueue.push({
    //         eventName,
    //         hostname: window.location.hostname,
    //         timestamp: new Date().toISOString(),
    //         data,
    //     });
    //     // if no batch scheduled now, schedule one
    //     // TODO: if it's in throttle style, actually, we need to trigger one in the begining then setTimeout to clear
    //     if (!this.timeout) {
    //         this.timeout = setTimeout(() => {
    //             sendRequest({
    //                 events: [...this.eventsQueue],
    //             });
    //             this.eventsQueue = [];
    //             this.timeout=null;
    //         }, this.interval);
    //     }
    // }

    // what if we need to ensure that the next batch won't be sent until the previous batch is sent
    logEvent(eventName, data) {
        this.eventsQueue.push({
            eventName,
            hostname: window.location.hostname,
            timestamp: new Date().toISOString(),
            data,
        });
        if (!this.timeout) {
            this.timeout = setTimeout(() => this.processBatch(), this.interval);
        }
    }

    async processBatch() {
        if (this.eventsQueue.length === 0 || this.isSending) return;
        this.isSending = true;
        const eventsToSend = [...this.eventsQueue];
        this.eventsQueue = [];
        try {
            await sendRequest({events, eventsToSend});
        } finally {
            this.isSending = false;
            if (this.eventsQueue.length > 0) {
                this.processBatch();
            } else {
                this.timeout = null;
            }
        }
    }
}

const eventLogger = new EventLogger();
export {eventLogger};
