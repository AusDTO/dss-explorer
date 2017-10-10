import React from "react";
import { Image } from "semantic-ui-react";
import icon from "../assets/icon.png";

class Logo extends React.Component {
  render() {
    return (
      <div>
        <Image
          shape="circular"
          size="mini"
          src={icon}
          style={{
            background: "white",
            padding: "0.25em"
          }}
          {...this.props}
        />
      </div>
    );
  }
}

export default Logo;
