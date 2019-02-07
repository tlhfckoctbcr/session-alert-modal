import React from "react";

import Typography from "@material-ui/core/Typography";

const formatTime = time => {
  let minutes = Math.floor(time/60);
  let seconds = time % 60;

  if (!minutes) return `${seconds} seconds`;
  return `${minutes} minute${minutes === 1 ? "" : "s"}, ${seconds} seconds`;
};

const Index = ({ time }) => (
  <Typography style={{ margin: "15px 0 20px 0" }} variant={"subheading"} align={"center"}>
    <strong>Time Remaining:</strong> {formatTime(time)}
  </Typography>
);

export default Index;
