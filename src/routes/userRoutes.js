import express from 'express';
import { UserRouteUtils } from '../helpers';

const router = express.Router();

const path = { ROOT: '/users' };
path.GET_USERS = path.ROOT;
path.DELETE_USER = `${path.ROOT}/:id`;

router.route(path.GET_USERS)
  .get(UserRouteUtils.getUsers);

router.route(path.DELETE_USER)
  .delete(UserRouteUtils.deleteUser);

module.exports = router;
