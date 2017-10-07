import React from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";

class ProjectRow extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={6} md={4}>
            {this.props.project.name}
          </Col>
          <Col xs={6} md={4}>
            {this.props.project.contact}
          </Col>
          <Col xs={6} md={4}>
            {this.props.project.assessmentCount}
          </Col>
        </Row>
      </Grid>
    );
  }
}

ProjectRow.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectRow;
