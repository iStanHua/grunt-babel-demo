export function deepCopy(source) {
  let target = Array.isArray(source) ? [] : {}
  for (var k in source) {
    if (typeof source[k] === 'object') {
      target[k] = deepCopy(source[k])
    } else {
      target[k] = source[k]
    }
  }
  return target
}
