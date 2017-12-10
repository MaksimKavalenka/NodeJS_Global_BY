const request = require('request');

const url = 'http://localhost:8090/api/products';

function addProduct(req, res) {
  request.post({
    url,
    json: req.swagger.params.body.value,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function getProduct(req, res) {
  request.get({
    url: `${url}/${req.swagger.params.id.value}`,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function getProducts(req, res) {
  request.get({
    url,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function getProductReviews(req, res) {
  request.get({
    url: `${url}/${req.swagger.params.id.value}/reviews`,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function deleteProduct(req, res) {
  request.delete({
    url: `${url}/${req.swagger.params.id.value}`,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  getProductReviews,
  deleteProduct,
};
