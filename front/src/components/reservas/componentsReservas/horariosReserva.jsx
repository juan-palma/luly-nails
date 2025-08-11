import { Form } from 'react-bootstrap';
import useHorarioReservas from '../../../hooks/hooksReservas/useHorariosReservas';
import '../componentsReservas/horariosReservas.css'

const HorarioReservas = ({ fechaSeleccionada, servicioSeleccionado, colaboradorSeleccionado, onSeleccionarHorario }) => {
  const {
    horariosDisponibles,
    horarioSeleccionado,
    handleSeleccionHorario,
    horariosOcupados,
  } = useHorarioReservas(fechaSeleccionada, servicioSeleccionado, colaboradorSeleccionado, onSeleccionarHorario);

  return (
    <div className='container-horarios'>
      <Form.Group controlId="selectorHorario" className="mt-4">
        <Form.Label>Selecciona un horario:</Form.Label>
        <Form.Select className='' value={horarioSeleccionado} onChange={handleSeleccionHorario}>
          <option value="">-- Elige un horario --</option>
          {horariosDisponibles.map((horario, index) => (
            <option key={index} value={horario}>
              {horario}
            </option>
          ))}
        </Form.Select>

        {Array.isArray(horariosOcupados) && horariosOcupados.length > 0 && (
          <div className="mt-3">
            <strong className="text-danger">Horarios ocupados:</strong>
            <ul className="mb-0">
              {horariosOcupados.map((hora, idx) => (
                <li key={idx} className="text-danger">{hora}</li>
              ))}
            </ul>
          </div>
        )}
      </Form.Group>
    </div>
  );
};

export default HorarioReservas;


