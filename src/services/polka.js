const log = require('../lib/log');
const config = require('config');
const axios = require("axios");

function performNodeRequest(res, apiURL, data) {
    const axiosConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    axios
        .post(apiURL, JSON.stringify(data), axiosConfig)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            log.error(error);
            res.status(500).send('An error has been encountered while processing request.')
        });
}

function metadata(req, res) {
    const max = 1000000;
    const min = 1;

    const apiUrl = `http://${config.server.address}:${config.server.port}`;
    const data = {
        jsonrpc: "2.0",
        method: "state_getMetadata",
        params: [],
        id: Math.floor(Math.random() * (max - min + 1)) + min
    };
    performNodeRequest(res, apiUrl, data);
}

function runtimeVersion(req, res) {
    const max = 1000000;
    const min = 1;

    const apiUrl = `http://${config.server.address}:${config.server.port}`;
    const data = {
        jsonrpc: "2.0",
        method: "state_getRuntimeVersion",
        params: [],
        id: Math.floor(Math.random() * (max - min + 1)) + min
    };
    performNodeRequest(res, apiUrl, data);
}

function header(req, res) {
    const max = 1000000;
    const min = 1;

    const apiUrl = `http://${config.server.address}:${config.server.port}`;
    const data = {
        jsonrpc: "2.0",
        method: "chain_getHeader",
        params: [],
        id: Math.floor(Math.random() * (max - min + 1)) + min
    };
    performNodeRequest(res, apiUrl, data);
}

function submittx(req, res) {
    let body = '';
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        const processedBody = JSON.parse(body)
        const { rawtx } = processedBody;
        const max = 1000000;
        const min = 1;

        const apiUrl = `http://${config.server.address}:${config.server.port}`;
        const data = {
            jsonrpc: "2.0",
            method: "author_submitExtrinsic",
            params: [rawtx],
            id: Math.floor(Math.random() * (max - min + 1)) + min
        };
        performNodeRequest(res, apiUrl, data);
    });
}


module.exports = {
    metadata,
    runtimeVersion,
    header,
    submittx
}