import { ListGroup, Offcanvas } from 'react-bootstrap';
import useIsMobile from '../../../hooks/hooksAdmin/useMobile';

function AdminMenu({ onSectionClick, showMobileMenu, onHideMobileMenu }) {
  const isMobile = useIsMobile();

  const menuItems = [
    { key: null, label: 'Inicio' },
    { key: 'crear_servicio', label: 'Crear Servicio' },
    { key: 'crear_colaborador', label: 'Crear Colaborador' },
    { key: 'listar_servicio', label: 'Lista de Servicios' },
    { key: 'listar_colaborador', label: 'Lista de Colaboradores' },
    { key: 'listar_reservas', label: 'Lista de Reservas'}
    
  ];

  const renderDesktopMenu = () => (
    <div className="bg-light border-end p-3 d-none d-md-block" style={{ minWidth: '250px' }}>
      <ListGroup variant="flush">
        {menuItems.map(item => (
          <ListGroup.Item
            key={item.key}
            action
            onClick={() => onSectionClick(item.key)}
          >
            {item.label}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  const renderMobileMenu = () => (
    <Offcanvas show={showMobileMenu} onHide={onHideMobileMenu}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menú</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ListGroup variant="flush">
          {menuItems.map(item => (
            <ListGroup.Item
              key={item.key}
              action
              onClick={() => onSectionClick(item.key)}
            >
              {item.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );

  return (
    <>
      {renderDesktopMenu()}
      {isMobile && renderMobileMenu()}
    </>
  );
}

export default AdminMenu;


