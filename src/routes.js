const polka = require('./services/polka');

module.exports = (app) => {
    app.get('/metadata', function (req, res) {
        polka.metadata(req, res)
    })
    app.get('/runtime', function (req, res) {
        polka.runtimeVersion(req, res)
    })
    app.get('/header', function (req, res) {
        polka.header(req, res)
    })
    app.get('/nonce/:address?', function (req, res) {
        polka.accountNonce(req, res)
    })
    app.post('/submittx', function (req, res) {
        polka.submittx(req, res)
    })
};