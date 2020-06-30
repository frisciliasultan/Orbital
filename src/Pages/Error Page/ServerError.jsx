import React from 'react';

const ServerError = (props) => {
    return (
    <div>
        <p>
            Sorry, our server is currently dealing with high traffic
            or is currently down. We suggest trying again in a few minutes or 
            contact us at test@gmail.com if the problem persists
        </p>

        <button onClick={() => props.history.push('/login')}>Login</button>
    </div>);
}


export default ServerError;