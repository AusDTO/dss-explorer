import React from "react";
import PropTypes from "prop-types";

import Goals from "./Goals";
import GoalLight from "./GoalLight";

export default class GoalsLightBoard extends React.Component {
  render() {
    return (
      <div>
        {Goals.map(goal => {
          return (
            <GoalLight
              key={goal.number}
              assessment={this.props.assessment}
              goal={goal}
              size="big"
            />
          );
        })}
      </div>
    );
  }
}

GoalsLightBoard.propTypes = {
  assessment: PropTypes.object.isRequired
};
