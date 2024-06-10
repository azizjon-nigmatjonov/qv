import React from 'react'

class ScrollDrag extends React.Component {
  state = { isScrolling: false }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.isScrolling !== nextState.isScrolling) {
      this.toggleScrolling(nextState.isScrolling)
    }
  }

  toggleScrolling = (isEnable) => {
    if (isEnable) {
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    } else {
      window.removeEventListener('mousemove', this.onMouseMove)
    }
  }

  onScroll = (event) => {}

  onMouseMove = (event) => {
    const { clientX, scrollLeft, scrollTop, clientY } = this.state
    this._scroller.scrollLeft = scrollLeft - clientX + event.clientX
    this._scroller.scrollTop = scrollTop - clientY + event.clientY
  }

  onMouseUp = () => {
    this.setState({ isScrolling: false, scrollLeft: 0, scrollTop: 0, clientX: 0, clientY: 0 })
  }

  onMouseDown = (event) => {
    const { scrollLeft, scrollTop } = this._scroller
    this.setState({ isScrolling: true, scrollLeft, scrollTop, clientX: event.clientX, clientY: event.clientY })
  }

  attachScroller = (scroller) => {
    this._scroller = React.findDOMNode(scroller)
  }

  render() {
    return (
      <div className="container">
        <div className="scroller" ref={this.attachScroller} onMouseDown={this.onScroll} onScroll={this.onMouseMove}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

/*
 * Render the above component into the div#app
 */
export default ScrollDrag
