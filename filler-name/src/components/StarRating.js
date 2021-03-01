import React, { useState, useEffect, useRef } from 'react';

const starStyle = {
  fontSize: '30px'
};

function StarRating(props) {
  const [count, setCount] = useState(props.rating);

  const rating = useRef('rating');

  const setRating = () => {
    const stars = rating.current.getElementsByClassName('star');
    Array.from(stars).forEach(star => {
      star.style.color = Math.ceil(count) >= star.dataset.value ? 'yellow' : 'gray'
    });
  }

  const handleClick = event => {
    let c = event.target.dataset.value;
    setCount(c);
    if(props.onClick)
      props.onClick(c);
  }

  const hover = event => {
    event.target.parentElement.style.cursor = 'pointer';
    const stars = rating.current.getElementsByClassName('star');
    let value = event.target.dataset.value;
    Array.from(stars).forEach(star => {
      star.style.color = value >= star.dataset.value ? 'yellow' : 'gray'
    });
  }

  useEffect(setRating);

  return (
    <div className="rating" ref={rating} data-rating={count} onMouseOut={setRating}>
      {[...Array(5).keys()].map(n =>
        <span style={starStyle} className="star" key={n + 1} data-value={n + 1} onClick={handleClick} onMouseOver={hover}>
          &#9733;
        </span>
      )}
    </div>
  );
}

export default StarRating;