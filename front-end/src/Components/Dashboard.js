import React from "react";
import PropTypes from "prop-types";
import { graphql, gql } from "react-apollo";

import { PageHeader } from "react-bootstrap";

class Dashboard extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <PageHeader>Dashboard</PageHeader>
        <p>{this.props.data._allProjectsMeta.count} projects</p>
        <p>{this.props.data._allUsersMeta.count} users</p>
        <p>{this.props.data._allAssessmentsMeta.count} assessments</p>
      </div>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired
};

const DashboardQuery = gql`
  query DashboardQuery {
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

export default graphql(DashboardQuery, {
  options: { fetchPolicy: "network-only" }
})(Dashboard);
