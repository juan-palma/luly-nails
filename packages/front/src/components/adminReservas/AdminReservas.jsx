import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useAdminReservas from '../../hooks/hooksAdmin/useAdminReservas';
import useIsMobile from '../../hooks/hooksAdmin/useMobile';
import CrearElementoForm from './componentAdmin/CrearElementosFrom';
import ListarElementos from './componentAdmin/ListarElementos';
import AdminMenu from './componentAdmin/AdminMenu';
import ListarReservas from './componentAdmin/ListarReservas';


function AdminReservas() {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('adminSection') || null;
  });
  const [reloadKey, setReloadKey] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useIsMobile();

  const {
    mostrarMensajeExito,
    mostrarMensajeError,
    mensajeExito,
    mensajeErrorGeneral,
  } = useAdminReservas();

  useEffect(() => {
    if (activeSection) {
      localStorage.setItem('adminSection', activeSection);
    }
  }, [activeSection]);

  const handleSectionClick = (section) => {
    if (section === null) {
      localStorage.removeItem('adminSection');
      setActiveSection(null);
      setShowMenu(false);
      return;
    }

    if (activeSection === section) {
      setReloadKey((prev) => prev + 1);
    } else {
      setActiveSection(section);
    }
    setShowMenu(false);
  };

  const renderSection = () => {
    if (!activeSection) {
      return (
        <div>
          <h2>Bienvenido al Panel de Administración</h2>
          <p>Seleccione una opción del menú lateral para comenzar.</p>
          <p className='text-center alert alert-success w-auto m-auto mb-5'>Antes tener en cuenta los siguientes pasos</p>
          <ul className='alert alert-light'>
            <li className=' mx-3'>Primero debe crear SERVICIOS para luego poder crear colaboradores y relacionarlo con un servicio.</li>
            <li className=' mx-3'>Luego de crear el servicio podra crear COLABORADORES y relacionarlos con el servicio previamente creado.</li>
            <li className=' mx-3'>Luego podra ver las listas de servicios y colaboradores creados.</li>
            <li className=' mx-3'>Dentro de cada listado tendra la opcion de poder editar o eliminar los items creados.</li>
            <li className=' mx-3'>Tambien podras visualizar las reservas creadas por los clientes, editarlas y eliminarlas</li>
          </ul>
        </div>
      );
    }

    const tipo = activeSection.includes('servicio') ? 'servicio' : 'colaborador';

    if (activeSection.includes('crear')) {
      return (
        <CrearElementoForm
          key={`crear-${tipo}-${reloadKey}`}
          tipo={tipo}
          onElementCreated={() =>
            mostrarMensajeExito(
              `${tipo === 'servicio' ? 'Servicio' : 'Colaborador'} creado con éxito.`
            )
          }
          onElementError={mostrarMensajeError}
        />
      );
    }

    if (activeSection.includes('listar') && activeSection !== 'listar_reservas') {
      return (
        <ListarElementos
          key={`listar-${tipo}-${reloadKey}`}
          tipo={tipo}
          mostrarMensajeError={mostrarMensajeError}
        />
      );
    }

    if(activeSection === 'listar_reservas'){
      return(
        <ListarReservas mostrarMensajeError={mostrarMensajeError}/>
      )
    }

    return null;
  };

  return (
    <div className="container-fluid contenedor">
      {/* Botón para abrir menú en dispositivos pequeños */}
      {isMobile && (
        <div className="text-end my-2">
          <Button variant="primary" onClick={() => setShowMenu(true)}>
            Menú
          </Button>
        </div>
      )}

      <div className="d-flex flex-column flex-md-row">
        {/* Componente de menú reutilizable tanto para dispositivos grandes como pequeños */}
        <AdminMenu
          onSectionClick={handleSectionClick}
          showMobileMenu={showMenu}
          onHideMobileMenu={() => setShowMenu(false)}
        />

        {/* Contenido principal */}
        <div className="p-3 flex-grow-1">
          {mensajeExito && <div className="alert alert-success mt-3">{mensajeExito}</div>}
          {activeSection !== 'listar_reservas' && mensajeErrorGeneral && (
            <div className="alert alert-danger mt-3">{mensajeErrorGeneral}</div>
          )}
          {renderSection()}
        </div>
      </div>
    </div>
  );

}

export default AdminReservas;

