import React, { useState, useEffect } from 'react';
import './UserInfo.css';
import {
    API,
    createHeader
} from '../constants';

function UserInfo(props) {
    return <div className="post">
        <div className="account-line">
            <strong>{props.name}</strong>
        </div>

        <div className="username">
            <div><strong>User: </strong>
                {props.name}
            </div>
        </div>
    </div>
}

export default UserInfo;
