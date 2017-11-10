import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Item, Segment, Search, Transition } from "semantic-ui-react";
import { Loading, TopInnerHeading, Error } from "./Basics.js";
import Timestamp from "./Timestamp";
import "./AdminUsers.css";

class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: "" };
  }

  handleSearchChanged = e => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    if (this.props.data.loading) {
      return (
        <Segment className="adminUsers">
          <div className="top">
            <TopInnerHeading>Users</TopInnerHeading>
          </div>
          <Loading />
        </Segment>
      );
    }
    if (this.props.data.error) {
      return <Error data={this.props.data} />;
    }
    const filteredUsers = this.state.searchValue
      ? this.props.data.allUsers.filter(x => x.name.toLowerCase().indexOf(this.state.searchValue) >= 0)
      : this.props.data.allUsers;
    return (
      <Segment className="adminUsers">
        <div className="top">
          <TopInnerHeading>Users</TopInnerHeading>
          <Search
            value={this.state.searchValue}
            onSearchChange={this.handleSearchChanged}
            minCharacters={9999}
            input={{ placeholder: "find by name..." }}
          />
        </div>
        <Transition.Group as={Item.Group} divided animation="fly left">
          {filteredUsers.map(x => (
            <Item key={x.id}>
              <Item.Image size="tiny" src={x.avatarUrl} />
              <Item.Content>
                <Item.Header>{x.name}</Item.Header>
                <Item.Meta>{x.organisation}</Item.Meta>
                <Item.Description>{x.emailAddress}</Item.Description>
                <Item.Extra>
                  Last login: <Timestamp when={x.lastLoginAt} type="datetime" defaultValue="[never]" />
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
          {filteredUsers.length === 0 && <div className="noMatches">No matching users </div>}
        </Transition.Group>
      </Segment>
    );
  }
}

AdminUsers.propTypes = {
  data: PropTypes.object.isRequired
};

const allUserQuery = gql`
  query {
    allUsers(orderBy: name_ASC) {
      id
      name
      emailAddress
      avatarUrl
      organisation
      lastLoginAt
    }
  }
`;

export default graphql(allUserQuery)(AdminUsers);
