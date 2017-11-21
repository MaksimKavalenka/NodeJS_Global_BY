import express from 'express';
import { CityRouteUtils } from '../helpers';
import { Validator, schema } from '../middlewares';

const router = express.Router();

const path = { ROOT: '/cities' };
path.ADD_CITY = path.ROOT;
path.GET_CITY = `${path.ROOT}/:id`;
path.GET_CITIES = path.ROOT;
path.UPDATE_CITY = `${path.ROOT}/:id`;
path.DELETE_CITY = `${path.ROOT}/:id`;

router.route(path.ADD_CITY)
  .post(Validator.validateSchema(schema.CITY_SCHEMA), CityRouteUtils.addCity);

router.route(path.GET_CITY)
  .get(CityRouteUtils.getCity);

router.route(path.GET_CITIES)
  .get(CityRouteUtils.getCities);

router.route(path.UPDATE_CITY)
  .put(CityRouteUtils.updateCity);

router.route(path.DELETE_CITY)
  .delete(CityRouteUtils.deleteCity);

module.exports = router;
