import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import AssessmentRow from "./AssessmentRow";
import NewAssessmentButton from "./NewAssessmentButton";

class ProjectDetail extends React.Component {

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    if (this.props.data.error) {
      return <div>Error</div>;
    }
    const proj = this.props.data.Project;
    if (!proj) {
      return <div>Unknown project</div>;
    }
    const title = "Project - " + proj.name;
    return (
      <div>
        <Panel header={title} bsStyle="primary">
          <Grid>
            <Row>
              <Col>
                {proj.name}
              </Col>
              <Col>
                {proj.contact}
              </Col>
              <Col>
                {proj.createdAt}
              </Col>
            </Row>
          </Grid>
          <NewAssessmentButton projectId={proj.id}/>
        </Panel>
        <Panel header="Assessments" bsStyle="info">
          <ListGroup>
            {proj.assessments.map(assessment => {
              const href = "/assessment/" + assessment.id
              return (
                <ListGroupItem key={assessment.id} href={href}>
                  <AssessmentRow assessment={assessment} />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Panel>
      </div>
    );
  }
}

ProjectDetail.propTypes = {
  data: PropTypes.object.isRequired
};

const ProjectDetailQuery = gql`
  query ProjectDetailQuery($projId: ID!) {
    Project(id: $projId) {
      id
      name
      contact
      createdAt
      assessments {
        id
        when
        summary
      }
    }
  }
`;

export default graphql(ProjectDetailQuery, {
  options: props => ({
    variables: {
      projId: props.match.params.id
    }
  })
})(ProjectDetail);
