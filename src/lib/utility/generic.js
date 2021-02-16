import isEqual from 'lodash.isequal'

// so we could use both immutable.js objects and regular objects

export function _get(object, key) {
  return typeof object.get === 'function' ? object.get(key) : object[key]
}

export function _length(object) {
  return typeof object.count === 'function' ? object.count() : object.length
}

// cache the index of the last array mismatch, as changes are fairly localised
let lastHitIndex = -1
export function arraysEqual(array1, array2) {
  if (array1[lastHitIndex] !== array2[lastHitIndex]) return false

  if (array1.length !== array2.length) return false

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      lastHitIndex = i
      return false
    }
  }
  return true
}

export function deepObjectCompare(obj1, obj2) {
  return isEqual(obj1, obj2)
}

export function keyBy(value, key) {
  let obj = {}

  value.forEach(function(element) {
    obj[element[key]] = element
  })

  return obj
}

export function noop() {}
