import { City } from '../models';

export default class CityController {
  static addCity(name, country, capital, lat, long) {
    const city = new City({
      name, country, capital, location: { lat, long },
    });
    return city.save();
  }

  static getCity(_id) {
    return City.findOne({ _id });
  }

  static getCities() {
    return City.find();
  }

  static updateCity(_id, name, country, capital, lat, long) {
    return City.update({ _id }, {
      name, country, capital, location: { lat, long },
    }, { upsert: true });
  }

  static deleteCity(_id) {
    return City.remove({ _id });
  }
}
