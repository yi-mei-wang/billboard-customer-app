import React, { Component } from "react";
import success from './images/Check-Mark-Icon-3.png'
import failed from './images/Failed-Icon-3.png'

class ResultMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {
                    this.props.location.state.response === 'Success' ?
                        <img src={success} className='centerPiece' alt="success message" />
                        :
                        <img src={failed} className='centerPiece' alt="failure message" />
                }
            </>
        )
    }
}

export default ResultMessage;