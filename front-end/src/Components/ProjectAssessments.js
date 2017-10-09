import React from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { graphql, gql } from "react-apollo";
import { Loading, TopHeading, Error } from "./Basics.js";
import {
  Container,
  Button,
  Grid,
  Table,
  Item,
  Segment
} from "semantic-ui-react";
import GoalsLightBoard from "./GoalsLightBoard";
import Timestamp from "./Timestamp";

const fakeData = {
  id: "fakeId1",
  name: "Identity - IDP",
  contact: "Meera Pankhania",
  leadAssessor: "Leisa Reichart",
  nextAssessment: "2017-12-01",
  createdAt: "2016-03-27",
  assessments: [
    {
      id: "cj8dvy6da1olc0195hy26ayqe",
      when: "2017-10-05T03:11:13.052Z",
      summary: "Good effort. Needs to try harder.",
      leadAssessor: "Leisa Reichart",
      project: {
        id: "cj8dmhvkw1hai0195g2vkn4cs",
        name: "Identity IDP"
      },
      goalAssessments: [
        {
          areasForImprovement: "a lot!",
          assessor: "tyu",
          evidence: "",
          goalNumber: 1,
          id: "cj8fhvyii7l5v0100zy3qdxkn",
          positiveComments: "mostly positive",
          rating: "Red"
        },
        {
          areasForImprovement: "",
          assessor: "",
          evidence: "",
          goalNumber: 2,
          id: "cj8fhwp4zaav30112dm82xp2o",
          positiveComments: "something positive",
          rating: "Green"
        }
      ],
      __typename: "Assessment"
    },
    {
      id: "cj8dvy6da1olc0195hy26ayqe",
      when: "2017-09-17T03:11:13.052Z",
      summary: "Terrible. There are simply no words :(",
      leadAssessor: "Julie Reynolds",
      project: {
        id: "cj8dmhvkw1hai0195g2vkn4cs",
        name: "Identity IDP"
      },
      goalAssessments: [
        {
          areasForImprovement: "a lot!",
          assessor: "tyu",
          evidence: "",
          goalNumber: 1,
          id: "cj8fhvyii7l5v0100zy3qdxkn",
          positiveComments: "mostly positive",
          rating: "Red"
        },
        {
          areasForImprovement: "Read a book",
          assessor: "",
          evidence: "",
          goalNumber: 2,
          id: "cj8fhwp4zaav30112dm82xp2o",
          positiveComments: "",
          rating: "Amber"
        },
        {
          areasForImprovement: "Words fail me",
          assessor: "",
          evidence: "",
          goalNumber: 3,
          id: "cj8fhwp4zaav30112dm82xp2o",
          positiveComments: "",
          rating: "Amber"
        }
      ],
      __typename: "Assessment"
    }
  ]
};

class ProjectAssessments extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
    }
    var model = get(this.props.data, "Project", fakeData);
    if (!model) {
      return <div>Unknown project</div>;
    }
    return (
      <Container>
        <TopHeading>{"Project - " + model.name}</TopHeading>
        <Segment>
          <Grid columns={2} verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                Contact: {model.contact}
                <br />
                Lead assessor: {model.leadAssessor}
                <br />
                Next assessment: [Not yet schedule]
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button primary>New Asssessment</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Table>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={3}>Assessments</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {model.assessments.map(assessment => {
              const href = "/assessment/" + assessment.id;
              return (
                <Table.Row key={assessment.id}>
                  <Table.Cell>
                    <Item.Group link>
                      <Item>
                        <Item.Content>
                          <Item.Header href={href}>
                            <Timestamp when={assessment.when} />
                          </Item.Header>
                          <Item.Meta>{assessment.leadAssessor}</Item.Meta>
                          <Item.Description>
                            <p>{assessment.summary}</p>
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                    {/* <ButtonLink href={href}>
                      <Timestamp when={assessment.when} />
                    </ButtonLink> */}
                  </Table.Cell>
                  <Table.Cell>
                    <GoalsLightBoard assessment={assessment} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

ProjectAssessments.propTypes = {
  data: PropTypes.object.isRequired
};

const ProjectAssessmentsQuery = gql`
  query ProjectAssessmentsQuery($projId: ID!) {
    Project(id: $projId) {
      id
      name
      contact
      leadAssessor
      nextAssessment
      createdAt
      assessments(orderBy: when_DESC) {
        id
        when
        summary
        goalAssessments {
          goalNumber
          rating
        }
      }
    }
  }
`;

export default graphql(ProjectAssessmentsQuery, {
  options: props => ({
    variables: {
      projId: props.match.params.id
    }
  })
})(ProjectAssessments);
