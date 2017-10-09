import moment from "moment";

const Timestamp = ({ when = "", style = "date", defaultValue = "" }) => {
  if (!when) {
    return defaultValue;
  }
  const dt = moment(when);
  if (dt.isValid) {
    if (style === "date") return dt.format("D MMM YYYY");
  }

  // If all else fails, just return what they gave us
  return when;
};

export default Timestamp;
