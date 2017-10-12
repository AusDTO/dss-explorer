import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import Timestamp from "./Timestamp";
import { CalculateRatingText, CalculateRatingColor } from "./Goals";

import { Form, Button, TextArea, Input, Label, Table } from "semantic-ui-react";

class GoalAssessmentDetailReadOnly extends React.Component {
  render() {
    const model = this.props.goalAssessment || {};
    const tableData = [
      {
        label: "Rating",
        content: (
          <Label
            size="large"
            color={CalculateRatingColor(model.rating, "grey")}
            content={CalculateRatingText(model.rating, "Not assessed")}
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
      <Table striped>
        <Table.Body>
          {tableData.map(({ label, content }, i) => {
            return (
              <Table.Row key={"row" + i}>
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
