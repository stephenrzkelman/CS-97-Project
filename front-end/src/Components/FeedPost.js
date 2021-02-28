import React, {useState} from 'react';
import './FeedPost.css';
import heart from '../Temp/heart.png'
import bookmark from '../Temp/bookmark.png'

function FeedPost(props) {
    const [likeCount, setLikeCount]= useState(0);

    const incrementLikeCount = () => {
        setLikeCount(likeCount + 1);
      }



    return <div className="post">
        <div className="account-line">
            <strong>{props.accountName}</strong>
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
            src={props.image}
            alt="temp"
        />

        <div className="post-info">
            <div><strong>Muscle Group: </strong> 
            {props.muscleGroup}
            </div>
            <div><strong>Type: </strong> 
            {props.type}
            </div> 
            <div><strong>Equiptment: </strong> 
            {props.equiptment}
            </div>
            <div><strong>Diffculty: </strong> 
            {props.diffuculty}
            </div>

        </div>
    </div>
}

export default FeedPost;
