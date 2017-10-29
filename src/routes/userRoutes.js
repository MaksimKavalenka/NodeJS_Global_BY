import express from 'express';
import { UserRouteUtils } from '../helpers';

const router = express.Router();

const path = { ROOT: '/users' };
path.GET_USERS = path.ROOT;

router
  .get(`${path.GET_USERS}`, UserRouteUtils.getUsers);

module.exports = router;
