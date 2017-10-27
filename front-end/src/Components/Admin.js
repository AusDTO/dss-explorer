import React from "react";
import { Container, Segment } from "semantic-ui-react";
import { Loading, TopInnerHeading, Error } from "./Basics.js";

class Admin extends React.Component {
  render() {
    // if (this.props.data.loading) {
    //   return <Loading />;
    // }
    // if (this.props.data.error) {
    //   return <Error data={this.props.data} />;
    // }
    return (
      <Container className="admin">
        <Segment>
          <TopInnerHeading>Admin</TopInnerHeading>
        </Segment>
      </Container>
    );
  }
}

export default Admin;
