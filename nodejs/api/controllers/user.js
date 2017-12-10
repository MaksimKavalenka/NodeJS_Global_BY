const request = require('request');

const url = 'http://localhost:8090/api/users';

function getUsers(req, res) {
  request.get({
    url,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

function deleteUser(req, res) {
  request.delete({
    url: `${url}/${req.swagger.params.id.value}`,
    headers: {
      'x-access-token': req.swagger.params['x-access-token'].value,
    },
  }).pipe(res);
}

module.exports = {
  getUsers,
  deleteUser,
};
