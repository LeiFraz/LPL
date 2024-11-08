import { Link } from "react-router-dom";

const Home = () => {



    return(
        <>
            <button> Iniciar Sesion </button>
            <button className="px-4 py-2 bg-black-500 text-white hover:bg-black-700 transition">
                 <Link to='/registro'> 
                    Registrarse  
                 </Link>
            </button>
            <h1> Juego de Adivinanza </h1>
        </>
    )
}
export default Home;