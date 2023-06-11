import './index.css'

const Slide = props => {
  const {slideDetails, slidesCount, activeSlide, onClickSlide} = props
  const activeTab = activeSlide === slideDetails.id ? 'active-tab' : ''
  const clickSlide = () => onClickSlide(slideDetails.id)
  return (
    <li
      data-testid={`slideTab${slidesCount}`}
      className={`slide-element ${activeTab}`}
      onClick={clickSlide}
    >
      <p className="slides-count">{slidesCount}</p>
      <div className="slide">
        <h1 className="slide-heading">{slideDetails.heading}</h1>
        <p className="slide-description">{slideDetails.description}</p>
      </div>
    </li>
  )
}
export default Slide
