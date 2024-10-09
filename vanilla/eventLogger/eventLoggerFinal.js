import {sendRequest} from "./utils";

export class EventLogger {
    constructor() {
        this.eventsQueue = [];
        this.timeout = null;
        this.interval = 1000;
        this.isSending = false;
        this.abortController = null;
        this.requestTimeoutDuration = 5000;
    }

    setNewInterval = (newInterval) => {
        this.interval = newInterval;
    };

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

        this.isAborted = false; // Reset the abort flag

        try {
            const requestPromise = sendRequest({events: eventsToSend});
            this.currentRequest = requestPromise; // Track the current request

            const requestTimeout = setTimeout(() => {
                if (this.currentRequest && this.currentRequest.abort) {
                    this.currentRequest.abort(); // Abort the request if it takes too long
                    this.isAborted = true; // Set the abort flag
                }
            }, this.requestTimeoutDuration);

            await requestPromise; // Wait for the request to complete
            clearTimeout(requestTimeout); // Clear timeout if request completes in time
        } finally {
            this.isSending = false;
            this.currentRequest = null;

            if (this.isAborted) {
                // If the request was aborted, merge the aborted batch with the next batch
                this.eventsQueue = [...eventsToSend, ...this.eventsQueue];
            }

            if (this.eventsQueue.length > 0) {
                this.processBatch(); // Process the next batch if there are more events
            } else {
                this.timeout = null;
            }
        }
    }
}

const eventLogger = new EventLogger();
export {eventLogger};
