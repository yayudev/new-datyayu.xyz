import randomInt from './random-int'

/**
 * Swap two indexes in the given array.
 * (Warning: MUTATES THE ARRAY)
 *
 * @param {Array} list Array to mutate.
 * @param {Number} i First index to swap.
 * @param {Number} j Second index to swap.
 */
function swap (list, i, j) {
  if (i === j) {
    return
  }

  const temp = list[i]
  list[i] = list[j]
  list[j] = temp
}

/**
 * Performs an in-place shuffle of a given array.
 * Implemented using the Fisher-Yates/Knuth shuffle algorithm.
 * (Warning: MUTATES THE ARRAY)
 *
 * @param {Array} list Array to shuffle
 */
export default function shuffle (list) {
  if (!(list instanceof Array)) {
    return
  }

  for (let i = list.length - 1; i > 0; i--) {
    let randomIndex = randomInt(0, i)
    swap(list, i, randomIndex)
  }
}
