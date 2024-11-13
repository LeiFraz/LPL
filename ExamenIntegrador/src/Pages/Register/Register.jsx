
const Register = () => {

    return(
        <>
            <div className="w-screen">
                <h1> Registro </h1>
                <form action="" className="flex flex-col text-left max-w-md mx-auto gap-3 my-4">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input className="w-full p-2 border rounded" type="text" name="username" id="username" minLength="8" placeholder="Ej: JuanHernandez" required/>
                    
                    <label htmlFor="correo">Correo</label>
                    <input className="w-full p-2 border rounded" type="mail" name="correo" id="correo" placeholder="Ej: admin@gmail.com" required/>
                    
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input className="w-full p-2 border rounded" type="date" name="fechaNacimiento" id="fechaNacimiento" placeholder="" required/>
                    
                    <label htmlFor="pais">Pais de residencia</label>
                    <input className="w-full p-2 border rounded" type="text" name="pais" id="pais" placeholder="Ej: Argentina" required/>
                    
                    <label htmlFor="contrasenia">Contraseña</label>
                    <input className="w-full p-2 border rounded" type="password" name="contrasenia" id="contrasenia" minLength="8" required/>
                    
                    <button className="w-full bg-red-500">
                        Registrarse
                    </button>
                </form>
            </div>
        </>
    )
}

export default Register;