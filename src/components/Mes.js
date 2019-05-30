import React, { Component } from "react";
import success from './images/Check-Mark-Icon-3.png'
import failed from './images/Failed-Icon-3.png'

class Mes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {
                    this.props.location.state.response === 'Success' ?
                        <img src={success} className='centerPiece' />
                        :
                        <img src={failed} className='centerPiece' />
                }
            </>
        )
    }
}

export default Mes;