import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Label } from "semantic-ui-react";

export default class GoalsLightBoard extends React.Component {
  goalColor = goalAssessment => {
    var rating = get(goalAssessment, "rating");
    if (rating === "Red") return "red";
    if (rating === "Amber") return "orange";
    if (rating === "Green") return "green";
    return null;
  };

  render() {
    const goalAssessment = get(this.props.assessment, "goalAssessments").find(
      x => x.goalNumber === this.props.goal.number
    );

    return (
      <Label
        key={this.props.goal.number}
        color={this.goalColor(goalAssessment)}
        {...this.props}
      >
        {this.props.goal.number}
      </Label>
    );
  }
}

GoalsLightBoard.propTypes = {
  assessment: PropTypes.object,
  goal: PropTypes.object.isRequired
};
