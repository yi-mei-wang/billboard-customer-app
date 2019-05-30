import React from "react";

const Timeslots = ({ slotsTaken }) => {
  slotsTaken.map(slot => {
    <option value={slot}>{slot}</option>;
  });
};

export default Timeslots;
