import React from "react";
import moment from "moment";
import { Input, Icon, Popup } from "semantic-ui-react";

class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
    if (this.props.onChange) this.props.onChange(e);
  };
  render() {
    console.log(this.props.value);
    const v = this.props.value;
    const dtHasError = !!v && !moment(v).isValid();
    const icon = dtHasError ? (
      <Popup
        key="dt-popup"
        content={"Invalid date: " + v}
        trigger={
          <Icon name="exclamation circle" fitted size="big" color="red" link />
        }
      />
    ) : null;
    return (
      <Input
        {...this.props}
        error={dtHasError}
        icon={icon}
        onChange={this.handleChange}
      />
    );
  }
}

export default DateInput;
