import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No #root provided for Domlistener!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      const name = this.name || ''
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not inplemented in ${name} Component`
        )
      }
      
      this[method] = this[method].bind(this)
      //тоже самое что и addEventListener
      this.$root.on(listener, this[method])
    })
  }
  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      //тоже самое что и removeEventListener
      this.$root.off(listener, this[method])
    })
  }
}

//input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
