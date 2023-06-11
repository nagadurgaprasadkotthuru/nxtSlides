import {Component} from 'react'

import {v4} from 'uuid'

import Header from './components/Header'
import Slide from './components/Slide'

import './App.css'

// This is the list used in the application. You can move them to any component needed.
const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

// Replace your code here
class App extends Component {
  state = {
    activeSlide: initialSlidesList[0].id,
    activeSlideDetails: [initialSlidesList[0]],
    slidesList: initialSlidesList,
    headingInput: initialSlidesList[0].heading,
    descriptionInput: initialSlidesList[0].description,
    isShowHeadingInput: false,
    isShowDescriptionInput: false,
  }

  onClickSlide = id => {
    this.setState(
      prevState => ({
        activeSlide: id,
        activeSlideDetails: prevState.slidesList.filter(
          eachItem => eachItem.id === id,
        ),
      }),
      this.changeHeadingOrDescription(),
    )
  }

  changeHeadingOrDescription = () =>
    this.setState(prevState => ({
      headingInput: prevState.activeSlideDetails[0].heading,
      descriptionInput: prevState.activeSlideDetails[0].description,
    }))

  onIsShowHeadingInputChanged = () =>
    this.setState(prevState => ({
      isShowHeadingInput: !prevState.isShowHeadingInput,
      activeSlide: {...prevState.activeSlide, heading: prevState.headingInput},
    }))

  onIsShowDescriptionInputChanged = () =>
    this.setState(prevState => ({
      isShowDescriptionInput: !prevState.isShowDescriptionInput,
    }))

  onChangeHeadingInput = event =>
    this.setState({headingInput: event.target.value})

  onChangeDescriptionInput = event =>
    this.setState({descriptionInput: event.target.value})

  addNewSlide = () => {
    const newSlide = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }
    this.setState(prevState => ({
      slidesList: [...prevState.slidesList, newSlide],
    }))
  }

  renderActiveSlide = () => {
    const {
      activeSlideDetails,
      isShowHeadingInput,
      isShowDescriptionInput,
      headingInput,
      descriptionInput,
    } = this.state
    const activeSlide = activeSlideDetails[0]
    return (
      <div className="active-slide-container">
        {isShowHeadingInput ? (
          <input
            type="text"
            value={headingInput}
            onBlur={this.onIsShowHeadingInputChanged}
            onChange={this.onChangeHeadingInput}
          />
        ) : (
          <h1 className="heading" onClick={this.onIsShowHeadingInputChanged}>
            {activeSlide.heading}
          </h1>
        )}
        {isShowDescriptionInput ? (
          <input
            type="text"
            value={descriptionInput}
            onBlur={this.onIsShowDescriptionInputChanged}
            onChange={this.onChangeDescriptionInput}
          />
        ) : (
          <p
            className="description"
            onClick={this.onIsShowDescriptionInputChanged}
          >
            {activeSlide.description}
          </p>
        )}
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
            <button
              className="new-button"
              type="button"
              onClick={this.addNewSlide}
            >
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

export default App
