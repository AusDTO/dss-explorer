import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

class GoalAssessmentRationale extends React.Component {
  render() {
    const { goal } = this.props;

    return (
      <div className="goalAssessmentRationale">
        <Segment secondary>{goal.description}</Segment>
        <div dangerouslySetInnerHTML={{ __html: goal.reason }} />
      </div>
    );
  }
}

GoalAssessmentRationale.propTypes = {
  goal: PropTypes.object.isRequired
};

export default GoalAssessmentRationale;
