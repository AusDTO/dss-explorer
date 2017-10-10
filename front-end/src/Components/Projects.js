import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";

import { Loading, TopInnerHeading, Error } from "./Basics.js";
import { Container, Item, Statistic, Segment } from "semantic-ui-react";

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
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
    }
    const models = this.props.data.allProjects || fakeData;
    return (
      <Container>
        <Segment>
          <TopInnerHeading>Projects</TopInnerHeading>
          <Item.Group divided>
            {models.map(proj => {
              return (
                <Item key={proj.id} href={"/project/" + proj.id}>
                  <Item.Image size="tiny">
                    <Statistic
                      size="tiny"
                      label={
                        "Assessment" +
                        (proj.assessments.length === 1 ? "" : "s")
                      }
                      value={proj.assessments.length}
                    />
                  </Item.Image>
                  <Item.Content>
                    <Item.Header>{proj.name}</Item.Header>
                    <Item.Meta>{proj.organisation}</Item.Meta>
                    <Item.Description>
                      Contact: {proj.contact}
                      <br />
                      Lead assessor: {proj.leadAssessor}
                    </Item.Description>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>
        </Segment>
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
      nextAssessment
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
