import React from 'react';
import loadSpinner from './images/Ellipsis-2s-200px.gif'

const LoadSpinner = props => {
    return (
        <div>
            <img src={loadSpinner} {...props} className='centerPiece' />
        </div>
    )
}

export default LoadSpinner;