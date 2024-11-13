import { useNavigate } from "react-router-dom";

const Home = () => {

const navigate = useNavigate();
const paginaRegistro = () => navigate('/registro')
const paginaInicioSesion = () => navigate('/inicio-sesion')

    return(
        <>
            <div className="w-screen m-auto">
                <button onClick={paginaInicioSesion}> Iniciar Sesion </button>
                <button className="bg-red-500" onClick={paginaRegistro}> 
                    Registrarse    
                </button>
                <h1> Juego de Adivinanza </h1>
            </div>
        </>
    )
}
export default Home;