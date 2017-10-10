import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Popup } from "semantic-ui-react";
import Goals from "./Goals";
import GoalLight from "./GoalLight";
import GoalAssessmentPopup from "./GoalAssessmentPopup";

export default class GoalsLightBoard extends React.Component {
  render() {
    return (
      <div>
        {Goals.map(goal => {
          const goalAssessment = get(
            this.props.assessment,
            "goalAssessments"
          ).find(x => x.goalNumber === goal.number);
          return (
            <Popup
              key={goal.number}
              flowing
              position="bottom left"
              trigger={
                <GoalLight text={goal.number} ga={goalAssessment} size="big" />
              }
            >
              <GoalAssessmentPopup
                key={goal.number}
                goal={goal}
                goalAssessment={goalAssessment}
              />
            </Popup>
          );
        })}
      </div>
    );
  }
}

GoalsLightBoard.propTypes = {
  assessment: PropTypes.object.isRequired
};
