import React from "react";
import PropTypes from "prop-types";
import { Label } from "semantic-ui-react";
import { CalculateRatingColor } from "./Goals";

export default class GoalLight extends React.Component {
  render() {
    return (
      <Label
        color={CalculateRatingColor(this.props.ga, null)}
        content={this.props.text}
        {...this.props}
      />
    );
  }
}

GoalLight.propTypes = {
  ga: PropTypes.object
};
