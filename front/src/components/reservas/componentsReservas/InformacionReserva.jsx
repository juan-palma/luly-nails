import { Card, Button } from 'react-bootstrap';

const InformacionReserva = ({ reservas = [], onCerrar }) => {
  //console.log(reservas.length)
  if (!reservas.length) return null;

  return (
    <Card className="mt-4 border-warning">
      <Card.Body>
        <Card.Title>
          ¡Ya tienes {reservas.length > 1 ? 'turnos dados' : 'un turno dado'} en este mes!
          {` `}
          De haber disponibilidad puedes solicitar turnos para otros servicios.
        </Card.Title>

        {reservas.map((r, index) => {
          const fecha = new Date(r.date).toLocaleDateString('es-AR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <div key={r._id || index} className="mb-3">
              <Card.Text><strong>Nombre:</strong> {r.name}</Card.Text>
              <Card.Text><strong>Servicio:</strong> {r.service}</Card.Text>
              <Card.Text><strong>Colaborador:</strong> {r.collaborator?.name || 'No especificado'}</Card.Text>
              <Card.Text><strong>Fecha:</strong> {fecha}</Card.Text>
              <Card.Text><strong>Hora:</strong>{r.time}</Card.Text>
              {index < reservas.length - 1 && <hr />}
            </div>
          );
        })}

        <div className="d-flex justify-content-end mt-3">
          <Button variant="outline-primary" onClick={onCerrar}>
            OK
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default InformacionReserva;

// import { Card, Button } from 'react-bootstrap';

// const InformacionReserva = ({ reservas = [], onCerrar }) => {
//   //console.log(reservas.length)
//   if (!reservas.length) return null;

//   return (
//     <Card className="mt-4 border-warning">
//       <Card.Body>
//         <Card.Title>
//           ¡Ya tienes {reservas.length > 1 ? 'turnos dados' : 'un turno dado'} en este mes!
//           {` `}
//           De haber disponibilidad puedes solicitar turnos para otros servicios.
//         </Card.Title>

//         {reservas.map((r, index) => {
//           const fecha = new Date(r.date).toLocaleDateString('es-AR', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           });

//           return (
//             <div key={r._id || index} className="mb-3">
//               <Card.Text><strong>Nombre:</strong> {r.name}</Card.Text>
//               <Card.Text><strong>Servicio:</strong> {r.service}</Card.Text>
//               <Card.Text><strong>Colaborador:</strong> {r.collaborator?.name || 'No especificado'}</Card.Text>
//               <Card.Text><strong>Fecha:</strong> {fecha}</Card.Text>
//               <Card.Text><strong>Hora:</strong>{r.time}</Card.Text>
//               {index < reservas.length - 1 && <hr />}
//             </div>
//           );
//         })}

//         <div className="d-flex justify-content-end mt-3">
//           <Button variant="outline-primary" onClick={onCerrar}>
//             OK
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default InformacionReserva;
