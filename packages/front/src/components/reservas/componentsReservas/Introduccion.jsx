import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

const Introduccion = ({ onSiguiente }) => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center mb-4">Bienvenidos a Nuestra Central de Turnos</h1>
          <div className='alert alert-warning '>
            <p className='text-danger text-center'>Antes de comenzar debe tener en cuenta lo siguiente:</p>
            <p className=' text-dark '> - Usted va ir siguiendo una serie de pasos hasta completar el turno.</p>
            <p className=' text-dark '> - Podra compartir los servicios que ofrecemos en el mismo horario,
              por ejemplo, manicuria con perfilado de cejas, etc. siempre y cuando halla turno disponible</p>
          </div>
          <ul className="list-unstyled">
            <li>
              <FaCheckCircle className="text-success me-2" />
              <strong>Primero:</strong> Debe completar completar su informacion personal para iniciar la reserva.
              No hace falta su Nombre completo, pero si su dni para que ud quede registrada como cliente.
            </li>
            <li>
              <FaCheckCircle className="text-success me-2" />
              <strong>Segundo:</strong> Seleccionar la especialista del servicio que sea realizarse.
            </li>
            <li>
              <FaCheckCircle className="text-success me-2" />
              <strong>Tercero:</strong> Podra seleccionar una fecha disponible en el calendario.
            </li>
            <li>
              <FaCheckCircle className="text-success me-2" />
              <strong>Cuarto:</strong> Una vez seleccionada la fecha, se hbalitaran los horarios disponibles a seleccionar.
            </li>
            <li>
              <FaCheckCircle className="text-success me-2" />
              <strong>Quinto:</strong> Por ultimo vera un resumen de su turno a reservar con posibilidad de volver en todo momento
              y poder modificar la informacion, o confirmar la misma, dejendo acentado su turno.
            </li>
          </ul>
          <div className="d-grid gap-2 w-25 mx-auto">
            <Button variant="primary" size="lg" className='' onClick={onSiguiente}>Comenzar</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Introduccion;


