import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";

import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import ProjectRow from "./ProjectRow";

class ProjectList extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <PageHeader>Projects</PageHeader>
        <ListGroup>
          {this.props.data.allProjects.map(proj => {
            const project = {
              href: "/project/" + proj.id,
              assessmentCount: proj._assessmentsMeta.count,
              ...proj
            };
            return (
              <ListGroupItem key={project.id} href={project.href}>
                <ProjectRow project={project} />
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}

ProjectList.propTypes = {
  data: PropTypes.object.isRequired
};

const ProjectListQuery = gql`
  query ProjectListQuery {
    allProjects {
      id
      name
      contact
      createdAt
      _assessmentsMeta {
        count
      }
    }
  }
`;

export default graphql(ProjectListQuery, {
  options: { fetchPolicy: "network-only" }
})(ProjectList);
