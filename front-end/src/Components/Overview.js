import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Container, Segment, Statistic, Header } from "semantic-ui-react";
import { Loading, TopInnerHeading, Error } from "./Basics.js";

const fakeData = {
  _allProjectsMeta: {
    count: 10
  },
  _allUsersMeta: {
    count: 12
  },
  _allAssessmentsMeta: {
    count: 24
  }
};

class Overview extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
    }
    var model = this.props.data || fakeData;
    const items = [
      {
        key: "1-1",
        label: "Projects",
        value: Math.trunc(model._allProjectsMeta.count / 2).toLocaleString()
      },
      {
        key: "1-2",
        label: "Users",
        value: Math.trunc(model._allUsersMeta.count / 2).toLocaleString()
      },
      {
        key: "1-3",
        label: "Assessments",
        value: Math.trunc(model._allAssessmentsMeta.count / 2).toLocaleString()
      },
      {
        key: "1-4",
        label: "Sign Ins",
        value: 101
      }
    ];
    const items2 = [
      {
        key: "2-1",
        label: "Projects",
        value: model._allProjectsMeta.count.toLocaleString()
      },
      {
        key: "2-2",
        label: "Users",
        value: model._allUsersMeta.count.toLocaleString()
      },
      {
        key: "2-3",
        label: "Assessments",
        value: model._allAssessmentsMeta.count.toLocaleString()
      },
      {
        key: "2-4",
        label: "Sign Ins",
        value: Math.trunc(1234).toLocaleString()
      }
    ];
    return (
      <Container>
        <Segment>
          <TopInnerHeading>Overview</TopInnerHeading>
          <Segment>
            <Header as="h2">Last 30 days</Header>
            <Statistic.Group widths={items.length} items={items} color="green" />
          </Segment>
          <Segment>
            <Header as="h2">All time</Header>
            <Statistic.Group widths={items.length} items={items2} color="green" />
          </Segment>
        </Segment>
      </Container>
    );
  }
}

Overview.propTypes = {
  data: PropTypes.object.isRequired
};

const OverviewQuery = gql`
  query OverviewQuery {
    _allProjectsMeta {
      count
    }
    _allUsersMeta {
      count
    }
    _allAssessmentsMeta {
      count
    }
  }
`;

export default graphql(OverviewQuery, {
  options: { fetchPolicy: "network-only" }
})(Overview);
