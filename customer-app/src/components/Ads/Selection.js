import React from "react";

class Selection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { history } = this.props;
        return (
            <div className="d-flex justify-content-around">
                <button className="selectionBtn" id="greenbtn" onClick={() => history.push('/new')}>New AD</button>
                <button className="selectionBtn" id="bluebtn" onClick={() => history.push('/scheduled')}>Scheduled ADs</button>
                <button className="selectionBtn" id="greybtn" onClick={() => history.push('/expired')}>Expired ADs</button>
            </div>
        )
    }
}
export default Selection;