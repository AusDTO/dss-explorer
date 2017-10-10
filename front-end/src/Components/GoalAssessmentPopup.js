import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import { CalculateRatingText } from "./Goals";

import GoalLight from "./GoalLight";

class GoalAssessmentPopup extends React.Component {
  render() {
    const goal = this.props.goal;
    const model = this.props.goalAssessment;
    if (!model) {
      return (
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>
                {"#" + goal.number + ". " + goal.summary}
              </Item.Header>
              <Item.Description>Not assessed</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      );
    }
    const info = [
      { label: "Good", content: model.positiveComments },
      { label: "Not so good", content: model.areasForImprovement }
    ];
    return (
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Header>{"#" + goal.number + ". " + goal.summary}</Item.Header>
            <Item.Meta>{model.assessor}</Item.Meta>
            <Item.Description>
              {info.map(x => {
                if (x.content) {
                  return (
                    <div>
                      <p>
                        <strong>{x.label}</strong>
                        <br />
                        {x.content}
                      </p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
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
