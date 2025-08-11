import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import ReservasPages from './pages/ReservasPages';
import AdminReservas from './components/adminReservas/AdminReservas';
import { Container, Row, Col } from 'react-bootstrap';
import HomePages from './pages/HomePages';

function App() {
  return (
      <Router>
          <Container>
              <Row>
                  <Col md={12}>
                      <nav>
                          <ul className="nav nav-tabs">
                              <li className="nav-item">
                                  <Link className="nav-link" to="/">Home</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to="/reservas">Reservas</Link>
                              </li>
                               <li className="nav-item">
                                  <Link className="nav-link" to="/admin">Administración</Link>
                              </li>
                          </ul>
                      </nav>
                      <Routes>
                        {/* conectar la pagina inicio y crear el componente*/}
                          <Route path="/" element={<HomePages />} />
                          <Route path="/reservas" element={<ReservasPages />} />
                          <Route path="/admin" element={<AdminReservas />} />
                          <Route path="/admin/*" element={<AdminReservas />} />
                          <Route path="*" element={<h1>Página no encontrada</h1>} />
                      </Routes>
                  </Col>
              </Row>
          </Container>
      </Router>
  );
}

export default App;
