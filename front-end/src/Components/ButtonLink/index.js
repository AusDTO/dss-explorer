import React from "react";
import PropTypes from "prop-types";

import { Button } from "semantic-ui-react";
import "./style.css";

const ButtonLink = ({ className = "", ...props }) => (
  <Button
    basic
    color="blue"
    className={["link", className].join(" ")}
    {...props}
  />
);

ButtonLink.propTypes = {
  className: PropTypes.string
};

export default ButtonLink;
