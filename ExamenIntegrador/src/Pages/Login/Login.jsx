

const Login = () => {

    return(
        <>
            <div className="w-screen ">
                <h1> Inicio de Sesion </h1>
                <form action="" className="flex flex-col text-left max-w-md mx-auto gap-3 my-4">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input className="w-full p-2 border rounded" type="text" name="username" id="username" minLength="8" placeholder="Ej: JuanHernandez" required/>
                    
                    <label htmlFor="contrasenia">Contraseña</label>
                    <input className="w-full p-2 border rounded" type="password" name="contrasenia" id="contrasenia" minLength="8" required/>
                    
                    <button className="w-full bg-red-500">
                        Acceder
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login;