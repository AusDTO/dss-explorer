import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";
import { Button, Glyphicon } from "react-bootstrap";

class NewAssessmentButton extends React.Component {
  onClick = () => {
    // it feels wrong to have this here
    this.props.submit(this.props.projectId, new Date())
      .then(({ data }) => {
        console.log("got data", data);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  };

  render() {
    return (
      <Button bsStyle="primary" onClick={this.onClick}>
        <Glyphicon glyph="star" /> New Assessment
      </Button>
    );
  }
}

NewAssessmentButton.propTypes = {
  projectId: PropTypes.string.isRequired
};

const createAssessment = gql`
  mutation CreateAssessment($projId: ID!, $when: DateTime!) {
    createAssessment(when: $when, projectId: $projId) {
      id
    }
  }
`;

export default graphql(createAssessment, {
    props: ({ mutate }) => ({
        submit: (projId, when) => mutate({ variables: { projId, when } }),
      }),
})(NewAssessmentButton);
