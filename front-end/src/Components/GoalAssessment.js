import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { graphql, gql } from "react-apollo";
import Timestamp from "./Timestamp";
import { CalculateGoalTitle } from "./Goals";

import {
  Container,
  Form,
  Header,
  Button,
  TextArea,
  Input,
  Segment,
  Transition
} from "semantic-ui-react";

function FieldGroup({ id, label, help, ...props }) {
  return <Form.Field id={id} label={label} {...props} />;
}

class GoalAssessment extends React.Component {
  constructor(props) {
    super(props);
    if (props.goalAssessment) {
      this.state = { changed: false, ...props.goalAssessment };
    } else {
      this.state = {
        changed: false,
        areasForImprovement: "",
        assessor: "",
        evidence: "",
        positiveComments: "",
        rating: "NA"
      };
    }
  }

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
      <Container>
        <Header as="h2" style={{ display: "inline-block" }}>
          {CalculateGoalTitle(this.props.goal)}
        </Header>
        <span style={{ marginLeft: "1em" }} />
        <Button
          compact
          circular
          onClick={() => this.setState({ visible: !this.state.visible })}
          icon={!!this.state.visible ? "chevron down" : "chevron up"}
        />
        <Transition.Group animation="fade down" duration={500}>
          {!!this.state.visible && (
            <Segment secondary>{this.props.goal.description}</Segment>
          )}
        </Transition.Group>
        <Form>
          <Form.Field>
            <label>Rating</label>
            <Button.Group id="rating" onClick={this.handleRatingChange}>
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
            onBlur={this.handleBlur}
          />
          <FieldGroup
            control={TextArea}
            id="positiveComments"
            label="Positive comments"
            value={this.state.positiveComments}
            onChange={this.handleChange}
            placeholder="What awesome things were shown in this assessment?"
            onBlur={this.handleBlur}
          />
          <FieldGroup
            control={TextArea}
            id="areasForImprovement"
            label="Areas for improvement"
            value={this.state.areasForImprovement}
            onChange={this.handleChange}
            placeholder="What things could be improved for next assessment?"
            onBlur={this.handleBlur}
          />
          <FieldGroup
            control={TextArea}
            id="evidence"
            label="Evidence"
            value={this.state.evidence}
            onChange={this.handleChange}
            placeholder="What evidence was presented for this goal?"
            onBlur={this.handleBlur}
          />
          <div>
            <strong>Last updated: </strong>
            <Timestamp
              when={this.state.updatedAt}
              type="difference"
              defaultValue="never"
            />
          </div>
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
      rating
      updatedAt
    }
  }
`;

export default graphql(updateGoal, {
  options: {
    refetchQueries: ["AssessmentPageQuery"]
  }
})(GoalAssessment);
