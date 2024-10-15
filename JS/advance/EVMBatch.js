const endpoint = "YOUR_LOCAL_ETHEREUM_NODE";
const from = parseInt(""); //input a valid block number here
const to = parseInt(""); //input a valid block number here

async function EVMBatch() {
    const requests = [];
    for (let i = from; i < to; i++) {
        requests.push({
            method: "eth_getBlockByNumber",
            params: [`0x${i.toString(16)}`, false],
            id: i - from,
            jsonrpc: "2.0",
        });
    }
    try {
        const res = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(requests),
            headers: {"Content-Type": "application/json"},
        });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(data);
    }
}
