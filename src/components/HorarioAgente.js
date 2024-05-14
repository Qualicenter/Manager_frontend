
import "../styles/horarioAgente.css";

const Horario = (props) => {
  const { eventos } = props;

  const calcularPosicion = (hora) => {
    const time = new Date(`2024-01-01T${hora}:00`);
    const medianoche = new Date(`2024-01-01T00:00:00`);
    const posicion = (((time - medianoche) / (1000 * 60 * 60)) * 200) / 24;
    return posicion;
  };

  return (
    <div className="horario">
      <table className="timeline">
        <thead>
          <tr>
            <th width="20%"> </th>
            <th width="17%">Hora Inicial</th>
            <th width="17%">Hora Final</th>
            <th>Timeline</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento, index) => {
            const posicionInicio = calcularPosicion(evento.horaInicio);
            const posicionFin = calcularPosicion(evento.horaFin);
            return (
              <tr
                className="event"
                key={index}
                style={{ backgroundColor: evento.color }}
              >
                <td>{evento.tipo}</td>
                <td>{evento.horaInicio}</td>
                <td>{evento.horaFin}</td>
                <td>
                  <div
                    className="horario-linea"
                    style={{
                      left: `${posicionInicio-60}%`,
                      width: `${posicionFin - posicionInicio}%`,
                      height: "20px",
                      backgroundColor: "grey",
                      transform: "translateY(-50%)", // Centra verticalmente
                    }}
                  ></div>
                  {evento.horarios &&
                    evento.horarios.map((horarios, i) => {
                      const [horarioInicial, horarioFinal] = horarios.split("-");
                      const horarioInicialPos = calcularPosicion(horarioInicial);
                      const horarioFinalPos = calcularPosicion(horarioFinal);
                      return (
                        <div
                          key={i}
                          className="horario-linea"
                          style={{
                            left: `${horarioInicialPos-60}%`,
                            width: `${horarioFinalPos - horarioInicialPos}%`,
                            height: "20px",
                            backgroundColor: "red",
                            transform: "translateY(-50%)",
                          }}
                        ></div>
                      );
                    })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Horario;