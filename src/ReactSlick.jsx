import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css'

export default function SimpleSlider(props) {
  const { offers } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (offers === undefined) {
    return <h1>Loading......</h1>;
  }

  return (
    <Slider {...settings} className="carousel">
      {offers.map((each, index) => (
        <div key={index}>
          <img src={each.imgUrl} className="carousel-img" alt="offer" />
        </div>
      ))}
    </Slider>
  );
}
