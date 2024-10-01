class EventLogger {
    constructor() {
        this.startTime = null;
        this.timeout = 0;
        this.logRequests = [];
        this.deliveryInterval = 1000;
        this.isThrottled = false;
    }

    initializeStartTime() {
        this.startTime = Date.now();
    }

    setTimeout(timeout) {
        this.timeout = timeout;
    }

    setDeliveryInterval(deliveryInterval) {
        this.deliveryInterval = deliveryInterval;
    }

    getRequest(body) {
        const elapsedTime = Date.now() - this.startTime;
        const logMessage = `Event: ${body.event}, Details: ${body.details}, Elapsed Time: ${elapsedTime} ms`;
        let logRequest = {
            aborted: false,
            abort: () => {
                logRequest.aborted = true;
                console.log(`Request: ${body.event} aborted`);
            },
        };
        const sendLogRequest = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (!logRequest.aborted) {
                        console.log(logMessage);
                    }
                    resolve();
                }, this.timeout);
            });
        };
        return {logRequest, sendLogRequest};
    }

    sendRequest(body) {
        const logRequest = this.getRequest(body);
        this.logRequests.push(logRequest);
        this.batchRequest();
        return logRequest.logRequest;
    }

    // modify throttle
    async batchRequest() {
        if (this.isThrottled) {
            return;
        }
        this.isThrottled = true;
        for (const request of this.logRequests) {
            if (request.aborted) continue;
            await request.sendLogRequest();
        }
        this.logRequests = [];
        setTimeout(() => {
            this.isThrottled = false;
            if (this.logRequests.length > 0) {
                this.batchRequest();
            }
        }, this.deliveryInterval);
    }
}
