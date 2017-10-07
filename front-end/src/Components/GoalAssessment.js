import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";
import { get } from "lodash";

import {
  FormGroup,
  ControlLabel,
  Form,
  FormControl,
  HelpBlock,
  Col,
  Button,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      <Col sm={10}>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>
    </FormGroup>
  );
}

class GoalAssessment extends React.Component {
  constructor(props) {
    super(props);
    if (props.goalAssessment) {
      this.state = { ...props.goalAssessment };
    } else {
      this.state = {
        areasForImprovement: "",
        assessor: "",
        evidence: "",
        positiveComments: "",
        rating: "NA"
      };
    }
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSave = () => {
    this.props
      .mutate({
        variables: {
          assessmentId: this.props.assessmentId,
          goalNumber: this.props.goal,
          goalId: get(this.props.goalAssessment, "id", ""),
          ...this.state
        }
      })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };
  render() {
    return (
      <div>
        <h1>{this.props.goal}</h1>
        <Form horizontal>
          <FormGroup controlId="rating">
            <Col componentClass={ControlLabel} sm={2}>
              Rating
            </Col>
            <Col sm={10}>
              <ButtonGroup>
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={this.state.rating}
                  onChange={rating => {
                    this.setState({ rating });
                  }}
                >
                  <ToggleButton
                    value="Green"
                    bsStyle={
                      this.state.rating === "Green" ? "success" : "default"
                    }
                  >
                    Pass
                  </ToggleButton>
                  <ToggleButton
                    value="Amber"
                    bsStyle={
                      this.state.rating === "Amber" ? "warning" : "default"
                    }
                  >
                    In Progress
                  </ToggleButton>
                  <ToggleButton
                    value="Red"
                    bsStyle={this.state.rating === "Red" ? "danger" : "default"}
                  >
                    Fail
                  </ToggleButton>
                  <ToggleButton value="NA">Not Assessed</ToggleButton>
                </ToggleButtonGroup>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FieldGroup
            id="assessor"
            label="Assessed by"
            type="text"
            value={this.state.assessor}
            onChange={this.handleChange}
          />
          <FieldGroup
            id="positiveComments"
            label="Positive comments"
            componentClass="textarea"
            value={this.state.positiveComments}
            onChange={this.handleChange}
          />
          <FieldGroup
            id="areasForImprovement"
            label="Areas for improvement"
            componentClass="textarea"
            value={this.state.areasForImprovement}
            onChange={this.handleChange}
          />
          <FieldGroup
            id="evidence"
            label="Evidence"
            componentClass="textarea"
            value={this.state.evidence}
            onChange={this.handleChange}
          />
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" onClick={this.handleSave}>
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

GoalAssessment.propTypes = {
  assessmentId: PropTypes.string.isRequired,
  goal: PropTypes.number.isRequired
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
      updatedAt
    }
  }
`;

export default graphql(updateGoal)(GoalAssessment);
