
const NavBar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Mi Sitio</h1>
        <div className="space-x-4">
          <a href="#inicio" className="text-gray-300 hover:text-white">Inicio</a>
          <a href="#servicios" className="text-gray-300 hover:text-white">Servicios</a>
          <a href="#contacto" className="text-gray-300 hover:text-white">Contacto</a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;