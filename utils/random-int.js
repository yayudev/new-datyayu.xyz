/**
 * Check if a variable it's a finite number.
 *
 * @param {Number} val Number to evaluate.
 * @return {Boolean} Wheter the number is valid or not.
 */
function validNumber(val) {
  return typeof val === "number" && !Number.isNaN(val) && Number.isFinite(val)
}

/**
 * Check if range is valid.
 *
 * @param {Number} lower Bottom boundary.
 * @param {Number} upper Bottom boundary.
 * @return {Boolean} Whether the range is valid or not.
 */
function validRange(lower, upper) {
  return validNumber(lower) && validNumber(upper) && lower <= upper
}

/**
 * Returns a random int in the range [min, max], or -1 if:
 *  - min and/or max are not of type 'number', NaN, or Infinity.
 *  - min > max.
 *
 * @param {Number} min Bottom boundary.
 * @param {Number} max Bottom boundary.
 * @return {Number} A randon number in the range or -1 if the
 *                  range its invalid.
 */
export default (min, max) => {
  if (!validRange(min, max)) {
    return -1
  }

  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}
