import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../images/quickcart.jpg"
import image2 from "../images/washingimg.jpg"
import image3 from "../images/fridge.jpg"
import image4 from "../images/ac.jpg"
import image5 from "../images/vaccum.jpg"
import image6 from "../images/mobile.jpg"
export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <img
            src={image1}
            alt=""
            className="container"
            style={{ maxHeight: 550 }}
          />
        </div>
        <div>
          <img
            src={image2}
            alt=""
            className="container"
            style={{ maxHeight: 550 }}
          />
        </div>
        <div>
          <img
            src={image3}
            alt=""
            className="container"
            style={{ maxHeight: 550 }}
          />
        </div>
        <div>
          <img
            src={image4}
            alt=""
            className="container"
            style={{ maxHeight: 550 }}
          />
        </div>
        <div>
          <img
            src={image5}
            alt=""
            className="container"
            style={{ maxHeight: 550 }}
          />
        </div>
        <div>
          <img
            src={image6}
            alt=""
            className="container"
            style={{ maxHeight: 550 }}
          />
        </div>
      </Slider>
    </div>
  );
}
