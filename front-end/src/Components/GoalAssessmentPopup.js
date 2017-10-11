import React from "react";
import PropTypes from "prop-types";
import { Item, Header } from "semantic-ui-react";
import { CalculateRatingText, CalculateGoalTitle } from "./Goals";

import GoalLight from "./GoalLight";

class GoalAssessmentPopup extends React.Component {
  optionalDataBlock = (title, description) => {
    if (!description) return null;
    return (
      <div style={{ marginTop: "0.75em" }}>
        <Header size="medium">{title}</Header>
        {description}
      </div>
    );
  };
  render() {
    const { goal, goalAssessment } = this.props;
    const model = goalAssessment;
    if (!model) {
      return (
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{CalculateGoalTitle(goal)}</Item.Header>
              <Item.Description>Not assessed</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      );
    }
    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{"#" + goal.number + ". " + goal.summary}</Item.Header>
            <Item.Meta>{model.assessor}</Item.Meta>
            <Item.Description>
              {this.optionalDataBlock("Good", model.positiveComments)}
              {this.optionalDataBlock("Not so good", model.areasForImprovement)}
            </Item.Description>
            <Item.Extra>
              <GoalLight text={CalculateRatingText(model)} ga={model} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

GoalAssessmentPopup.propTypes = {
  goal: PropTypes.object,
  goalAssessment: PropTypes.object
};

export default GoalAssessmentPopup;
