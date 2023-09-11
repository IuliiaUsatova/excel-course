class Dom {
  constructor(selector) {
   //проверяем, если в селекторе дом нода, то оставляем ее, если строка например #app, тогда присваеваем ей document.querySelector(#app) и присваеваем это приветной переменной this.#el
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }
//далее когда мы в селекторе имеем данные мы должны ему передать какую-то разметку: $('div').html(<h1>Hi</h1>).clear(). обязательно возвращаем this для возможности продолжать цепочку методов, в случае если у нас будет отсутствовать аргумент (html)
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.innerHTML.trim()
  } 

  clear() {
    this.html('')
    return this
  }
  append(node) {
   //делаем проверку является ли объект node экземпляром класса Dom, и если да то мы присваеваем ему свойство $el
   if (node instanceof Dom) {
      node = node.$el
   }
   //если такой метод есть в базовом классе Element, используем его
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      //либо используем старый метод
      this.$el.appendChild(node)
    }
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
