import React from "react";
import { formatTime } from "../../utils";
import Typography from "@material-ui/core/Typography";

const Index = ({ time, timeStringFormatter = formatTime }) => (
  <Typography style={{ margin: "15px 0 20px 0" }} variant={"subheading"} align={"center"}>
    <strong>Time Remaining:</strong> {timeStringFormatter(time)}
  </Typography>
);

export default Index;
