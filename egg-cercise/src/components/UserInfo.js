import React, { useState, useEffect } from 'react';
import './UserInfo.css';
import {
    API,
    createHeader
} from '../constants';

function UserInfo(props) {
   const handleClick = async event => {
		event.preventDefault();
		const { data } = await API.post('/user/exercises', {
            id: props.id
        }, createHeader(window.localStorage.getItem('jwt')));
        console.log(data);
        console.log('x');
		props.displayResult(data, false);
	}

    return <div className="custom-header" onClick={handleClick}>
            <strong>{props.name}</strong>
    </div>
}

export default UserInfo;
