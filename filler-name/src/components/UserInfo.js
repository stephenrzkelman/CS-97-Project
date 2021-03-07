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
			keyword: props.id
		}, createHeader(window.localStorage.getItem('jwt')));
		props.displayResult(data);
	}

    return <div className="post" onClick={handleClick}>
            <strong>{props.name}</strong>
    </div>
}

export default UserInfo;
