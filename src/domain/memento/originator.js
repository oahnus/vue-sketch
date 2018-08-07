import Memento from './memento'

class Originator {
  constructor() {
    this.state = null
    this.index = null
  }
  createMemento() {
    console.log()
    this.index = this.index == null ? 0 : this.index + 1
    return new Memento(this.state, this.index)
  }
  getState() {
    return this.state
  }
  getIndex() {
    return this.index
  }
  setState(state) {
    this.state = state
  }
  restoreMemento(memento) {
    this.state = memento.getState()
    this.index = memento.getIndex()
  }
}

export default Originator
