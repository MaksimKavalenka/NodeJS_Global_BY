const request = require('request');

const url = 'http://localhost:8090/api/cities';

function addCity(req, res) {
  request.post({
    url,
    json: req.swagger.params.body.value,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function getCity(req, res) {
  request.get({
    url: `${url}/${req.swagger.params.id.value}`,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function getCities(req, res) {
  request.get({
    url,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function updateCity(req, res) {
  request.put({
    url: `${url}/${req.swagger.params.id.value}`,
    json: req.swagger.params.body.value,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function deleteCity(req, res) {
  request.delete({
    url: `${url}/${req.swagger.params.id.value}`,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

module.exports = {
  addCity,
  getCity,
  getCities,
  updateCity,
  deleteCity,
};
