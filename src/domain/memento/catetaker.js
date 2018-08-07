import Memento from './memento'

class CareTaker {
  constructor() {
    this.mementos = []
  }

  saveMemento(memento) {
    this.mementos.push(memento)
  }
  retire(index) {
    let size = this.mementos.length
    if (!size) {
      return
    }
    if (index < 0 && index >= size) {
      return
    }
    return this.mementos[index]
  }
}
export default CareTaker
