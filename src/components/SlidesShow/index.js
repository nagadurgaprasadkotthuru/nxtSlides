import {Component} from 'react'

import Header from '../Header'
import Slide from '../Slide'

import './index.css'

class SlidesShow extends Component {
  // eslint-disable-next-line react/sort-comp
  getActiveSlide = () => {
    const {initialSlidesList} = this.props
    const activeSlideId = initialSlidesList[0].id
    return activeSlideId
  }

  getSlidesList = () => {
    const {initialSlidesList} = this.props
    return initialSlidesList
  }

  getActiveSlideDetails = () => {
    const {initialSlidesList} = this.props
    return [initialSlidesList[0]]
  }

  state = {
    activeSlide: this.getActiveSlide(),
    activeSlideDetails: this.getActiveSlideDetails(),
    slidesList: this.getSlidesList(),
  }

  onClickSlide = id => {
    this.setState(prevState => ({
      activeSlide: id,
      activeSlideDetails: prevState.slidesList.filter(
        eachItem => eachItem.id === id,
      ),
    }))
  }

  renderActiveSlide = () => {
    const {activeSlideDetails} = this.state
    const activeSlide = activeSlideDetails[0]
    console.log(activeSlide)
    return (
      <div className="active-slide-container">
        <h1 className="heading">{activeSlide.heading}</h1>
        <p className="description">{activeSlide.description}</p>
      </div>
    )
  }

  renderSlidesBar = () => {
    const {slidesList, activeSlide} = this.state
    let count = 0
    return (
      <ul className="slides-container">
        {slidesList.map(eachItem => {
          count += 1
          return (
            <Slide
              slideDetails={eachItem}
              key={eachItem.id}
              slidesCount={count}
              activeSlide={activeSlide}
              onClickSlide={this.onClickSlide}
            />
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="content-container">
          <div className="button-slides-bar-container">
            <button className="new-button" type="button">
              <img
                className="plus-image"
                alt="new plus icon"
                src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              />
              <p className="new">New</p>
            </button>
            {this.renderSlidesBar()}
          </div>
          {this.renderActiveSlide()}
        </div>
      </div>
    )
  }
}

export default SlidesShow
