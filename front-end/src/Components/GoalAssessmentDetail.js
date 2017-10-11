import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { graphql, gql } from "react-apollo";
import Timestamp from "./Timestamp";
import { CalculateRatingText } from "./Goals";

import { Form, Button, TextArea, Input } from "semantic-ui-react";

class GoalAssessmentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changed: false,
      areasForImprovement: "",
      assessor: "",
      evidence: "",
      positiveComments: "",
      rating: "NA",
      ...props.goalAssessment
    };
  }

  makeRatingButton = (rating, color) => {
    return (
      <Button
        value={rating}
        color={this.state.rating === rating ? color : null}
        content={CalculateRatingText(rating)}
      />
    );
  };

  handleChange = e => {
    console.log("handleChange", e.target);
    this.setState({ changed: true, [e.target.id]: e.target.value });
  };

  handleRatingChange = e => {
    console.log("handleRatingChange", e.target);
    this.setState({ changed: true, rating: e.target.value }, () => {
      this.handleSave();
    });
  };

  handleBlur = e => {
    console.log("blur", this.state.changed);
    if (this.state.changed) {
      this.handleSave();
    }
  };

  handleSave = () => {
    const vars = {
      assessmentId: this.props.assessmentId,
      goalNumber: this.props.goal.number,
      goalId: get(this.props.goalAssessment, "id", ""),
      ...this.state
    };
    console.log("SAVING", vars);
    this.setState({ changed: false });
    this.props
      .mutate({
        variables: vars
      })
      .then(({ data }) => {
        console.log("got response from update", data);
        this.setState({
          updatedAt: data.updateOrCreateGoalAssessment.updatedAt
        });
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Rating</label>
            <Button.Group id="rating" onClick={this.handleRatingChange}>
              {this.makeRatingButton("Green", "green")}
              {this.makeRatingButton("Amber", "orange")}
              {this.makeRatingButton("Red", "red")}
              {this.makeRatingButton("NA", "grey")}
            </Button.Group>
          </Form.Field>

          <Form.Input
            id="assessor"
            label="Assessed by"
            control={Input}
            value={this.state.assessor}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <Form.Input
            control={TextArea}
            id="positiveComments"
            label="Positive comments"
            value={this.state.positiveComments}
            onChange={this.handleChange}
            placeholder="What awesome things were shown in this assessment?"
            onBlur={this.handleBlur}
          />
          <Form.Input
            control={TextArea}
            id="areasForImprovement"
            label="Areas for improvement"
            value={this.state.areasForImprovement}
            onChange={this.handleChange}
            placeholder="What things could be improved for next assessment?"
            onBlur={this.handleBlur}
          />
          <Form.Input
            control={TextArea}
            id="evidence"
            label="Evidence"
            value={this.state.evidence}
            onChange={this.handleChange}
            placeholder="What evidence was presented for this goal?"
            onBlur={this.handleBlur}
          />
          <div>
            <label>Last updated: </label>
            <Timestamp
              when={this.state.updatedAt}
              type="difference"
              defaultValue="never"
            />
          </div>
        </Form>
      </div>
    );
  }
}

GoalAssessmentDetail.propTypes = {
  assessmentId: PropTypes.string.isRequired,
  goal: PropTypes.object.isRequired,
  goalAssessment: PropTypes.object
};

const updateGoal = gql`
  mutation UpdateGoal(
    $goalId: ID!
    $assessmentId: ID!
    $goalNumber: Int!
    $areasForImprovement: String
    $assessor: String
    $evidence: String
    $positiveComments: String
    $rating: Rating
  ) {
    updateOrCreateGoalAssessment(
      update: {
        id: $goalId
        areasForImprovement: $areasForImprovement
        assessor: $assessor
        evidence: $evidence
        positiveComments: $positiveComments
        rating: $rating
      }
      create: {
        assessmentId: $assessmentId
        goalNumber: $goalNumber
        areasForImprovement: $areasForImprovement
        assessor: $assessor
        evidence: $evidence
        positiveComments: $positiveComments
        rating: $rating
      }
    ) {
      id
      rating
      updatedAt
    }
  }
`;

export default graphql(updateGoal, {
  options: {
    refetchQueries: ["AssessmentPageQuery"]
  }
})(GoalAssessmentDetail);
