import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";

import { Loading, TopHeading, Error } from "./Basics.js";
import { Container, Item, Button } from "semantic-ui-react";

const fakeData = {
  allProjects: [
    {
      id: "a",
      name: "Identity - IDP",
      organisation: "Digital Transformation Agency",
      contact: "Meera Pankhurst",
      leadAssessor: "Leisa",
      createdAt: "2017-01-19"
    },
    {
      id: "a",
      name: "Marketplace",
      organisation: "Digital Transformation Agency",
      contact: "Michael Yettle",
      leadAssessor: "Leisa Agora",
      createdAt: "2017-01-19"
    },
    {
      id: "b",
      name: "WHIPIT",
      organisation: "Dept of Human Services",
      contact: "Egbert Tran",
      leadAssessor: "Meera Pankhurst",
      createdAt: "2017-01-19"
    }
  ]
};

class ProjectList extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    var model = this.props.data;
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
      //model = fakeData;
    }
    return (
      <Container>
        <TopHeading>Projects</TopHeading>
        <Item.Group divided>
          {model.allProjects.map(proj => {
            const href = "/project/" + proj.id;
            return (
              <Item key={proj.id} href={href}>
                <Item.Content>
                  <Item.Header>{proj.name}</Item.Header>
                  <Item.Description>{proj.organisation}</Item.Description>
                  <Item.Extra>
                    Contact: {proj.contact}
                    <br />
                    Lead assessor: {proj.leadAssessor}
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    );
  }
}

ProjectList.propTypes = {
  data: PropTypes.object.isRequired
};

const ProjectListQuery = gql`
  query ProjectListQuery {
    allProjects(orderBy: name_ASC) {
      id
      name
      organisation
      contact
      leadAssessor
      createdAt
      assessments(orderBy: when_DESC) {
        id
        when
        summary
      }
    }
  }
`;

export default graphql(ProjectListQuery, {
  options: { fetchPolicy: "network-only" }
})(ProjectList);
