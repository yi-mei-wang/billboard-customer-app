import React from "react";
import styled from "styled-components";


const Calltoaction = styled.div`
color: #fff;
padding: 1.5rem;
padding-right: 50px;
`;

const Heading = styled.h1`
background-color: #3b4158;
display: inline-block;
`;

const Subheading = styled.h3`
background-color: white;
color: #3b4158;
`;

const CallToAction = () => (
  <Calltoaction>
    <Heading className="my-1 p-2">Reach out to</Heading>
    <Heading className="p-2"> your audience today!</Heading>
    <Subheading className="my-2 p-2">Schedule an ad with us now.</Subheading>
  </Calltoaction>
)


export default CallToAction;