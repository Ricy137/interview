// DO NOT EDIT
export let startTime = Date.now();
let fetchTimeout = 0;

export function _initializeStartTime() {
    startTime = Date.now();
}

export function _setFetchResponseDelay(timeout = 0) {
    fetchTimeout = timeout;
}

export function _resetFetchResponseDelay() {
    fetchTimeout = 0;
}

export function sendRequest(body) {
    let fetchTimeoutId = undefined;

    const fetchPromise = new Promise((resolve) => {
        fetchTimeoutId = setTimeout(() => {
            resolve();
        }, fetchTimeout);
    });

    const logPayload = JSON.stringify(body, null, 2);

    fetchPromise.then(() => {
        console.log(`[${Date.now() - startTime}ms]\n`, logPayload);
    });

    fetchPromise.abort = () => {
        clearTimeout(fetchTimeoutId);
        console.log(`[${Date.now() - startTime}ms][ABORTED]\n`, logPayload);
    };

    return fetchPromise;
}
