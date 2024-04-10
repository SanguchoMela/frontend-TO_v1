import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

function BasicCalendar(props) {
  const localizer = momentLocalizer(moment);

  return <BigCalendar {...props} localizer={localizer} />;
}

export default BasicCalendar;
