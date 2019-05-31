import React from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";

class Selection extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className={"px-4 mb-5"}>
        <h2 className={"pt-4 m-0"}>Your ADs</h2>
        <span
          className={"underline mb-2"}
          style={{
            backgroundColor: "#ffbf00",
            width: "200px",
            height: "10px",
            display: "inline-block"
          }}
        />
        <Row>
          <Col sm="12">
            <Card body className={"my-3"}>
              <h5 className={"font-weight-bold"}>
                <CardTitle>NEW ADS</CardTitle>
              </h5>
              <CardText>
                Advertise with us to see your content on our billboards.
              </CardText>
              <Button
                onClick={() => history.push("/new")}
                style={{
                  backgroundColor: "#d79922",
                  color: "white",
                  border: "none",
                  letterSpacing: "1.5px",
                  fontWeight: 600
                }}
              >
                NEW ADS
              </Button>
            </Card>
          </Col>
          <Col sm="12">
            <Card body className={"my-3"}>
              <h5 className={"font-weight-bold"}>
                <CardTitle>FUTURE ADS</CardTitle>
              </h5>{" "}
              <CardText>Ads that have been approved.</CardText>
              <Button
                onClick={() => history.push("/scheduled")}
                style={{
                  backgroundColor: "#d79922",
                  color: "white",
                  border: "none",
                  letterSpacing: "1.5px",
                  fontWeight: 600
                }}
              >
                FUTURE ADS
              </Button>
            </Card>
          </Col>
          <Col sm="12">
            <Card body className={"mt-3"} style={{ marginBottom: "50px" }}>
              <h5 className={"font-weight-bold"}>
                <CardTitle>PAST ADS</CardTitle>
              </h5>{" "}
              <CardText>
                Ads that were approved and advertised in the past.
              </CardText>
              <Button
                onClick={() => history.push("/expired")}
                style={{
                  backgroundColor: "#d79922",
                  color: "white",
                  border: "none",
                  letterSpacing: "1.5px",
                  fontWeight: 600
                }}
              >
                PAST ADS
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  // <div className="d-flex justify-content-around">
  //   <button
  //     className="selectionBtn"
  //     id="greenbtn"
  //     onClick={() => history.push("/new")}
  //   >
  //     New AD
  //   </button>
  //   <button
  //     className="selectionBtn"
  //     id="bluebtn"
  //     onClick={() => history.push("/scheduled")}
  //   >
  //     Scheduled ADs
  //   </button>
  //   <button
  //     className="selectionBtn"
  //     id="greybtn"
  //     onClick={() => history.push("/expired")}
  //   >
  //     Expired ADs
  //   </button>
  // </div>
}
export default Selection;
