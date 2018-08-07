
class Memento {
  constructor(state, index) {
    this.state = state
    this.index = index
  }
  getState() {
    return this.state
  }
  getIndex() {
    return this.index
  }
}

export default Memento
