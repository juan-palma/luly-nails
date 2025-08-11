
function HomePages() {
  return (
    <div className="d-flex flex-column align-items-center bg-light" style={{ height: "100vh" }}>
        <h1 className="pb-5">Pagina Comercial</h1>
        <div className=" d-flex fs-1">
            <p>Ir a 👉 </p>
            <a className="nav-link fs-1 text-decoration-underline fst-italic text-danger" 
                href="https://nailsluly-react.onrender.com/" 
                target="_blank" 
                rel="noopener noreferrer">
                 Luly Nails
            </a>
        </div>
    </div>
  )
}

export default HomePages