import React, { useState, useEffect } from 'react';
import './FeedPost.css';
import {
    StarRating
} from '../components';
import {
    API,
    createHeader
} from '../constants';

function FeedPost(props) {

    const [likeCount, setLikeCount]= useState(props.likes);
    const [liked, setLiked] = useState(props.liked);
    const [image, setImage] = useState(props.image);
    const [image2, setImage2] = useState(props.image2);

    
    useEffect(async () => {
        const bgim = (await import(`../assets/${props.image}`)).default;
        setImage(bgim);
    });
    
    /*
    const incrementLikeCount = async () => {
        if(liked || !props.likeable) return;
        setLiked(true);
        setLikeCount(likeCount + 1);
        const response = await API.put(`/exercises/${props.id}`, {}, createHeader(window.localStorage.getItem('jwt')));
    }
    */

    const updateLikes = async (e) => 
    {
        if(!props.likeable) return;
        if(liked)
        {
            e.target.setAttribute( 'src', 'https://vovochiquinha.files.wordpress.com/2015/05/amor-coracao.png?w=640');
            e.target.setAttribute('alt', 'filled like button');
            setLiked(false);
            setLikeCount(likeCount - 1);
        }
        else
        {
            e.target.setAttribute( 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png');
            e.target.setAttribute('alt', 'filled like button');
            setLiked(true);
            setLikeCount(likeCount + 1);
        }
        const response = await API.put(`/exercises/${props.id}`, {}, createHeader(window.localStorage.getItem('jwt')));
    }

    return <div className="post">
        <div className="post-name">
            {props.name}
        </div>

         <div className="grid">

            <img className="img1"
                src={image == null ? "" : image}
                alt="temp"
            />
            <img className="img2"
                src={image == null ? "" : image2}
                alt="temp"
            />

            <div className="post-info">
                <div className="icons">
                    <img
                        className="heart"
                        src="https://vovochiquinha.files.wordpress.com/2015/05/amor-coracao.png?w=640"
                        id="heart"
                        alt="like button"
                        onClick={updateLikes}
                    />
                    {likeCount} likes
                </div>
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
                <div><strong>Directions: </strong>
                    {props.directions}
                </div>
            </div>
        </div>
    </div>
}

export default FeedPost;