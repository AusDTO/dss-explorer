import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";
import { get } from "lodash";

import {
  Container,
  Grid,
  Form,
  Header,
  Button,
  TextArea,
  Input
} from "semantic-ui-react";

function FieldGroup2({ id, label, help, ...props }) {
  return (
    <Grid celled columns={4} stackable textAlign="left" verticalAlign="middle">
      <Grid.Row>
        <Grid.Column columns={1}>
          <Form.Field inline>
            <label htmlFor={id}>{label}</label>
          </Form.Field>
        </Grid.Column>
        <Grid.Column columns={3}>
          <Form.Field id={id} {...props} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function FieldGroup({ id, label, help, ...props }) {
  return <Form.Field id={id} label={label} {...props} />;
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
          goalNumber: this.props.goal.number,
          goalId: get(this.props.goalAssessment, "id", ""),
          ...this.state
        }
      })
      .then(({ data }) => {
        console.log("got response from update", data);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };
  render() {
    return (
      <Container>
        <Header as="h1">
          {"#" + this.props.goal.number + ". " + this.props.goal.summary}
        </Header>
        <Form onSubmit={this.handleSave}>
          <Form.Field id="rating">
            <label>Rating</label>
            <Button.Group
              onClick={evt => {
                this.setState({ rating: evt.target.value });
              }}
            >
              <Button
                value="Green"
                color={this.state.rating === "Green" ? "green" : null}
              >
                Pass
              </Button>
              <Button
                value="Amber"
                color={this.state.rating === "Amber" ? "orange" : null}
              >
                In progress
              </Button>
              <Button
                value="Red"
                color={this.state.rating === "Red" ? "red" : null}
              >
                Failing
              </Button>
              <Button
                value="NA"
                color={this.state.rating === "NA" ? "grey" : null}
              >
                Not assessed
              </Button>
            </Button.Group>
          </Form.Field>

          <FieldGroup
            id="assessor"
            label="Assessed by"
            control={Input}
            value={this.state.assessor}
            onChange={this.handleChange}
          />
          <FieldGroup
            control={TextArea}
            id="positiveComments"
            label="Positive comments"
            value={this.state.positiveComments}
            onChange={this.handleChange}
            placeholder="What awesome things were shown in this assessment?"
          />
          <FieldGroup
            control={TextArea}
            id="areasForImprovement"
            label="Areas for improvement"
            value={this.state.areasForImprovement}
            onChange={this.handleChange}
            placeholder="What things could be improved for next assessment?"
          />
          <FieldGroup
            control={TextArea}
            id="evidence"
            label="Evidence"
            value={this.state.evidence}
            onChange={this.handleChange}
            placeholder="What evidence was presented for this goal?"
          />
          <Form.Button primary>Save</Form.Button>
        </Form>
      </Container>
    );
  }
}

GoalAssessment.propTypes = {
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
      updatedAt
    }
  }
`;

export default graphql(updateGoal)(GoalAssessment);
