import moment from "moment";

const Timestamp = ({ when = "", type = "date", defaultValue = "" }) => {
  if (!when) {
    return defaultValue;
  }
  const dt = moment(when);
  if (dt.isValid) {
    if (type === "date") {
      return dt.format("D MMM YYYY");
    }
    if (type === "datetime") {
      return dt.format("D MMM YYYY, h:mm A");
    }
    if (type === "difference") {
      return moment.duration(dt.diff(moment())).humanize(true);
    }
  }

  // If all else fails, just return what they gave us
  return when;
};

export default Timestamp;
