const request = require('request');

const url = 'http://localhost:8090/api/auth';

function getToken(req, res) {
  request.post({
    url,
    json: req.swagger.params.body.value,
  }).pipe(res);
}

function getTokenPassport(req, res) {
  request.post({
    url: `${url}/passport`,
    json: req.swagger.params.body.value,
  }).pipe(res);
}

function facebookPassport(req, res) {
  request.get({
    url: `${url}/passport/facebook`,
  }).pipe(res);
}

function googlePassport(req, res) {
  request.get({
    url: `${url}/passport/google`,
  }).pipe(res);
}

function twitterPassport(req, res) {
  request.get({
    url: `${url}/passport/twitter`,
  }).pipe(res);
}

module.exports = {
  getToken,
  getTokenPassport,
  facebookPassport,
  googlePassport,
  twitterPassport,
};
