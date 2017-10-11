import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import Timestamp from "./Timestamp";
import { CalculateRatingText, CalculateRatingColor } from "./Goals";

import { Form, Button, TextArea, Input, Label, Table } from "semantic-ui-react";

// const StaticLabel = props => {
//   return (
//     <b>
//       {...props}
//     </b>
//   );
// };

const StaticText = props => {
  return <p {...props} />;
};

const StaticMultiText = props => {
  return <p {...props} />;
};

class GoalAssessmentDetailReadOnly extends React.Component {
  render() {
    const model = this.props.goalAssessment || {};
    const tableData = [
      {
        label: "Rating",
        content: (
          <Label
            size="large"
            color={CalculateRatingColor(model.rating)}
            content={CalculateRatingText(model.rating)}
          />
        )
      },
      { label: "Assessed by", content: model.assessor },
      { label: "Positive comments", content: model.positiveComments },
      {
        label: "Areas for improvement",
        content: model.areasForImprovement
      }
    ];

    return (
      <Table small striped>
        <Table.Body>
          {tableData.map(({ label, content }) => {
            return (
              <Table.Row>
                <Table.Cell>
                  <strong>{label}</strong>
                </Table.Cell>
                <Table.Cell>{content}</Table.Cell>
              </Table.Row>
            );
          })}
          <Table.Row>
            <Table.Cell>Last updated</Table.Cell>
            <Table.Cell>
              <Timestamp
                when={model.updatedAt}
                type="difference"
                defaultValue="never"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

GoalAssessmentDetailReadOnly.propTypes = {
  goalAssessment: PropTypes.object
};

export default GoalAssessmentDetailReadOnly;
