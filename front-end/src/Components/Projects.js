import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";
import moment from "moment";
import { get } from "lodash";

import { Loading, Error } from "./Basics";
import Timestamp from "./Timestamp";
import {
  Label,
  Container,
  Item,
  Header,
  Button,
  Table,
  Popup
} from "semantic-ui-react";
import CreateOrEditProjectDialog from "./CreateOrEditProjectDialog";
import { CalculateStageColor, CalculateStageText } from "./Stage";

import "./Projects.css";

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortOrder: "name" };
  }
  sortByName = models => {
    return models.slice().sort((a, b) => a.name.localeCompare(b.name));
  };
  sortByDate = models => {
    return models.slice().sort((a, b) => {
      const dtA = moment(a.nextAssessment);
      const dtB = moment(b.nextAssessment);
      return dtA.isBefore(dtB) ? -1 : dtA.isAfter(dtB) ? 1 : 0;
    });
  };

  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
    }
    const models = this.props.data.allProjects || fakeData;
    const sortedModels =
      this.state.sortOrder === "name"
        ? this.sortByName(models)
        : this.sortByDate(models);
    return (
      <Container className="projects">
        <Table>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell verticalAlign="middle">
                <Header as="h2">Projects</Header>
                <Button.Group toggle>
                  <Popup
                    content="Sort projects by name"
                    trigger={
                      <Button
                        toggle
                        icon="font"
                        primary={this.state.sortOrder === "name"}
                        onClick={() => this.setState({ sortOrder: "name" })}
                      />
                    }
                  />
                  <Popup
                    content="Sort projects by date"
                    trigger={
                      <Button
                        toggle
                        icon="calendar"
                        primary={this.state.sortOrder === "date"}
                        onClick={() => this.setState({ sortOrder: "date" })}
                      />
                    }
                  />
                </Button.Group>
              </Table.HeaderCell>

              <Table.HeaderCell>Next assessment </Table.HeaderCell>
              <Table.HeaderCell>Last assessment </Table.HeaderCell>
              <Table.HeaderCell>Contact </Table.HeaderCell>
              <Table.HeaderCell>Lead Assessor </Table.HeaderCell>

              <Table.HeaderCell>
                <CreateOrEditProjectDialog
                  trigger={
                    <Popup
                      content="Create a new project"
                      trigger={
                        <Button
                          className="newButton"
                          positive
                          icon="plus"
                          content="New"
                        />
                      }
                    />
                  }
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedModels.map(proj => {
              const mostRecentAssessment = proj.assessments[0];
              const when = moment(proj.nextAssessment);
              const now = moment();
              const overdue = when.isValid() && when.isBefore(now);
              const upcoming =
                when.isValid() &&
                when.isAfter(now) &&
                when.isBefore(now.add("45", "day"));
              return (
                <Table.Row key={proj.id}>
                  <Table.Cell>
                    <Item.Group link>
                      <Item key={proj.id} href={"/project/" + proj.id}>
                        <Item.Content>
                          <Item.Header>{proj.name}</Item.Header>
                          <Item.Meta>{proj.organisation}</Item.Meta>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Table.Cell>
                  <Table.Cell>
                    <Timestamp when={proj.nextAssessment} />
                    <div>
                      {upcoming && (
                        <Label color="green" pointing content="Upcoming" />
                      )}
                      {overdue && (
                        <Label color="red" pointing content="Overdue" />
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Timestamp
                      when={get(mostRecentAssessment, "when")}
                      defaultValue="[never]"
                    />
                  </Table.Cell>
                  <Table.Cell>{proj.contact}</Table.Cell>
                  <Table.Cell>{proj.leadAssessor}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Label size="large" color={CalculateStageColor(proj.stage)}>
                      {CalculateStageText(proj.stage)}
                    </Label>
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

ProjectList.propTypes = {
  data: PropTypes.object.isRequired
};

const ProjectListQuery = gql`
  query ProjectListQuery {
    allProjects {
      id
      name
      organisation
      contact
      leadAssessor
      nextAssessment
      createdAt
      stage
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

const fakeData = [
  {
    id: "a",
    name: "Identity - IDP",
    organisation: "Digital Transformation Agency",
    contact: "Meera Pankhurst",
    leadAssessor: "Leisa",
    createdAt: "2017-01-19",
    assessments: []
  },
  {
    id: "a",
    name: "Marketplace",
    organisation: "Digital Transformation Agency",
    contact: "Michael Yettle",
    leadAssessor: "Leisa Agora",
    createdAt: "2017-01-19",
    assessments: []
  },
  {
    id: "b",
    name: "WHIPIT",
    organisation: "Dept of Human Services",
    contact: "Egbert Tran",
    leadAssessor: "Meera Pankhurst",
    createdAt: "2017-01-19",
    assessments: []
  }
];
