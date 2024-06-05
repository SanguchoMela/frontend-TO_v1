import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";

moment.updateLocale("es", {
  weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
  weekdaysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
  // weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_",
    ),
  monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),
});

const mensajes = {
  today: "Hoy",
  previous: "Anterior",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Paciente",
};

// const vistas = ['week','day','agenda']

function Calendario(props) {
  const localizer = momentLocalizer(moment);

  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      messages={mensajes}
      // views={vistas}
      defaultView="week"
      selectable
      min={new Date(2023, 1, 1, 10, 0)}
      max={new Date(2023, 1, 1, 19, 0)}
    />
  );
}

export default Calendario;
