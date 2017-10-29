export default class TypeUtils {
  static isNumber(value) {
    return !Number.isNaN(parseFloat(value)) && Number.isFinite(value);
  }
}
