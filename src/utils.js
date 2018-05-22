// get vue prop, return true when it is ''
export function prop(vm, name) {
  if (vm[name] === '') {
    return true
  }
  return vm[name]
}
