import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";
import { Container, Statistic } from "semantic-ui-react";
import { Loading, TopHeading, Error } from "./Basics.js";

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
      { label: "Projects", value: model._allProjectsMeta.count },
      { label: "Users", value: model._allUsersMeta.count },
      { label: "Assessments", value: model._allAssessmentsMeta.count }
    ];
    return (
      <Container>
        <TopHeading>Overview</TopHeading>
        <Statistic.Group items={items} color="green" />
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
