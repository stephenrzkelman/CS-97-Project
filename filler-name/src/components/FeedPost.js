import React, { useState, useEffect } from 'react';
import './FeedPost.css';
import {
    StarRating
} from '../components';
import heart from '../assets/heart.png';
import bookmark from '../assets/bookmark.png';

function FeedPost(props) {

    const [likeCount, setLikeCount]= useState(props.likes);
    const [image, setImage] = useState(null);

    useEffect(async () => {
        const bgim = (await import(`../assets/${props.image}`)).default;
        setImage(bgim);
    });

    const incrementLikeCount = () => {
        setLikeCount(likeCount + 1);
    }

    return <div className="post">
        <div className="account-line">
            <strong>{props.name}</strong>
            <img
            className="icon"
            src={bookmark}
            alt="bookmark"
        />
        </div>


        <div className="icons">
        <img
            className="heart"
            src={heart}
            alt="like button"
            onClick={incrementLikeCount}
        />
        {likeCount} likes
        </div>

        <img
            src={image == null ? "" : image}
            alt="temp"
        />

        <div className="post-info">
            <div><strong>Muscle Group: </strong>
                {props.muscleGroup}
            </div>
            <div><strong>Type: </strong>
                {props.type}
            </div>
            <div><strong>Equipment: </strong>
                {props.equipment}
            </div>
            <div><strong>Difficulty: </strong>
                <StarRating rating={props.difficulty} />
            </div>
        </div>
    </div>
}

export default FeedPost;