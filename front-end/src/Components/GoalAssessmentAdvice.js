import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import "./CriteriaTimeline.css";

class GoalAssessmentAdvice extends React.Component {
  render() {
    const { goal } = this.props;

    return (
      <div className="goalAssessmentAdvice">
        <Segment secondary>{goal.description}</Segment>
        <div dangerouslySetInnerHTML={{ __html: goal.advice }} />
      </div>
    );
  }
}

GoalAssessmentAdvice.propTypes = {
  goal: PropTypes.object.isRequired
};

export default GoalAssessmentAdvice;
