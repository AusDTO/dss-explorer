import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Segment, Header } from "semantic-ui-react";
import { Loading, TopInnerHeading, Error } from "./Basics.js";

class AdminReporting extends React.Component {
  render() {
    // if (this.props.data.loading) {
    //   return <Loading />;
    // }
    // if (this.props.data.error) {
    //   return <Error data={this.props.data} />;
    // }
    return (
      <Segment>
        <TopInnerHeading>Reporting</TopInnerHeading>
      </Segment>
    );
  }
}

export default AdminReporting;
